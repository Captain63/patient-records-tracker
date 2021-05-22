# MVC Patient Records 

## Table of Contents
* [Description](#description)
* [Usage](#usage)
* [Acceptance](#acceptance)
* [Installation](#installation)
* [Contributing](#contributing)
* [Tests](#tests)

## Description
Full-stack application following MVC paradigm for creating, updating, sorting and deleting patient records.The UI will feature tags for sorting by different patients associated with the specific user and for sorting by different injuries/appointments/other criteria to allow for quicker access to relevant information. The application will also utilize a search bar for quick searches of existing records and a built in calendar widget for searching for records created on specific days.

## Usage 
```md
AS A doctor at a hospital
I WANT a back end and front end application that I can record my patient records
SO THAT I can always look back at patients records when they visit
```

## Acceptance Criteria

```md
GIVEN a functionally patient record database
WHEN I open the home page
THEN I am presented with records od recent notes from patients
WHEN I open a new record
THEN I am presented with a blank area to type
WHEN I click to save the new record
THEN the record is store under that patient name
WHEN I click the edit button on a record
THEN I am able to edit the information on the record
WHEN I click on the delete button for a record
THEN that record is removed from the database
WHEN I search for a patients name
THEN I am presented with that patients records
```
## Installation
Clone the repository to your local development environment.
```
git clone https://github.com/Captain63/patient-records-tracker.git
```

Run npm install to install all dependencies. Then run ```mysql -u root < db/schema.sql``` to create the database. Then run ```node seeds``` to seed the database with the information from the seeds file. Then create a .env file. To use the application locally, run ```npm run start``` in your CLI, and then open http://localhost:3001 in your preferred browser.


## Contributing
Rachel Handschuh GitHub: [@rhandschuh](https://api.github.com/users/rhandschuh)

James Corcoran GitHub: [@jcorcorangithub](https://api.github.com/users/jcorcorangithub)

Stephen Roddewig GitHub: [@Captain63](https://api.github.com/users/Captain63)

Brandon Ford GitHub: [@brandonfordd](https://api.github.com/users/brandonfordd)


## Tests
There are no test!

## Questions?
For any questions, please contact anyone! 

  