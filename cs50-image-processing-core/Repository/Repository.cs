using cs50_image_processing_core.Models;


namespace cs50_image_processing_core.Repository;

public abstract class Repository
{
    // set necessary encoder from request
    public abstract void SetEncoder(InputFileDto inputFileDto);
    // convert image to byte array and set image props
    public abstract byte[] Connect(InputFileDto inputFileDto);
    // apply filter
    public abstract byte[] ApplyFilter(byte[] modifiedArray);
    // resize if parameters are given
    public abstract byte[] Resize(byte[] modifiedArray, int? height,int? width);
    // free memory
    public abstract  OutputFileDto Disconnect(byte[] bytes);

    // The 'Template Method' 

    public OutputFileDto Run(InputFileDto inputFileDto)
    {
        SetEncoder(inputFileDto);
        byte[] bytes = Connect(inputFileDto);
        bytes = ApplyFilter(bytes);
        bytes = Resize(bytes,inputFileDto.Height,inputFileDto.Width);
        OutputFileDto outputFileDto = Disconnect(bytes);
        
        return outputFileDto;
    }
}