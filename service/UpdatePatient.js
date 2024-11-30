const { connection } = require('../database/ConnectSQL');

const UpdatePatients = (req, res) => {
    const patients = req.body.patients; // Expecting an array of patients


    // console.log(patients.length)
    // Check if the body contains an array of patients
    if (!Array.isArray(patients) || patients.length === 0) {
        return res.status(400).json({ error: 'A list of patients is required' });
    }

    // Step 1: Change the database based on departmentname
    

        // Prepare to keep track of results
        const updatePromises = patients.map(patient => {
            const {
                engagementid,
                patientid,
                patientname,
                patientcno,
                operationtype,
                language,
                department,
                calledon,
                numberOfInteractions,
                duedate,
                day7,
                day6,
                day5,
                day4,
                day3,
                day2,
                day1
            } = patient;

            // Check if engagementid is provided for each patient
            if (!engagementid) {
                return Promise.reject({ error: 'engagementid is required for each patient' });
            }

            // Construct SQL query to update all fields for the patient
            const sql = `
                UPDATE current_records
                SET
                    patientid = ?,
                    patientname = ?,
                    patientcno = ?,
                    operationtype = ?,
                    language = ?,
                    department = ?,
                    calledon = ?,
                    numberOfInteractions = ?,
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
                department,
                calledon,
                numberOfInteractions,
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

            // Return a promise for each update operation
            return new Promise((resolve, reject) => {
                connection.query(sql, values, (err, result) => {
                    if (err) {
                        console.error(`Error updating patient with engagementid ${engagementid}:`, err);
                        return reject(err); // Reject if there's an error
                    }
                    resolve({ engagementid, affectedRows: result.affectedRows }); // Resolve with success info
                });
            });
        });

        // Step 2: Execute all updates in parallel
        Promise.all(updatePromises)
            .then(results => {
                res.json({ message: 'Patients updated successfully', results });
            })
            .catch(err => {
                res.status(500).json({ error: 'Failed to update one or more patients', details: err });
            });
    
};

module.exports = { UpdatePatients };
