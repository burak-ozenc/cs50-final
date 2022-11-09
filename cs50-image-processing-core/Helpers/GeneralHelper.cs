using Microsoft.AspNetCore.Http;
using SixLabors.ImageSharp.Formats;

namespace cs50_image_processing_core.Helpers;

public class GeneralHelper
{
    // convert IFormFile to byte array
    public byte[] IFormFileToBytes(IFormFile formFile)
    {
        using var ms = new MemoryStream();
        
        formFile.CopyTo(ms);
        
        return ms.ToArray();
    }

    // convert ImageSharp.Image to byte array
    public byte[] ImageToByte(SixLabors.ImageSharp.Image img, IImageEncoder encoder)
    {
        using var stream = new MemoryStream();

        img.Save(stream, encoder);
        byte[] bytes = stream.ToArray();
        
        return bytes;
    }
}