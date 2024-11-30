
## API Documentation

### Base URL
All endpoints are prefixed with `/api`.

### Endpoints

#### 1. Fetch Departments
- **Endpoint:** `GET /api/fetchDepartments`
- **Description:** Retrieves a list of all departments.
- **Request Body:** None
- **Response:**
  - **Success (200):** 
    ```json
    {
      "departments": ["Department1", "Department2", ...],
      "message": "Departments fetched successfully"
    }
    ```
  - **Error (500):** 
    ```json
    {
      "error": "Failed to fetch departments"
    }
    ```

#### 2. Fetch Patients
- **Endpoint:** `POST /api/fetchPatients`
- **Description:** Fetches patients from specified departments.
- **Request Body:**
  ```json
  {
    "departmentnames": ["Department1", "Department2", ...]
  }
  ```
- **Response:**
  - **Success (200):** 
    ```json
    {
      "message": "Patients Fetched Successfully",
      "patients": [/* Array of patient objects */],
      "executed": true
    }
    ```
  - **Error (500):** 
    ```json
    {
      "error": "Error message",
      "executed": false
    }
    ```

#### 3. Create Patient
- **Endpoint:** `POST /api/createPatient`
- **Description:** Adds a new patient to the current records.
- **Request Body:**
  ```json
  {
    "engagementid": "string",
    "patientid": "string",
    "patientname": "string",
    "patientcno": "string",
    "operationtype": "string",
    "language": "string",
    "duedate": "string",
    "departmentname": "string"
  }
  ```
- **Response:**
  - **Success (200):** 
    ```json
    {
      "message": "Patient added successfully",
      "executed": true
    }
    ```
  - **Error (500):** 
    ```json
    {
      "message": "Failed to insert data",
      "executed": false
    }
    ```

#### 4. Update Patients
- **Endpoint:** `POST /api/updatePatients`
- **Description:** Updates information for a list of patients.
- **Request Body:**
  ```json
  {
    "patients": [
      {
        "engagementid": "string",
        "patientid": "string",
        "patientname": "string",
        "patientcno": "string",
        "operationtype": "string",
        "language": "string",
        "department": "string",
        "calledon": "string",
        "NumberOfInteractions": "number",
        "duedate": "string",
        "day7": "string",
        "day6": "string",
        "day5": "string",
        "day4": "string",
        "day3": "string",
        "day2": "string",
        "day1": "string"
      }
    ]
  }
  ```
- **Response:**
  - **Success (200):** 
    ```json
    {
      "message": "Patients updated successfully",
      "results": [/* Array of update results */]
    }
    ```
  - **Error (500):** 
    ```json
    {
      "error": "Failed to update one or more patients",
      "details": "Error details"
    }
    ```

#### 5. Delete Patient
- **Endpoint:** `POST /api/deletePatient`
- **Description:** Moves a patient from current records to past records and deletes them from current records.
- **Request Body:**
  ```json
  {
    "engagementid": "string",
    "departmentname": "string"
  }
  ```
- **Response:**
  - **Success (200):** 
    ```json
    {
      "message": "Patient moved to pastpatients and deleted successfully",
      "executed": true
    }
    ```
  - **Error (500):** 
    ```json
    {
      "message": "Failed to move patient data",
      "executed": false
    }
    ```

#### 6. Create Department
- **Endpoint:** `POST /api/createDepartment`
- **Description:** Creates a new department.
- **Request Body:**
  ```json
  {
    "departmentName": "string"
  }
  ```
- **Response:**
  - **Success (201):** 
    ```json
    {
      "message": "Department added successfully"
    }
    ```
  - **Error (400):** 
    ```json
    {
      "error": "Department name is required"
    }
    ```
  - **Error (500):** 
    ```json
    {
      "error": "Error adding department"
    }
    ```

#### 7. Test Connection
- **Endpoint:** `GET /api/testconnection`
- **Description:** Tests the connection to the server.
- **Request Body:** None
- **Response:**
  - **Success (200):** 
    ```json
    {
      "message": "Connection Successful"
    }
    ```

