# Challenge 10

![GitHub license](https://img.shields.io/badge/License-BSD_2--Clause-orange.svg)

## Description
When you create a project, the code might be good but you might also want a simple logo to go along with it. That way, you can have a project that has a unique image that makes your project unique. This application prompts the user for input about the text, text color, shape, and shape color that they would like to use for their logo and uses that information to create a Scalable Vector Graphics image that matches the user's choices. This project taught me how to write tests for functions contained in classes, render an SVG file, and use inheritance to transfer properties from a parent class to its child classes.

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [Contributing](#contributing)
- [Tests](#tests)
- [License](#license)
- [Questions](#questions)

## Installation
Once you download the repository, open the package.json file in the integrated terminal (pic of package json open in integrated terminal here) and then once you do that you should type npm install (include npm install in pic) and the packages inquirer and jest will be installed.

## Usage
once you have opened the root directory in the integrated terminal, you can do two things: 1. you can run tests to see if the render() function of the shape classes is working properly 2. you can create a new svg file thingy. to run the tests type the command `npm test` in the terminal, and the functions in `lib/shapes.test.js` will be executed (picture of tests running successfully here) to create a new svg file, type `node index.js` into the terminal. You will be asked to enter the text (up to three characters), the text color, the shape, and the shape color that you would like your svg logo to be (picture of inquirer thingy here) once you have answered all 4 questions, the new file will appear in the examples folder with the title text_color_shape.svg. (include new file being created in last pic) once you click on the new file, you can right click on it and select open with live server (show pic of open with live server here) and then you can view it in the browser (show pic of example render here) The link to a walkthrough video demonstrating the application can be found here(insert link here)

## Credits
Received assistance from Robbert Witjman in the *#02-ask-the-class* Slack channel. the following web resources helped me write the code for this project (sources here)

## Contributing
No contribution is necessary for this project.

## Tests
Run npm test from the root directory to activate the tests written in lib/shapes.test.js (picture of test code here?) see usage or something idk

## License
This project was created using the BSD 2-Clause "Simplified" License. More information about the license can be found [here](https://opensource.org/license/bsd-2-clause/).

## Questions
If you have any questions for me, you can [follow me on GitHub](https://github.com/GimmeKitties711) or email me at eric20wang.wang@gmail.com.
