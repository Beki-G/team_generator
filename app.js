const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const question = [
    {
        name:"EmployeeType",
        message:"What type of Team Member would you like to add?",
        type:"list",
        choices:[ "Manager", "Engineer", "Intern", "Team Complete"]
    }
];

const employeeQuestion=[{
    name:"name",
    message:"What is the thier name?",
    type:"input"
},
{
    name:"id",
    message:"What is the their Employee ID?",
    type:"input"
},
{
    name:"email",
    message: "What is their email? "
}];

const questionByEmployeeType={
    Manager: {    
        name:"officeNum",
        message:"What is the manager's office number?",
        type:"input"
    },
    Engineer: {
        name:"github",
        message: "What is engineers github?",
        type:"input"
    },
    Intern:{
        name:"school",
        message:"What is the intern's school?",
        type:"input"
    }
}

const teamArr =[];

function getNewMemberQuestions(memberType){
    //reset employee question to original length
    employeeQuestion.length = 3

    //get the correct question to ask for the new team memember type
    const memberQuestion = questionByEmployeeType[memberType];

    //add to employee questions
    employeeQuestion.push(memberQuestion);
    return(employeeQuestion)
    
}

function createNewMember(memberInfo, memberType){
    let newMember;
    const {name, id, email} = memberInfo;

    switch(memberType){
        case "Manager":
            const {officeNum} = memberInfo;
            newMember = new Manager(name, id, email, officeNum);
            break;
        case "Engineer":
            const {github} = memberInfo;
            newMember = new Engineer(name, id, email, github);
            break;
        case "Intern":
            const {school}=  memberInfo;
            newMember = new Intern(name, id, email, school)
            break;
    }

    return newMember;
}

async function initiateTeam(){
    const {EmployeeType} = await inquirer.prompt(question) 
    console.log(EmployeeType)

    switch (EmployeeType){
    case "Team Complete":
        console.log("=====================================");
        console.log("Here is your new team info!");
        console.log(teamArr)
        break;

    default:
        console.log(`You've chosen to add a(n) ${EmployeeType} to your team`);
        const memberQuestions = getNewMemberQuestions(EmployeeType);
        const memberInformation = await inquirer.prompt(memberQuestions);
        const newMember = createNewMember(memberInformation, EmployeeType)
        console.log(newMember)
        console.log("-------------------------------------")
        initiateTeam();
        break;
    }
}
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

initiateTeam();