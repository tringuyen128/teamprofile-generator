const inquirer = require("inquirer");
const fs = require("fs");
const Engineer = require("./Lib/engineer");
const Intern = require("./Lib/intern");
const Manager = require("./Lib/manager");
const path = require("path");
const createHTML = require("./generateHTML");

//this array will be pushed with objects after users input data
const allEmployees = [];

//to write HTML file
function writeToFile(fileName, data) {
  fs.writeFileSync(path.join(__dirname, fileName), data, (err) =>
    err ? console.log(err) : console.log("Success!")
  );
}

//prompt ask questions
inputManager = () => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "mgrName",
          message: "Please enter your name",
        },
        {
          type: "input",
          name: "mgrID",
          message: "Please enter your ID number",
        },
        {
          type: "input",
          name: "mgrEmail",
          message: "Please enter your email",
        },
        {
          type: "input",
          name: "offNum",
          message: "Please enter your office phone number",
        },
      ])
      .then((answers) => {
        const nManager = new Manager(
          answers.mgrrName,
          answers.mgrID,
          answers.mgrEmail,
          answers.offNum
        );
        allEmployees.push(nManager);
        newTeammember();
      });
  };

  //this prompt will allows users to add team member info
newTeammemberPrompt = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "addMember",
        message: "Would you like to add anyone to your team?",
        choices: ["Yes", "No"],
      },
    ])
    .then((answers) => {
      if (answers.addMember === "Yes") {
        newTeammember();
      } else {
        console.log("team all built!", allEmployees);
        const fileName = "src/teamDEMO.html";
        writeToFile(fileName, createHTML(allEmployees)); //creates HTML if "would you like to add a team member === no"
      }
    });
};

//question base on roles Engineer and Intern after the anser select yes from above function
newTeammemberPrompt = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "role",
        message: "Who would you like to add?",
        choices: ["Engineer", "Intern"],
      },
      {
        type: "input",
        name: "empName",
        message: "Please enter name",
      },
      {
        type: "input",
        name: "empID",
        message: "Please enter ID number",
      },
      {
        type: "input",
        name: "empEmail",
        message: "Please enter email",
      },
      {
        type: "input",
        name: "gitHub",
        message: "Please enter your engineers GitHub username",
        when: function (answers) {
          return answers.role === "Engineer";
        },
      },
      {
        type: "input",
        name: "intSchool",
        message: "Please enter your interns school",
        when: function (answers) {
          return answers.role === "Intern";
        },
      },
    ])
    .then((answers) => {
      if (answers.role === "Engineer") {
        const nEng = new Engineer(
          answers.empName,
          answers.empID,
          answers.empEmail,
          answers.gitHub
        );
        allEmployees.push(nEng);
      } else if (answers.role === "Intern") {
        const nIntern = new Intern(
          answers.empName,
          answers.empID,
          answers.empEmail,
          answers.intSchool
        );
        allEmployees.push(nIntern);
      }
      newTeammemberPrompt();
    });
};

// to start application
function init() {
  console.log("Please build your team");
  inputManager();
}

// to initialize app
init();