const db = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');

const showOptions = () => {
    inquirer
        .prompt([{
                    type: 'list',
                    name: 'options',
                    message: 'What would you like to do?',
                    choices: [
                        'View all employees',
                        'View all departments',
                        'View all roles',
                        'Add a department',
                        'Add a role',
                        'Add an employee',
                        'Update an employee role',
                    ]
                }])

    .then(data => {
        let option = data.options;

        if (data.option === 'View all employees') {
            viewEmp();
        }
        else if (data.option === 'View all departments') {
            viewDep();
        }
        else if (data.option === 'View all roles') {
            viewRol();
        }
        else if (data.option === 'Add a department') {
            addDep();
        }
        else if (data.option === 'Add a role') {
            addRol();
        }
        else if (data.options === 'Add an employee') {
            addEmp();
        }
        else {
            updateEmp();
        }
    })            
};

const viewEmp = () => {
    const sql = `SELECT
    employee.id,
    employee.first_name,
    employee.last_name,
    role.title,
    role.salary,
    department.name AS 'department',
    employee.manager_id AS 'manager 
    CONCAT (manager.first_name, " ", manager.last_name) AS 'manager.id'
    FROM employee, role, department
    WHERE department.id = role.department_id
    AND role.id = employee.role_id`;

    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        showOptions(); 
    })
};
const viewDep = () => {
    const sql = 'SELECT * FROM department';
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        showOptions();
    })
};

const viewRol = () => {
    const sql = `SELECT
    role.title,
    role.id,
    role.salary,
    department.name AS 'department',
    FROM role
    JOIN department ON role.department_id = department.id`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        showOptions();
    })
};

const addDep = () => {
    inquirer
        .prompt([{
            type: 'input',
            name: 'newDep',
            message: 'Enter department name:',
            validate: newName => {
                if (newName) {
                    return truw;
                } else {
                    console.log('must enter name');
                    return false;
                }
            }
        }]) .then(input => {
            const sql = `INSERT INTO department (name) VALUES (?)`;

            db.query(sql, input.newDep, (err, rows) => {
                if (err) throw err;
                console.table(rows);
                showOptions();
            })
        })
};

const addRol = () => {
    inquirer
        .prompt([{
            type: 'input',
            name: 'newRol',
            message: 'Enter role title:',
            validate: newRol => {
                if (newRol) {
                    return truw;
                } else {
                    console.log('must enter role');
                    return false;
                }
            }
        },
    {
        type: 'input',
        name: 'salary',
        message: 'Enter salary amount:',
        validate: amount => {
            if (amount) {
                return true;
            } else {
                console.log('must enter salary amount');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'depId',
        message: 'Enter department ID for this role:',
        validate: number => {
            if (number) {
                return true;
            } else {
                console.log('must enter department ID');
                return false;
            }
        }
    }]).then(data => {
        let newRol = [data.newRol, data.salary, data.depId];

        const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`;

            db.query(sql, newRol, (err, rows) => {
                if (err) throw err;
                console.table(rows);
                showOptions();
            })
    })
};

const addEmp = () => {
    inquirer
        .prompt([{
                type: 'input',
                name: 'newEmp',
                message: 'Enter the first name of the new employee:',
                validate: firstName => {
                    if(firstName) {
                        return true;
                    } else {
                        console.log('Must provide a first name:');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'newLast',
                message: 'Enter the last name of the new employee:',
                validate: lastName => {
                    if(lastName) {
                        return true;
                    } else {
                        console.log('Must provide a last name:');
                        return false;
                    } 
                }       
            },
            {
                type: 'input',
                name: 'empMang',
                message: 'Enter the ID of the manager for the new employee:',
                validate: empMangId => {
                    if(empMangId) {
                        return true;
                    } else {
                        console.log('Must provide a manager ID:');
                        return false;
                    } 
                }       
        }]).then(data => {
            let newEmpl = [data.firstName, data,lastName, data.empMang];

            const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)) VALUES (?,?,?)`;

            db.query(sql, newEmpl, (err, rows) => {
                if (err) throw err;
                console.table(rows);
                showOptions();
            })
        })
};

const updateEmp = () => {
    const sql = db.query(`SELECT first_name, last_name FROM employee;`)

    inquirer
        .prompt([{
            type: 'input',
            name: 'empId',
            message: 'Enter employee ID that needs updating:',
            validate: emplId => {
                if(emplId) {
                    return true;
                } else {
                    console.log('Must enter an employee ID');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'newEmpId',
            message: 'Enter new employee role ID:',
            validate: newId => {
                if(newId) {
                    return true;
                } else {
                    console.log('Must enter new ID:')
                    return false;
                }
            }
        }]).then(data => {
            db.query(`UPDATE employee SET role_id = ?`, [data.newEmpId, data.empId], (err, input) => {
                if(err) throw err;
                console.log('Employee info updated!');
                showOptions();
            })
        })
}

showOptions();