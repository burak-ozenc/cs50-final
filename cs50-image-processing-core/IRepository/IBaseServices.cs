using SixLabors.ImageSharp.Formats;

namespace cs50_image_processing_core.IRepository;

public interface IBaseServices
{
    IImageEncoder SetEncoder(ImageFormats extension);
    byte[] Filter(byte[] bytes, Filters filter, float filterAmount, IImageEncoder encoder);
    byte[] ApplyResize(byte[] modifiedArray, int height, int width, IImageEncoder encoder);
}