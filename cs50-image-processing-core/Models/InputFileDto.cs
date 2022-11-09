using Microsoft.AspNetCore.Http;

namespace cs50_image_processing_core.Models;

public class InputFileDto
{
    public string FileName { get; set; }
    public IFormFile? File { get; set; }
    public ImageFormats OutputType { get; set; }
    public Filters? Filter { get; set; }
    public float? FilterAmount { get; set; }
    public int? Width { get; set; }
    public int? Height { get; set; }
}