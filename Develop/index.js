// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");
//const path = require("path");
const generateMarkdown = require("./utils/generateMarkdown");

// TODO: Create an array of questions for user input
//const questions = ['Enter project title:', 'Enter a description:', 'Enter installation instructions:', 'Enter usage information:', 'Enter contribution guidelines:', 'Enter testing instructions', 'Choose a license:', 'Enter your GitHub username:', 'Enter your email address:'];

// this array was written using the inquirer documentation: https://www.npmjs.com/package/inquirer
const questions = [
    {
        type: "input",
        name: "title",
        message: "Give a title to your project:",
        validate: function(answer) {
            if (answer.length < 1) {
                return console.log("You must enter a project title.");
            }
            return true;
        }
    },
    {
        type: "input",
        name: "description",
        message: "Describe your project's functionality and purpose:",
        validate: function(answer) {
            if (answer.length < 1) {
                return console.log("You must enter a project description.");
            }
            return true;
        }
    },
    {
        type: "input",
        name: "installation",
        message: "Enter instructions to install software needed to use your project, if applicable:",
    },
    {
        type: "input",
        name: "usage",
        message: "Explain how to use your project:",
        validate: function(answer) {
            if (answer.length < 1) {
                return console.log("You must describe how to use your project.");
            }
            return true;
        }
    },
    {
        type: "input",
        name: "contribution",
        message: "Explain how users can contribute to your project, if applicable:",
    },
    {
        type: "input",
        name: "testing",
        message: "Explain how to test your project, if applicable:",
    },
    {
        type: "checkbox",
        name: "license",
        message: "Select a license to attach to your project:",
        choices: ['Apache_2.0', 'GPL_v3', 'MIT', 'BSD_2--Clause', 'BSD_3--Clause', 'Boost_1.0', 'CC0_1.0', 'EPL_1.0', 'AGPL_v3', 'GPL_v2', 'LGPL_v2.1', 'MPL_2.0', 'Unlicense', 'none'],
        // full names for the license choices: ['Apache License 2.0', 'GNU General Public License v3.0', 'MIT License', 'BSD 2-Clause "Simplified" License', 'BSD 3-Clause "New" or "Revised" License', 'Boost Software License 1.0', 'Creative Commons Zero v1.0 Universal', 'Eclipse Public License 2.0', 'GNU Affero General Public License v3.0', 'GNU General Public License v2.0', 'GNU Lesser General Public License v2.1', 'Mozilla Public License 2.0', 'The Unlicense', 'none']. these are the choices that are available to someone creating a new repository in GitHub, a screenshot of this is shown in this project's readme.
    },
    {
        type: "input",
        name: "username",
        message: "Enter your GitHub username",
        validate: function(answer) {
            if (answer.length < 1) {
                return console.log("You must enter your GitHub username.");
            }
            return true;
        }
    },
    {
        type: "input",
        name: "email",
        message: "Enter your email address",
        validate: function(answer) {
            if (answer.length < 1) {
                return console.log("You must enter your email address.");
            }
            return true;
        }
    },
]

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    return fs.writeFileSync(fileName, data); // writeFileSync documentation: https://nodejs.org/api/fs.html#fswritefilesyncfile-data-options
}

function processTitleString(title) {
    // let result = text.replace("Microsoft", "W3Schools");
    // source for the replace method in strings: https://www.w3schools.com/jsref/jsref_replace.asp
    let processedString = title.replace('\u0020', '\u005F');
    // let text = "Mr. Blue has a blue house";
    // let position = text.search("Blue");
    // source for special character unicode: https://owasp.org/www-community/password-special-characters
    forbiddenChars = ['\u005C', '\u002F', '\u003A', '\u002A', '\u003F', '\u0022', '\u003C', '\u003E', '\u007C'];
    for (i=0; i < forbiddenChars.length; i++) {
        if (title.search(forbiddenChars[i]) !== -1) {
            processedString = processedString.replace(forbiddenChars[i], '\u005F');
        }
    }
    // source for the search method in strings: https://www.w3schools.com/jsref/jsref_search.asp
    // const generateMarkdown = require("./utils/generateMarkdown")
    let folderName = "./test/";
    processedString = folderName.concat(processedString, "_README.md");
    return processedString;
}

// TODO: Create a function to initialize app
function init() {
    inquirer.createPromptModule(questions).then((responses) => {
        console.log("Creating a professional README file for your project...");
        writeToFile(processTitleString(JSON.stringify(responses.title)), generateMarkdown(JSON.stringify(responses)));
    })
}

// Function call to initialize app
init();
