namespace DataCenterAPI.Models;

public class Person
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string Type { get; set; } 
    public required string Status { get; set; } 
    public required string Notes { get; set; } 
    public string? Location { get; set; } 
    public DateTime MetSince { get; set; } 
    public string? Connections { get; set; } 
}
