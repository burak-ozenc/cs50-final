using cs50_image_processing_core.Helpers;
using cs50_image_processing_core.IRepository;
using Microsoft.AspNetCore.Http;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats;
using SixLabors.ImageSharp.Formats.Bmp;
using SixLabors.ImageSharp.Formats.Jpeg;
using SixLabors.ImageSharp.Formats.Png;
using SixLabors.ImageSharp.Formats.Webp;
using SixLabors.ImageSharp.Processing;

namespace cs50_image_processing_core.Services;

public class BaseServices : IBaseServices
{
    public IImageEncoder SetEncoder(ImageFormats extension)
    {
        IImageEncoder selectedEncoder;
        if (extension == ImageFormats.bmp)
        {
            selectedEncoder = new BmpEncoder();
        }
        else if (extension == ImageFormats.jpeg)
        {
            selectedEncoder = new JpegEncoder();
        }
        else if (extension == ImageFormats.png)
        {
            selectedEncoder = new PngEncoder();
        }
        else if (extension == ImageFormats.webp)
        {
            selectedEncoder = new WebpEncoder();
        }
        // in case output extension of not selected
        else
        {
            selectedEncoder = new PngEncoder();
        }

        return selectedEncoder;
    }
    public byte[] Filter(byte[] bytes, Filters filter, float filterAmount, IImageEncoder encoder)
    {
        using var ms = new MemoryStream(bytes);

        Image image = Image.Load(ms);
        var helpers = new GeneralHelper();

        if (filter == Filters.BlackAndWhite)
        {
            image.Mutate(x => x.BlackWhite());
        }
        else if (filter == Filters.Brightness)
        {
            image.Mutate(x => x.Brightness(filterAmount));
        }
        else if (filter == Filters.Contrast)
        {
            image.Mutate(x => x.Contrast(filterAmount));
        }
        else if (filter == Filters.Grayscale)
        {
            image.Mutate(x => x.Grayscale(filterAmount));
        }
        else if (filter == Filters.Hue)
        {
            image.Mutate(x => x.Hue(filterAmount));
        }
        else if (filter == Filters.Invert)
        {
            image.Mutate(x => x.Invert());
        }
        else if (filter == Filters.Kodachrome)
        {
            image.Mutate(x => x.Kodachrome());
        }
        else if (filter == Filters.Lightness)
        {
            image.Mutate(x => x.Lightness(filterAmount));
        }
        else if (filter == Filters.Lomograph)
        {
            image.Mutate(x => x.Lomograph());
        }
        else if (filter == Filters.Opacity)
        {
            image.Mutate(x => x.Opacity(filterAmount));
        }
        else if (filter == Filters.Polaroid)
        {
            image.Mutate(x => x.Polaroid());
        }
        else if (filter == Filters.Saturate)
        {
            image.Mutate(x => x.Saturate(filterAmount));
        }
        else if (filter == Filters.Sepia)
        {
            image.Mutate(x => x.Sepia(filterAmount));
        }

        return helpers.ImageToByte(image, encoder);
    }
    public byte[] ApplyResize(byte[] modifiedArray, int height, int width, IImageEncoder encoder)
    {
        using var ms = new MemoryStream();

        using Image image = Image.Load(modifiedArray);

        image.Mutate(x => x.AutoOrient().Resize(width, height));

        image.Save(ms, encoder); //Replace Png encoder with the file format of choice
        return ms.ToArray();
    }
    
}