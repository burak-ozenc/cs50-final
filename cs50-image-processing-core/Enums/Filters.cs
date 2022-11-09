namespace cs50_image_processing_core;

// filter types
public enum Filters
{
    // null check for nullable enum
    None = 0,
    BlackAndWhite = 1,
    Brightness = 2,
    Contrast = 3,
    Grayscale = 4,
    Hue = 5,
    Invert = 6,
    Kodachrome = 7,
    Lightness = 8,
    Lomograph = 9,
    Opacity = 10,
    Polaroid = 11,
    Saturate = 12,
    Sepia = 13
}