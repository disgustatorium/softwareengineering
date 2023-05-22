# Server-Side Code Docs

## Dependencies

**express:** Web framework for Node.js. <br>
**body-parser:** Node.js body parsing middleware.<br>
**mysql:** Node.js driver for MySQL.<br>
**crypto:** Node.js cryptographic functionality.<br>
**jsonwebtoken:** JSON Web Token (JWT) implementation for Node.js.<br>
**cors:** Cross-Origin Resource Sharing (CORS) middleware for Express.js.<br>
**nodemailer:** Node.js module for sending emails.<br>
**fs:** Node.js file system module.<br>
**path:** Node.js path module.<br>
**dotenv:** Loads environment variables from a .env file 

## Endpoints

### Route: Send Email

**Route:** POST /send-email <br>

**Description:** Reads an HTML file, replaces a placeholder with a provided value, and sends an email with the modified HTML content.<br>

**Request Payload:** <br>
- `file`: File name (without the path) of the HTML file to be used. <br>
- `name`: Name value to be inserted in the HTML file. <br>
- `to`: Recipient email address.<br>
- `subject`: Email subject.<br>
    
**Response:** <br>
On success: Status code 200 with a JSON response { "message": "Email sent successfully" }. <br>
    
On failure: Status code 500 with a JSON response { "error": "Failed to send email", "reason": "Error message" }.

### Route: User Registration

**Route:** POST /register <br>

**Description:** Registers a new user in the database. <br>

**Request Payload:** 
- `username`<br>
- `password`<br>
- `email`<br>
- `firstName`<br>
- `lastName`<br>
- `gender`: male, female or other (use M/F/X)<br>
- `units`: units of measurement, metric or imperial (use M/I)<br>
- `height`: stored in metric format server-side, converted client side<br>
- `dob`: date of birth<br>
    
**Response:** <br>
On success: Status code 200 with a JSON response { "success": true } <br>

On failure: Status code 200 with a JSON response { "success": false, "reason": "Error message" }. <br>

### Route: User Login

**Route:** POST /login <br>

**Description:** Attempts to login a user <br>

**Request Payload:** <br>
- `username`<br>
- `password`<br>

**Response:** <br>
On success: Status code 200 with a JSON response { "success": true, "token": "JWT" }, where "JWT" is the generated JSON Web Token. <br>

On failure: Status code 200 with a JSON response { "success": false, "reason": "Error message" }.

## other (to be finished)

/recordFood {token,data:{dateRecorded, timeRecorded, foodType, quantity}}
Records a food.
Returns {success:true} if successful, and {success:false, reason} if not.

/recordWeight {token,data:{dateRecorded, timeRecorded, weight}}
Records a weight.
Returns {success:true} if successful, and {success:false, reason} if not.

/recordExercise {token,data:{dateRecorded, timeRecorded, hours}}
Records an exercise.
Returns {success:true} if successful, and {success:false, reason} if not.

/getGoals {token}
Returns an array of the user's goals as JSON: {success, data}

/getFoods {token}
Returns an array of all food types in the DB as JSON: {success, data}

/getFoodRecords {token}
Returns an array of all the user's weight records in the DB as JSON: {success, data}

/getWeightRecords {token}
Returns an array of all the user's weight records in the DB as JSON: {success, data}

/getExerciseRecords {token}
Returns an array of all the user's weight records in the DB as JSON: {success, data}

/recordGoal {token, data:{category, quantity, dateCreated, endDate}}
Records a goal and adds it to the users goals.

/createGroup {token, groupName}
Creates a group with the specified name.
Returns {success:true} if successful, and {success:false, reason} if not.

/joinGroup {token, groupID}
Joins a group with the specified ID.
Returns {success:true} if successful, and {success:false, reason} if not.
