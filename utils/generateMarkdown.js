let licenses = ['Apache_2.0', 'GPL_v3', 'MIT', 'BSD_2--Clause', 'BSD_3--Clause', 'Boost_1.0', 'CC0_1.0', 'EPL_1.0', 'AGPL_v3', 'GPL_v2', 'LGPL_v2.1', 'MPL_2.0', 'Unlicense']; // these are the license codes that are used to create the license badges

// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  let license_colors = ['blue', 'blue', 'yellow', 'orange', 'orange', 'lightblue', 'lightgrey', 'red', 'blue', 'blue', 'blue', 'brightgreen', 'blue']; // source for the colors that correspond to the licenses: https://gist.github.com/lukas-h/2a5d00690736b4c3a7ba
  let chosenLicense = licenses.indexOf(license.split(" ")[0]);
  // source for finding the first index that corresponds to an element in an array: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
  // this method can be used because every entry in the licenses array is unique
  // source for the split method in strings: https://www.w3schools.com/jsref/jsref_split.asp
  /*
  license.split(" ")[0] is used because the licenses from the inquirer prompt are formatted as 'code (full name)'. for example:

  AGPL_v3 (GNU Affero General Public License v3.0)

  none of the codes contains any spaces, so splitting the string by spaces will yield an array with the code as the first entry, which can be obtained using index 0.
  */

  if (license !== 'none') { // if a license has been selected
    return `![GitHub license](https://img.shields.io/badge/License-${license.split(" ")[0]}-${license_colors[chosenLicense]}.svg)`; // the first insert is the license code, the second insert is the color corresponding to it
  }
  return ""; // if no license has been selected
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
  if (license !== 'none') {
    return "- [License](#license)"; // this is inserted into the Table of Contents
  }
  return "";
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  let licenseLinks = ['https://www.apache.org/licenses/LICENSE-2.0', 'https://www.gnu.org/licenses/gpl-3.0.en.html', 'https://opensource.org/license/mit/', 'https://opensource.org/license/bsd-2-clause/', 'https://opensource.org/license/bsd-3-clause/', 'https://www.boost.org/users/license.html', 'https://creativecommons.org/publicdomain/zero/1.0/legalcode', 'https://www.eclipse.org/legal/epl-2.0/', 'https://www.gnu.org/licenses/agpl-3.0.en.html', 'https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html', 'https://www.gnu.org/licenses/old-licenses/lgpl-2.1.en.html', 'https://www.mozilla.org/en-US/MPL/2.0/', 'https://choosealicense.com/licenses/unlicense/'];
  let chosenLicense = licenses.indexOf(license.split(" ")[0]); // same as in renderLicenseBadge()
  if (license !== 'none' && license.split(" ")[0] !== 'Unlicense') {
    return `## License
This project was created using the ${license.split("(")[1].slice(0,-1)}. More information about the license can be found [here](${licenseLinks[chosenLicense]}).`; // the first insert is the full name of the license, the second insert is a link to more information about the license
// as mentioned in the comments for renderLicenseBadge, the licenses are formatted as 'code (full name)'. license.split("(") will return the array [code , full name)]. the second entry can be obtained with index 1, and the unwanted parenthesis is removed using the slice method, which returns the string up to but not including the last character. '-1' means the same thing as 'length-1', which means that the last character is omitted. source for the slice method in strings: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
  } else if (license.split(" ")[0] === 'Unlicense') {
    return `## License
This project was created using ${license.split("(")[1].slice(0,-1)}. More information about the license can be found [here](${licenseLinks[chosenLicense]}).`;
// the name 'The Unlicense' is the only full license name that starts with the word 'The', so the purpose of this block of code is to avoid saying 'This project was created using the The Unlicense.'
  }
  return "";
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  return `# ${data.title}

${renderLicenseBadge(data.license)}

## Description
${data.description}

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [Contributing](#contributing)
- [Tests](#tests)
${renderLicenseLink(data.license)}
- [Questions](#questions)

## Installation
${data.installation}

## Usage
${data.usage}

## Credits
${data.credits}

## Contributing
${data.contributing}

## Tests
${data.tests}

${renderLicenseSection(data.license)}

## Questions
If you have any questions for me, you can [follow me on GitHub](https://github.com/${data.username}) or email me at ${data.email}.
`;
}

module.exports = generateMarkdown;
