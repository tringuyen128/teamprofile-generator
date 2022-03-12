const inquirer = require("inquirer");
const fs = require("fs");





//prompt ask questions
newManager = () => {
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
        newTeammatePrompt();
      });
  };