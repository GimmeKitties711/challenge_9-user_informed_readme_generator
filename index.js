// TODO: Include packages needed for this application
const inquirer = require("inquirer");
inquirer.registerPrompt("search-list", require("inquirer-search-list"));
// source for registering the search-list prompt: https://www.npmjs.com/package/inquirer-search-list
const fs = require("fs");
const generateMarkdown = require("./utils/generateMarkdown");

// TODO: Create an array of questions for user input

// this array was written using the inquirer documentation: https://www.npmjs.com/package/inquirer
const questions = [
    {
        type: "input",
        name: "title",
        message: "Give a title to your project:",
        validate: function(answer) {
            if (answer.length < 1) {
                return console.log("You must enter a project title.");
            } else if (answer.search('\\t') !== -1) {
                return console.log("You cannot include tab characters in your title.");
                // source for the search method in strings: https://www.w3schools.com/jsref/jsref_search.asp
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
        message: "Enter instructions to install software needed to use your project, if applicable:"
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
        message: "List any collaborators or web resources that helped you complete your project, if applicable:"
    },
    {
        type: "input",
        name: "contributing",
        message: "Explain how users can contribute to your project, if applicable:"
    },
    {
        type: "input",
        name: "tests",
        message: "Explain how to test your project, if applicable:"
    },
    {
        type: "search-list",
        name: "license",
        message: "Select a license for your project by typing letters to search for its name:",
        choices: ['Apache_2.0 (Apache License 2.0)', 'GPL_v3 (GNU General Public License v3.0)', 'MIT (MIT License)', 'BSD_2--Clause (BSD 2-Clause "Simplified" License)', 'BSD_3--Clause (BSD 3-Clause "New" or "Revised" License)', 'Boost_1.0 (Boost Software License 1.0)', 'CC0_1.0 (Creative Commons Zero v1.0 Universal)', 'EPL_1.0 (Eclipse Public License 2.0)', 'AGPL_v3 (GNU Affero General Public License v3.0)', 'GPL_v2 (GNU General Public License v2.0)', 'LGPL_v2.1 (GNU Lesser General Public License v2.1)', 'MPL_2.0 (Mozilla Public License 2.0)', 'Unlicense (The Unlicense)', 'none']
        // these are the choices that are available when creating a new repository in GitHub. a screenshot of this is shown in this challenge's readme.
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
    // source for the replaceAll method in strings: https://www.w3schools.com/jsref/jsref_string_replaceall.asp
    let processedString = title.replaceAll(' ', '_');
    processedString = processedString.replace(/[\\*\/*\:*\**\?*\"*\<*\>*\|*]/g, "-"); // source for how to use RegExp: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions
    // source for the replace method in strings: https://www.w3schools.com/jsref/jsref_replace.asp
    processedString = `./example/${processedString}_README.md`;
    return processedString;
}

// TODO: Create a function to initialize app
function init() {
    console.log("\x1B[1mImportant (1/3):\x1B[m Inquirer only allows you to write on one line. Pressing the Enter key will move you to the next question. If you want to write a new line, use the \x1B[1m<br>\x1B[m tag. For example: This is line 1.<br> This is line 2.");
    console.log("\x1B[1mImportant (2/3):\x1B[m The writeFileSync function requires unique file names. This README generator writes file names as \x1B[1mtitle_README.md,\x1B[m so if you use the same title for two different README files, the first one will be overwritten.");
    console.log("\x1B[1mImportant (3/3):\x1B[m Your title cannot include a tab because it causes problems with file creation. A tab is written as \x1B[1m\\t,\x1B[m and the backslash is not allowed in file names.");
    // source for console logging bolded text using ANSI (American National Standards Institute) escape sequences: https://developer.chrome.com/docs/devtools/console/format-style/#style-console-messages
    inquirer.prompt(questions).then((responses) => {
        console.log("Creating a professional README file for your project...");
        writeToFile(processTitleString(responses.title), generateMarkdown(responses));
    });
}

// Function call to initialize app
init();