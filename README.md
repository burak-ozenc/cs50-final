# CS50 Image Processing Web Application

## Description

This is yet another Image Processing Application which helps user to convert, resize and add filter images.

It is a FullStack web application. I broke this project to 3 pieces because I wanted a clean structure and to be able to apply my knowledge to this project. UnitTests can be uncessary or design pattern may not the best choice but I wanted to do something clean. And I hope I did.

1- Core(cs50-image-processing-core) - Core has all the necessary methods for the project. 

2- WebApp(cs50-image-processor-web-app) - WebApp has Controller which exposes the necessary method as an API.  Also has UI project.

3-UnitTests(cs50-image-processing-unit-tests) - UnitTests has test method for the project. Since project has 1 method, I did not go in detail.

Backend is written .NET 6. I tried to implement Template Design Method for this particular process. I checked several design methods and this one I found logical to the concept. 

On Backend, it uses an open source library called [ImageSharp](https://github.com/SixLabors/ImageSharp) to handle image processing. UI sends input image as FormFile, and with the help of this library, the app converts, resizes or filters the image.


Frontend is written with React 17.0.2. I used object mapping while creating pages and passed the image format extensions as URL parameters.


You can watch from [here](https://youtu.be/yqeECEexK-M) on YouTube.


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
