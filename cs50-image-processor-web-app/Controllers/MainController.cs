using cs50_image_processing_core.Models;
using cs50_image_processing_core.Repository;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace cs50_image_processor_web_app.Controllers;

[ApiController]
[EnableCors("MyPolicy")]
[Route("api/[controller]")]
[Produces("application/json")]
public class MainController : ControllerBase
{
    private readonly Repository _process;
    
    public MainController(Repository process)
    {
        _process = process;
        //     // _logger = logger;
    }

    // return generic type to handle in case of any error
    [HttpPost("ProcessImage")]
    public IActionResult ProcessImage([FromForm] InputFileDto inputFileDto)
    {
        try
        {
            // _process = new Process();
            return Ok(_process.Run(inputFileDto));
        }
        catch
        {
            return StatusCode(500,
                "Error occured while processing image. Please try again or contact with administrator.");
        }
    }
}