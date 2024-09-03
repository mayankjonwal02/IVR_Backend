const { connection } = require('../database/ConnectSQL');

const DeletePatient = (req, res) => {
    const { engagementid } = req.body;

    if (!engagementid) {
        return res.status(400).json({ error: 'engagementid is required' });
    }

    // Step 1: Retrieve the record to be deleted
    const selectSql = `
        SELECT engagementid, patientid, patientname, patientcno, operationtype, duedate
        FROM patientdata
        WHERE engagementid = ?
    `;

    connection.query(selectSql, [engagementid], (selectErr, results) => {
        if (selectErr) {
            console.error('Error retrieving data:', selectErr);
            return res.status(500).json({ error: 'Failed to retrieve data' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Record not found' });
        }

        const record = results[0];

        // Step 2: Insert the record into the pastpatients table
        const insertSql = `
            INSERT INTO pastpatients (
                engagementid, patientid, patientname, patientcno, operationtype, duedate
            ) VALUES (?, ?, ?, ?, ?, ?)
        `;

        const insertValues = [
            record.engagementid,
            record.patientid,
            record.patientname,
            record.patientcno,
            record.operationtype,
            record.duedate
        ];

        connection.query(insertSql, insertValues, (insertErr) => {
            if (insertErr) {
                console.error('Error inserting data into pastpatients:', insertErr);
                return res.status(500).json({ error: 'Failed to transfer data to pastpatients' });
            }

            // Step 3: Delete the record from the patientdata table
            const deleteSql = `
                DELETE FROM patientdata
                WHERE engagementid = ?
            `;

            connection.query(deleteSql, [engagementid], (deleteErr) => {
                if (deleteErr) {
                    console.error('Error deleting data:', deleteErr);
                    return res.status(500).json({ error: 'Failed to delete data' });
                }

                res.json({ message: 'Patient record deleted and transferred successfully' });
            });
        });
    });
}

module.exports = { DeletePatient };
