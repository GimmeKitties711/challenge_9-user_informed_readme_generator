let licenses = ['Apache_2.0', 'GPL_v3', 'MIT', 'BSD_2--Clause', 'BSD_3--Clause', 'Boost_1.0', 'CC0_1.0', 'EPL_1.0', 'AGPL_v3', 'GPL_v2', 'LGPL_v2.1', 'MPL_2.0', 'Unlicense'];

// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  let license_colors = ['blue', 'blue', 'yellow', 'orange', 'orange', 'lightblue', 'lightgrey', 'red', 'blue', 'blue', 'blue', 'brightgreen', 'blue']; // source for the colors that correspond to the licenses: https://gist.github.com/lukas-h/2a5d00690736b4c3a7ba
  let chosenLicense = licenses.indexOf(license.split(" ")[0]); // source for finding the first index that corresponds to an element in an array: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
  // this method can be used because every entry in the licenses array is unique
  // source for the split method in strings: https://www.w3schools.com/jsref/jsref_split.asp
  if (license !== 'none') { // if a license has been selected
    return `![GitHub license](https://img.shields.io/badge/License-${license.split(" ")[0]}-${license_colors[chosenLicense]}.svg)`;
  }
  return ""; // if no license has been selected
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
  if (license !== 'none') {
    return "- [License](#license)";
  }
  return "";
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  let licenseFullNames = ['Apache License 2.0', 'GNU General Public License v3.0', 'MIT License', 'BSD 2-Clause "Simplified" License', 'BSD 3-Clause "New" or "Revised" License', 'Boost Software License 1.0', 'Creative Commons Zero v1.0 Universal license', 'Eclipse Public License 2.0', 'GNU Affero General Public License v3.0', 'GNU General Public License v2.0', 'GNU Lesser General Public License v2.1', 'Mozilla Public License 2.0', 'The Unlicense'];
  let licenseLinks = ['https://www.apache.org/licenses/LICENSE-2.0', 'https://www.gnu.org/licenses/gpl-3.0.en.html', 'https://opensource.org/license/mit/', 'https://opensource.org/license/bsd-2-clause/', 'https://opensource.org/license/bsd-3-clause/', 'https://www.boost.org/users/license.html', 'https://creativecommons.org/publicdomain/zero/1.0/legalcode', 'https://www.eclipse.org/legal/epl-2.0/', 'https://www.gnu.org/licenses/agpl-3.0.en.html', 'https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html', 'https://www.gnu.org/licenses/old-licenses/lgpl-2.1.en.html', 'https://www.mozilla.org/en-US/MPL/2.0/', 'https://choosealicense.com/licenses/unlicense/'];
  let chosenLicense = licenses.indexOf(license.split(" ")[0]);
  if (license !== 'none' && license.split(" ")[0] !== 'Unlicense') {
    return `## License
This project was created using the ${licenseFullNames[chosenLicense]}. More information about the license can be found [here](${licenseLinks[chosenLicense]}).`;
  } else if (license.split(" ")[0] === 'Unlicense') {
    return `## License
This project was created using ${licenseFullNames[chosenLicense]}. More information about the license can be found [here](${licenseLinks[chosenLicense]}).`;
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
