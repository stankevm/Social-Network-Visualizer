using Microsoft.EntityFrameworkCore;
using DataCenterAPI.Models;

namespace DataCenterAPI.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Person> People { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Seed initial data
        modelBuilder.Entity<Person>().HasData(
            new Person
            {
                Id = 1,
                Name = "Alice Johnson",
                Type = "colleague",
                Status = "best-friend",
                Notes = "Work",
                Location = "Seattle",
                MetSince = DateTime.UtcNow.AddYears(-3),
                Connections = "[2,3]"
            },
            new Person
            {
                Id = 2,
                Name = "Bob Martinez",
                Type = "groupmate",
                Status = "best-friend",
                Notes = "University",
                Location = "Seattle",
                MetSince = DateTime.UtcNow.AddYears(-5),
                Connections = "[1,4,5]"
            },
            new Person
            {
                Id = 3,
                Name = "Carol Davis",
                Type = "colleague",
                Status = "friend",
                Notes = "Work",
                Location = "Seattle",
                MetSince = DateTime.UtcNow.AddYears(-2),
                Connections = "[1]"
            },
            new Person
            {
                Id = 4,
                Name = "David Kim",
                Type = "classmate",
                Status = "friend",
                Notes = "University",
                Location = "Portland",
                MetSince = DateTime.UtcNow.AddYears(-5),
                Connections = "[2,5]"
            },
            new Person
            {
                Id = 5,
                Name = "Emma Wilson",
                Type = "family",
                Status = "best-friend",
                Notes = "Family",
                Location = "Seattle",
                MetSince = DateTime.UtcNow.AddYears(-10),
                Connections = "[2,4]"
            },
            new Person
            {
                Id = 6,
                Name = "Frank Thomas",
                Type = "colleague",
                Status = "acquaintance",
                Notes = "Work",
                Location = "Seattle",
                MetSince = DateTime.UtcNow.AddMonths(-6),
                Connections = "[]"
            },
            new Person
            {
                Id = 7,
                Name = "Grace Lee",
                Type = "groupmate",
                Status = "friend",
                Notes = "Hobbies",
                Location = "Vancouver",
                MetSince = DateTime.UtcNow.AddYears(-1),
                Connections = "[8]"
            },
            new Person
            {
                Id = 8,
                Name = "Henry Brown",
                Type = "classmate",
                Status = "friend",
                Notes = "Hobbies",
                Location = "Vancouver",
                MetSince = DateTime.UtcNow.AddYears(-1),
                Connections = "[7]"
            }
        );
    }
}
