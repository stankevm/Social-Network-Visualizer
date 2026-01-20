using Microsoft.EntityFrameworkCore;
using DataCenterAPI.Data;
using DataCenterAPI.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddOpenApi();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Add DbContext with SQLite (for easy demo without external database)
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=socialnetwork.db"));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("AllowFrontend");

// API Endpoints
app.MapGet("/api/people", async (AppDbContext db) =>
{
    return await db.People.ToListAsync();
})
.WithName("GetAllPeople");

app.MapGet("/api/people/{id}", async (int id, AppDbContext db) =>
{
    var person = await db.People.FindAsync(id);
    return person is not null ? Results.Ok(person) : Results.NotFound();
})
.WithName("GetPersonById");

app.MapPost("/api/people", async (CreatePersonRequest request, AppDbContext db) =>
{
    var person = new Person
    {
        Name = request.Name,
        Type = request.Type,
        Status = request.Status,
        Notes = request.Notes,
        Location = request.Location,
        MetSince = DateTime.UtcNow,
        Connections = request.Connections ?? "[]"
    };

    db.People.Add(person);
    await db.SaveChangesAsync();

    return Results.Created($"/api/people/{person.Id}", person);
})
.WithName("CreatePerson");

app.MapPut("/api/people/{id}", async (int id, UpdatePersonRequest request, AppDbContext db) =>
{
    var person = await db.People.FindAsync(id);
    if (person is null) return Results.NotFound();

    person.Name = request.Name;
    person.Type = request.Type;
    person.Status = request.Status;
    person.Notes = request.Notes;
    person.Location = request.Location;
    person.Connections = request.Connections ?? "[]";

    await db.SaveChangesAsync();

    return Results.Ok(person);
})
.WithName("UpdatePerson");

app.MapDelete("/api/people/{id}", async (int id, AppDbContext db) =>
{
    var person = await db.People.FindAsync(id);
    if (person is null) return Results.NotFound();

    db.People.Remove(person);
    await db.SaveChangesAsync();

    return Results.NoContent();
})
.WithName("DeletePerson");

app.MapPut("/api/people/{id}/status", async (int id, UpdateStatusRequest request, AppDbContext db) =>
{
    var person = await db.People.FindAsync(id);
    if (person is null) return Results.NotFound();

    person.Status = request.Status;
    await db.SaveChangesAsync();

    return Results.Ok(person);
})
.WithName("UpdatePersonStatus");

app.MapGet("/api/people/stats", async (AppDbContext db) =>
{
    var stats = new
    {
        Total = await db.People.CountAsync(),
        BestFriend = await db.People.CountAsync(p => p.Status == "best-friend"),
        Friend = await db.People.CountAsync(p => p.Status == "friend"),
        Acquaintance = await db.People.CountAsync(p => p.Status == "acquaintance")
    };
    return Results.Ok(stats);
})
.WithName("GetPeopleStats");

// Ensure database is created (delete and recreate to apply schema changes)
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureDeleted();
    db.Database.EnsureCreated();
}

app.Run();

record UpdateStatusRequest(string Status);

record CreatePersonRequest(
    string Name,
    string Type,
    string Status,
    string Notes,
    string? Location,
    string? Connections
);

record UpdatePersonRequest(
    string Name,
    string Type,
    string Status,
    string Notes,
    string? Location,
    string? Connections
);
