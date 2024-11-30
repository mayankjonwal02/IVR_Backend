const { connection } = require('../database/ConnectSQL');

const fetchAllDepartments= (req, res) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT name FROM departments;', (err, results) => {
            if (err) {
                console.error('Error fetching departments:', err);
                return res.status(500).json({ error: 'Failed to fetch departments' });
            } else {
                // The key for the table name is dynamic (based on the current database),
                // so we need to access it using Object.values to get the table name
                const departments = results.map((row) => Object.values(row)[0]);

                return res.json({
                    departments : departments,
                    message: "Departments fetched successfully"
                });
            }
        });
    });
};

module.exports = { fetchAllDepartments };
