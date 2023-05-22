/register {username, password, email, firstName, lastName, gender, units, height, dob}
Registers a user.
Returns {success:true} if successful, and {success:false, reason} if not.

/login {username,password}
Attempts to a log in a user.

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
