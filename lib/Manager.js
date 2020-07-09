// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee")

class Manager{
    constructor(name, id, email, officeNum){
        new Employee(name, id, email)
        this.officeNumber = officeNum;
        this.role = "Manager";
    }
    
    getRole(){
        return this.role;
    }

    getOfficeNumber(){
        return this.officeNumber;
    }
}

module.exports = Manager;