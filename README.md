# CS50 Image Processing Web Application

This is yet another Image Processing Application which helps user to convert, resize and add filter images.

On backend, it uses an open source library called [ImageSharp](https://github.com/SixLabors/ImageSharp) to process images.


## Requirements
You need .Net 6 SDK to run this project.


## Used Techs
.NET 6

React




## Installation

If you use Intellij Rider or Visual Studio, you can build project with `Build` button from your IDE. 

If you want to install manually, run Terminal and navigate to 'cs50-image-processor-web-app' folder inside this project and run command below.
```bash
dotnet build
```

This will install necessary packages for project.



## Run

From your IDE, you can right click on 'cs50-image-processor-web-app' project and select run.

To run it manually, go to Terminal and navigate to 'cs50-image-processor-web-app' folder and run command below.

```bash
dotnet run
```
If you run it manually, you need to open your browser and enter this address : https://localhost:7111/

## Usage

After running the project, from the main page, you will be able to select which type you want to convert to.

After deciding the type, you can select custom properties for your images, filtering, amount of filter* to apply and resizing parameters.

You can start the process by clicking the `Process Image` button.

You can download the converted image by clicking Image on the right pane.


## Unit Tests
There is only one unit test right now, but it can be improve.


## Contributing

Any contribution will be appreciated.

## License

This is a Final Project for CS50 by Burak Ozenc.
