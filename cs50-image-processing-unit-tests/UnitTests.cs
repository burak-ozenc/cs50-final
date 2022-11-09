namespace cs50_image_processing_unit_tests;

[TestFixture]
public class Tests
{
    [SetUp]
    public void Setup()
    {
    }
    
    [TestCase]
    public async Task Test1()
    {
        // Arrange
        var filePath = @"..\..\..\TestImages\test-1.jpg";
        var stream = File.OpenRead(filePath);
        var extension = filePath.Split('.')[1];
        IFormFile file = new FormFile(stream, 0, stream.Length, "files", Path.GetFileName(filePath))
        {
            Headers = new HeaderDictionary(),
            ContentType = extension is "jpg" or "jpeg" ? "image/jpeg"
                : extension is "png" ? "image/png"
                : extension is "webp" ? "image/webp"
                : "image/bmp"
        };

        InputFileDto testFile = new InputFileDto()
        {
            FileName = "test",
            File = file,
            OutputType = ImageFormats.bmp,
            Width = 200,
            Height = 200
        };

        // Act
        Repository process = new Process();
        var test = process.Run(testFile);
        
        // Assert
        if (test.ByteArray.Length < 1 || test.FileName is null)
        {
            Assert.Fail();
        }
        else
        {
            Assert.IsInstanceOf(typeof(OutputFileDto),test);
        }
    }
}