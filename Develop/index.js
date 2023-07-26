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
        name: "credits",
        message: "List any collaborators or web resources that helped you complete your project, if applicable:",
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
        type: "list",
        name: "license",
        message: "Use the Enter key to select a license to attach to your project:",
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
    // source for the replace method in strings: https://www.w3schools.com/jsref/jsref_replace.asp
    let processedString = title.replaceAll('\u0020', '\u005F');
    // source for special character unicode: https://owasp.org/www-community/password-special-characters (this is the resource that was provided for challenge 3)
    let forbiddenChars = ['\u005C', '\u002F', '\u003A', '\u002A', '\u003F', '\u0022', '\u003C', '\u003E', '\u007C'];
    processedString = processedString.replace(/[\\*\/*\:*\**\?*\"*\<*\>*\|*]/g, "-"); // source for how to use RegExp: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions
    /*
    for (i=0; i < forbiddenChars.length; i++) {
        let currentChar = forbiddenChars[i];
        if (processedString.search(currentChar) !== -1) {
            processedString = processedString.replaceAll(currentChar, '\u002D');
        }
    }
    */
    // source for the search method in strings: https://www.w3schools.com/jsref/jsref_search.asp
    // let folderName = './test/';
    processedString = `./test/${processedString}_README.md`//folderName.concat(processedString, '_README.md'); // source for the concat method in strings: https://www.w3schools.com/jsref/jsref_concat_string.asp
    // console.log(processedString);
    return processedString;
}

// TODO: Create a function to initialize app
function init() {
    // const bold = "font-weight: bold";
    // const normal = "font-weight: normal";
    // '\x1B[41;93;4mHello'
    console.log("\x1B[1mImportant:\x1B[m Inquirer only allows you to write on one line. Pressing the Enter key will move you to the next question. If you want to write a new line, use the \x1B[1m<br>\x1B[m tag. For example: This is line 1.<br> This is line 2.");
    // source for console logging bolded text using ANSI (American National Standards Institute) escape sequences: https://developer.chrome.com/docs/devtools/console/format-style/#style-console-messages
    inquirer.prompt(questions).then((responses) => {
        console.log("Creating a professional README file for your project...");
        // console.log(responses);
        /*
        console.log(JSON.stringify(responses));
        console.log(JSON.stringify(responses.title));
        console.log(JSON.stringify(responses.description));
        console.log(JSON.stringify(responses.installation));
        console.log(JSON.stringify(responses.usage));
        console.log(JSON.stringify(responses.credits));
        console.log(JSON.stringify(responses.contribution));
        console.log(JSON.stringify(responses.testing));
        console.log(JSON.stringify(responses.license));
        console.log(JSON.stringify(responses.username));
        console.log(JSON.stringify(responses.email));
        */
        writeToFile(processTitleString(responses.title), generateMarkdown(responses));
        // writeToFile(processTitleString(JSON.stringify(responses.title)), generateMarkdown(JSON.stringify(responses)));
    });
}

// Function call to initialize app
init();
