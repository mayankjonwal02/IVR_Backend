const { connection } = require('../database/ConnectSQL');

const MovePatientToPastPatients = (req, res) => {
    const { engagementid, departmentname } = req.body;

    // SQL query to get patient data from departmentname table
    const selectQuery = `
        SELECT engagementid, patientid, patientname, patientcno, operationtype, language, department, calledon,numberOfInteractions, duedate 
        FROM current_records 
        WHERE engagementid = ?;
    `;

    // SQL query to insert patient data into pastpatients table
    const insertQuery = `
        INSERT INTO past_records (
            engagementid, patientid, patientname, patientcno, operationtype, language, department, calledon, numberOfInteractions, duedate
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?, ?);
    `;

    // SQL query to delete patient from departmentname table
    const deleteQuery = `
        DELETE FROM current_records
        WHERE engagementid = ?;
    `;

    

    try {
        // Fetch the patient record
        connection.query(selectQuery, [engagementid], (err, result) => {
            if (err || result.length === 0) {
                console.error('Error fetching patient data:', err);
                return res.status(500).json({ message: 'Failed to fetch patient data', executed: false });
            }

            const patient = result[0];

            // Move the patient data to pastpatients table
            connection.query(insertQuery, [
                patient.engagementid, patient.patientid, patient.patientname, patient.patientcno,
                patient.operationtype, patient.language, patient.department, patient.calledon, patient.numberOfInteractions, patient.duedate
            ], (insertErr) => {
                if (insertErr) {
                    console.error('Error inserting into pastpatients:', insertErr);
                    return res.status(500).json({ message: 'Failed to move patient data', executed: false });
                }

                // Delete the patient from the departmentname table
                connection.query(deleteQuery, [engagementid], (deleteErr) => {
                    if (deleteErr) {
                        console.error('Error deleting patient:', deleteErr);
                        return res.status(500).json({ message: 'Failed to delete patient', executed: false });
                    }

                    res.json({ message: 'Patient moved to pastpatients and deleted successfully', executed: true });
                });
            });
        });
    } catch (error) {
        res.json({ message: String(error), executed: false });
    }
};

module.exports = { MovePatientToPastPatients };
