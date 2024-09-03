const { connection } = require('../database/ConnectSQL');

const UpdatePatient = (req, res) => {
    const {
        engagementid,
        patientid,
        patientname,
        patientcno,
        operationtype,
        language,
        calledon,
        NumberOfInteractions,
        duedate,
        day7,
        day6,
        day5,
        day4,
        day3,
        day2,
        day1
    } = req.body;

    if (!engagementid) {
        return res.status(400).json({ error: 'engagementid is required' });
    }

    // Construct SQL query to update all fields
    const sql = `
        UPDATE patientdata
        SET
            patientid = ?,
            patientname = ?,
            patientcno = ?,
            operationtype = ?,
            language = ?,
            calledon = ?,
            NumberOfInteractions = ?,
            duedate = ?,
            day7 = ?,
            day6 = ?,
            day5 = ?,
            day4 = ?,
            day3 = ?,
            day2 = ?,
            day1 = ?
        WHERE engagementid = ?
    `;

    const values = [
        patientid,
        patientname,
        patientcno,
        operationtype,
        language,
        calledon,
        NumberOfInteractions,
        duedate,
        day7,
        day6,
        day5,
        day4,
        day3,
        day2,
        day1,
        engagementid
    ];

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating data:', err);
            res.status(500).json({ error: 'Failed to update data' });
            return;
        }
        res.json({ message: 'Patient updated successfully', affectedRows: result.affectedRows });
    });
}

module.exports = { UpdatePatient };
