using cs50_image_processing_core.Models;
using Microsoft.AspNetCore.Http;
using SixLabors.ImageSharp.Formats;

namespace cs50_image_processing_core.IRepository;

public interface IOperationsService
{
    byte[] ChangeFormat(byte[] bytes, IImageEncoder encoder);

    byte[] Filter(byte[] convertedFileArray, Filters filter, float filterAmount, IImageEncoder encoder);

    byte[] Resize(byte[] convertedFileArray, int height, int width, IImageEncoder encoder);
    
}