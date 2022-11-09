using cs50_image_processing_core.Helpers;
using cs50_image_processing_core.Models;
using cs50_image_processing_core.Services;
using SixLabors.ImageSharp.Formats;

namespace cs50_image_processing_core.Repository;

public class Process : Repository
{
    // object cannot be created inside of an abstract class 
    // this is a workaround to pass modified byte array
    private IImageEncoder? _imageEncoder;
    private string? _fileName;
    private Filters? _filter;
    private float? _filterAmount;

    // set necessary props 
    public override byte[] Connect(InputFileDto inputFileDto)
    {
        _filter = inputFileDto.Filter ?? Filters.None;
        _fileName = inputFileDto.FileName;
        _filterAmount = inputFileDto.FilterAmount ?? 0f;

        var helpers = new GeneralHelper();

        return helpers.IFormFileToBytes(inputFileDto.File);
    }
    
    // set file encoder
    public override void SetEncoder(InputFileDto inputFileDto)
    {
        var baseServices = new BaseServices();
        _imageEncoder = baseServices.SetEncoder(inputFileDto.OutputType);
    }

    public override byte[] ApplyFilter(byte[] modifiedArray)
    {
        if (_filter != null)
        {
            var operationsService = new OperationsService();

            // correct if filter inputs are null 
            Filters correctedFilter = _filter ?? Filters.None;
            float correctedFilterAmount = _filterAmount ?? 0f;

            return operationsService.Filter(modifiedArray, correctedFilter, correctedFilterAmount, _imageEncoder);
        }

        return modifiedArray;
    }

    public override byte[] Resize(byte[] modifiedArray, int? height, int? width)
    {
        var operationsService = new OperationsService();
        if (height.HasValue && width.HasValue)
        {
            // convert "nullable int" to "int" and call resize service
            return operationsService.Resize(modifiedArray, height ?? default(int), width ?? default(int),
                _imageEncoder);
        } 
        return modifiedArray;
        
    }

    public override OutputFileDto Finalize(byte[] bytes)
    {
        OutputFileDto result = new OutputFileDto();
        result.FileName = _fileName;
        result.ByteArray = bytes;
        
        return result;
    }
}