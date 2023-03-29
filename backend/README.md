Admin Routes
============
The admin routes are used to manage the backend. They have more power than users

* api/admin/getAllEmployees - Params: count, offset - Returns: All employees
* api/admin/getByID - Params: id - Returns: Employee with id
* api/admin/editByID - Params: id
* api/admin/deleteByID - Params: id
* api/admin/editSalary - Params: id, salary
* api/admin/editTitle - Params: id, title

Admin Routes
==========
The Admin routes are the routes that are used by the user to interact with the db

## Admin Routes
### GET /api/admin/getAllEmployees
This endpoint returns a list of all employees in the database.

#### Parameters

#### Response
* 200: The employees were found
* 404: No employees was not found
* 401: Error
* return: {
    "status": "success",
    "results": [
        {   
            "first_name": "John",
            "last_name": "Doe",
            "phone": "123-456-7890",
            "email": "johndoe@example.com",
            "gender_id": 1,
            "create_time": "2022-03-29T15:16:09.000Z",
            "level_id": 1,
            "gym_id": 1,
            "level": "user",
            "gender": "Male"
        }
    ] 
}

### GET /api/admin/getAllEmployeesByGym
This endpoint returns a list of all employees in a gym.

#### Parameters
* gym_id: the id of the gym

#### Response
* 200: The employees were found
* 404: The employees were not found
* 401: Error
* return: {
    "status": "success",
    "results": [
        {   
            "first_name": "John",
            "last_name": "Doe",
            "phone": "123-456-7890",
            "email": "johndoe@example.com",
            "gender_id": 1,
            "create_time": "2022-03-29T15:16:09.000Z",
            "level_id": 1,
            "gym_id": 1,
            "level": "user",
            "gender": "Male"
        }
    ] 
}

### GET /api/user/getEmployeeByID
This endpoint returns a single employee based on their ID.

#### Parameters
* employee_id: the id of the employee

#### Response
* 200: Success
* 401: Error
* return: {
    "status": "success",
    "results": {   
            "first_name": "John",
            "last_name": "Doe",
            "phone": "123-456-7890",
            "email": "johndoe@example.com",
            "gender_id": 1,
            "create_time": "2022-03-29T15:16:09.000Z",
            "level_id": 1,
            "gym_id": 1,
            "level": "user",
            "gender": "Male"
    }
}

### GET /api/admin/editUserByID
This endpoint edits a user's information based on their ID.

#### Parameters
* user_id: the id of the user
* first_name: first name of the user
* last_name: last name of the user
* gender_id: gender id of the user
* level_id: level id of the user
* email: email of the user
* phone: phone of the user
* password: password of the user

#### Response
* 200: Success
* 401: Error
* 404: No employees found
* return: {
    "status": "success",
    "results": {}
}

### GET /api/user/enrollUser
This endpoint enrolls a user to the gym.

#### Parameters
* first_name: first name of the user
* last_name: last name of the user
* gender_id: gender id of the user
* level_id: level id of the user
* email: email of the user
* phone: phone of the user
* password: password of the user

#### Response
* 200: Success
* 401: Error
* 404: No employees found
* return: {
    "status": "success",
    "results": {}
}

### GET /api/user/checkinUser
This route is used to check in user to the gym

#### Parameters
* user_id: id of the user
* employee_id: id of the employee

#### Response
* 200: The user was found
* 404: No departments found
* 401: Error
* return: {
    "status": "success",
    "results": {}
}
