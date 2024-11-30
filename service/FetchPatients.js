const { connection } = require('../database/ConnectSQL');
const moment = require('moment');

const fetchPatients = (req, res) => {
    const { departmentnames } = req.body;

    if (!departmentnames || !Array.isArray(departmentnames) || departmentnames.length === 0) {
        return res.status(400).json({ error: "departmentnames should be a non-empty array", executed: false });
    }

    // SQL query with placeholders for each department name
    const sql = `SELECT * FROM current_records WHERE department IN (${departmentnames.map(() => '?').join(', ')})`;

    // Execute the query with departmentnames as values for the placeholders
    connection.query(sql, departmentnames, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err, executed: false });
        }

        // Log the fetched patients
        console.log("Fetched patients:", result);
        
        const sortedPatients = filterAndSortPatients(result);
        return res.status(200).json({ message: "Patients Fetched Successfully", patients: sortedPatients, executed: true });
    });
};



const filterAndSortPatients = (patients) => {
    const currentDate = moment().startOf('day'); // Current date without time part
    
    // Filter patients where the due date is in the future and within 7 days from now
    const filteredPatients = patients.filter(patient => {
        const currentDate = moment().startOf('day'); 
        const dueDate = moment(patient.duedate, 'DD-MM-YYYY').startOf('day');
        return dueDate.isAfter(currentDate) && dueDate.diff(currentDate, 'days') <= 7;
    });

    // Sort patients based on days until due, number of interactions, and days since last call
    const sortedPatients = filteredPatients.sort((a, b) => {
        const currentDate = moment().startOf('day'); 
        const dueDateA = moment(a.duedate, 'DD-MM-YYYY').startOf('day');
        const dueDateB = moment(b.duedate, 'DD-MM-YYYY').startOf('day');
        
        const calledOnA = a.calledon ? moment(a.calledon, 'DD-MM-YYYY').startOf('day') : currentDate.clone().subtract(7, 'days');
        const calledOnB = b.calledon ? moment(b.calledon, 'DD-MM-YYYY').startOf('day') : currentDate.clone().subtract(7, 'days');
        
        // Days until due date for each patient
        const daysUntilDueA = dueDateA.diff(currentDate, 'days');
        const daysUntilDueB = dueDateB.diff(currentDate, 'days');
        
        // Number of interactions for each patient
        const interactionsA = a.NumberOfInteractions;
        const interactionsB = b.NumberOfInteractions;
        
        // Days since last call for each patient
        const daysSinceCalledA = currentDate.diff(calledOnA, 'days');
        const daysSinceCalledB = currentDate.diff(calledOnB, 'days');

        // Combine sorting criteria
        return (
            (daysUntilDueA - daysUntilDueB) || // First prioritize by days until due
            (interactionsA - interactionsB) || // Then prioritize by number of interactions
            (daysSinceCalledA - daysSinceCalledB) // Lastly, prioritize by days since last call
        );
    });
    


    return sortedPatients;
};


module.exports = { fetchPatients };
