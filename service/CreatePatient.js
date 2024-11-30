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
        departmentname
    } = req.body;

    // Set the database name in the connection
   

        const sql = `
            INSERT INTO current_records (
                engagementid, patientid, patientname, patientcno, operationtype, language, department, calledon, numberOfInteractions, duedate, day7, day6, day5, day4, day3, day2, day1
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `;

        try {
            connection.query(sql, [
                engagementid, patientid, patientname, patientcno, operationtype, language, departmentname, "", 0, duedate, "", "", "", "", "", "", ""
            ], (err, result) => {
                if (err) {
                    console.error('Error inserting data:', err);
                    res.status(500).json({ message: 'Failed to insert data', executed: false });
                    return;
                }
                res.json({ message: 'Patient added successfully', executed: true });
            });
        } catch (error) {
            res.json({ message: String(error), executed: false });
        }
        
    
};


const CreatePatients = (req, res) => {
    const patients = req.body.patients; // Expecting an array of patients in the request body
 

    if (!Array.isArray(patients) || patients.length === 0) {
        return res.status(200).json({ error: 'No patients provided', executed: false });
    }

    

    // Fetch departments and then proceed with the rest of the logic
    connection.query('SELECT name FROM departments;', (err, results) => {
        if (err) {
            console.error('Error fetching departments:', err);
            return res.status(200).json({ error: 'Failed to fetch departments' });
        }


        const departments = results.map((row) => Object.values(row)[0].toLowerCase());
 

        // Check if each patient's department exists in the departments list and throw an error if not
        for (const patient of patients) {
            if (!departments.includes(patient.department.toLowerCase())) {
                return res.status(200).json({ error: `Department ${patient.department} does not exist`, executed: false });
            }
        }



        const sql = `
            INSERT INTO current_records (
                engagementid, patientid, patientname, patientcno, operationtype, language, department, calledon, numberOfInteractions, duedate, day7, day6, day5, day4, day3, day2, day1
            ) VALUES ?;
        `;

        const values = patients.map(patient => [
            patient.engagementid || "",
            patient.patientid || "",
            patient.patientname || "",
            patient.patientcno || "",
            patient.operationtype || "",
            patient.language || "",
            patient.department || "",
            "", // calledon
            0, // numberOfInteractions
            patient.duedate || "",
            "", "", "", "", "", "", "" // day7 to day1
        ]);

        try {
            connection.query(sql, [values], (err, result) => {
                if (err) {
                    console.error('Error inserting data:', err);
                    return res.status(200).json({ error: 'Failed to insert data', executed: false });
                }
                res.json({ message: 'Patients added successfully', executed: true });
          
            });
        } catch (error) {
            res.status(200).json({ error: error, executed: false });
        }
    });
};

module.exports = { CreatePatient , CreatePatients };
