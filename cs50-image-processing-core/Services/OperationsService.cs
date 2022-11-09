using cs50_image_processing_core.IRepository;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats;

namespace cs50_image_processing_core.Services;

public class OperationsService : IOperationsService
{
    public byte[] ChangeFormat(byte[] bytes, IImageEncoder encoder)
    {
        // var image = Image.Load(file.OpenReadStream());
        using var ms = new MemoryStream();

        Image image = Image.Load(bytes);
        image.Save(ms, encoder);

        return ms.ToArray();
    }

    public byte[] Filter(byte[] convertedFileArray, Filters filter, float filterAmount, IImageEncoder encoder)
    {
        var services = new BaseServices();
        
        return services.Filter(convertedFileArray, filter, filterAmount, encoder);
    }

    public byte[] Resize(byte[] convertedFileArray, int height, int width, IImageEncoder encoder)
    {
        var services = new BaseServices();

        return services.ApplyResize(convertedFileArray, height, width, encoder);
    }
}