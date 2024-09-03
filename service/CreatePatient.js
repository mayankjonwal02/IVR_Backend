const { connection } = require('../database/ConnectSQL');

const CreatePatient = (req, res) => {
    const {
        engagementid,
        patientid,
        patientname,
        patientcno,
        operationtype,
        language,
        duedate,
    } = req.body;

    // Ensure the SQL matches the column count and order of the table schema
    const sql = `
        INSERT INTO patientdata (
            engagementid, patientid, patientname, patientcno, operationtype, language, calledon, NumberOfInteractions, duedate, day7, day6, day5, day4, day3, day2, day1
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? , ?)
    `;

    connection.query(sql, [
        engagementid, patientid, patientname, patientcno, operationtype, language, "", 0, duedate, "", "", "", "", "", "",""
    ], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).json({ message: 'Failed to insert data',executed: false });
            return;
        }
        res.json({ message: 'Patient added successfully' ,executed: true});
    });
}

module.exports = { CreatePatient };
