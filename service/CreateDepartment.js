const { connection } = require('../database/ConnectSQL');

const CreateDepartment = async (req, res) => {  
    const departmentName = req.body.departmentName; // Get the department name from the request body

    if (!departmentName) {
        return res.status(400).json({ error: 'Department name is required' });
    }

    // SQL query to check if the department already exists
    const checkDepartmentQuery = `
        SELECT COUNT(*) AS count 
        FROM departments 
        WHERE name = ?
    `;

    connection.query(checkDepartmentQuery, [departmentName], (error, results) => {
        if (error) {
            console.error('Error checking department existence:', error);
            return res.status(500).json({ error: 'Unable to check department' });
        }

        // If the department already exists
        if (results[0].count > 0) {
            return res.status(200).json({ message: `${departmentName} Department already exists` });
        }

        // SQL query to insert a new department
        const insertDepartmentQuery = `
            INSERT INTO departments (name) VALUES (?)
        `;

        // Execute the query to insert the department
        connection.query(insertDepartmentQuery, [departmentName], (error, results) => {
            if (error) {
                console.error('Error adding department:', error);
                return res.status(500).json({ error: 'Error adding department' });
            }
            res.status(201).json({ message: `${departmentName} Department added successfully` });
        });
    });
}

module.exports = { CreateDepartment };
