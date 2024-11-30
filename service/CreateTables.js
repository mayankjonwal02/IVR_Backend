const { connection } = require('../database/ConnectSQL');

const CreateTables = async () => {
    const tableNames = ["current_records", "past_record", "departments"];
    const databaseName = 'ivr_database';

    // SQL query to check if a table exists
    const checkTableQuery = `
        SELECT COUNT(*) AS count 
        FROM information_schema.tables 
        WHERE table_schema = ? AND table_name = ?
    `;

    // SQL query to create the current_records table
    const createCurrentRecordsQuery = `
        CREATE TABLE IF NOT EXISTS current_records (
            engagementid VARCHAR(255),
            patientid VARCHAR(255),
            patientname VARCHAR(255),
            patientcno VARCHAR(20),
            operationtype VARCHAR(255),
            language VARCHAR(255),
            department VARCHAR(255),
            calledon VARCHAR(255),
            numberOfInteractions INT,
            duedate VARCHAR(255),
            day1 VARCHAR(255),
            day2 VARCHAR(255),
            day3 VARCHAR(255),
            day4 VARCHAR(255),
            day5 VARCHAR(255),
            day6 VARCHAR(255),
            day7 VARCHAR(255)
        )
    `;

    // SQL query to create the past_record table
    const createPastRecordQuery = `
        CREATE TABLE IF NOT EXISTS past_records (
            engagementid VARCHAR(255),
            patientid VARCHAR(255),
            patientname VARCHAR(255),
            patientcno VARCHAR(20),
            operationtype VARCHAR(255),
            language VARCHAR(255),
            department VARCHAR(255),
            calledon VARCHAR(255),
            numberOfInteractions INT,
            duedate VARCHAR(255)
        )
    `;

    // SQL query to create the departments table
    const createDepartmentsQuery = `
        CREATE TABLE IF NOT EXISTS departments (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255)
        )
    `;

    // Helper function to check if a table exists and create it if not
    const checkAndCreateTable = (tableName, createTableQuery) => {
        return new Promise((resolve, reject) => {
            connection.query(checkTableQuery, [databaseName, tableName], (error, results) => {
                if (error) {
                    console.error(`Error checking ${tableName} table existence:`, error);
                    return reject(`Error checking ${tableName} existence`);
                }

                // If the table does not exist, create it
                if (results[0].count === 0) {
                    connection.query(createTableQuery, (error) => {
                        if (error) {
                            console.error(`Error creating ${tableName} table:`, error);
                            return reject(`Error creating ${tableName}`);
                        }
                        console.log(`${tableName} table created successfully`);
                        resolve();
                    });
                } else {
                    console.log(`${tableName} table already exists`);
                    resolve();
                }
            });
        });
    };

    try {
        // Check and create each table
        await Promise.all([
            checkAndCreateTable("current_records", createCurrentRecordsQuery),
            checkAndCreateTable("past_records", createPastRecordQuery),
            checkAndCreateTable("departments", createDepartmentsQuery)
        ]);
        console.log("Tables created successfully or already exist");

        
    } catch (error) {
        console.error("Error creating tables:", error);
        
    }
}

module.exports = { CreateTables };
