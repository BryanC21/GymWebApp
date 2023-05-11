Admin Routes
============
The admin routes are used to manage the backend. They have more power than users

* api/admin/getAllEmployees
* api/admin/getAllEmployeesByGym
* api/admin/getEmployeeByID
* api/admin/getClassCountByGymId
* api/admin/getEnrollCountByGymId
* api/admin/getMemberCountPerHourByGymId
* api/admin/getMemberCountPerHourByGymIdWithWeek
* api/admin/getHoursCountByGymId

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
            "id": 1,
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
            "id": 1,
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
            "id": 1,
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

### GET /api/user/getClassCountByGymId
This endpoint returns number of classes in a gym.

#### Parameters
* gym_id: the id of the gym
* interval: per day/week

#### Response
* 200: Success
* 401: Error
* return: {
    "status": "success",
    "results": {   
            "time": "2022-03-29T15:16:09.000Z",
            "count": 1,
    }
}


### GET /api/user/getEnrollCountByGymId
This endpoint returns number of enrolls in a gym.

#### Parameters
* gym_id: the id of the gym
* interval: per day/week

#### Response
* 200: Success
* 401: Error
* return: {
    "status": "success",
    "results": {   
            "time": "2022-03-29T15:16:09.000Z",
            "count": 1,
    }
}

### GET /api/user/getMemberCountPerHourByGymId
This endpoint returns number of member checkins in a gym.

#### Parameters
* gym_id: the id of the gym

#### Response
* 200: Success
* 401: Error
* return: {
    "status": "success",
    "results": {   
            "time": "2022-03-29T15:16:09.000Z",
            "checkin_hour": 1,
            "count": 1,
    }
}

### GET /api/user/getMemberCountPerHourByGymIdWithWeek
This endpoint returns number of member checkins in a gym with weekday/weekend.

#### Parameters
* gym_id: the id of the gym
* interval: per day/week

#### Response
* 200: Success
* 401: Error
* return: {
    "status": "success",
    "results": {   
            "checkin_hour": 1,
            "count": 1,
    }
}

### GET /api/user/getHoursCountByGymId
This endpoint returns number of hours in a gym.

#### Parameters
* gym_id: the id of the gym
* interval: per day/week

#### Response
* 200: Success
* 401: Error
* return: {
    "status": "success",
    "results": {
            "time": "2022-03-29T15:16:09.000Z",
            "count": 1,
    }
}

User Routes
============
The user routes are used to manage users

* api/user/getAllUsers
* api/user/getUserByID
* api/user/editUserByID
* api/user/getAllLevels 
* api/user/getAllGenders
* api/user/enrollUser
* api/user/checkinUser
* api/user/checkoutUser
* api/user/getCheckinByUserId

## User Routes
### GET /api/user/getAllUsers
This endpoint returns a list of all users in the database.

#### Parameters

#### Response
* 200: The users were found
* 404: No users were found
* 401: Error
* return: {
    "status": "success",
    "results": [
        {   
            "id": 1,
            "first_name": "John",
            "last_name": "Doe",
            "phone": "123-456-7890",
            "email": "johndoe@example.com",
            "gender_id": 1,
            "create_time": "2022-03-29T15:16:09.000Z",
            "level_id": 1,
            "level": "user",
            "gender": "Male"
        }
    ] 
}

### GET /api/user/getUserByID
This endpoint returns a single user based on their ID.

#### Parameters
* user_id: the id of the user

#### Response
* 200: Success
* 401: Error
* return: {
    "status": "success",
    "results": {
            "id": 1,
            "first_name": "John",
            "last_name": "Doe",
            "phone": "123-456-7890",
            "email": "johndoe@example.com",
            "gender_id": 1,
            "create_time": "2022-03-29T15:16:09.000Z",
            "level_id": 1,
            "level": "user",
            "gender": "Male"
    }
}

### GET /api/user/editUserByID
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

### GET /api/user/getAllLevels
This endpoint returns a list of all levels in the database.

#### Parameters

#### Response
* 200: Success
* 401: Error
* 404: No levels found
* return: {
    "status": "success",
    "results": [
        {
            id: 1,
            name: "user",
        }
    ]
}

### GET /api/user/getAllGenders
This endpoint returns a list of all genders in the database.

#### Parameters

#### Response
* 200: Success
* 401: Error
* 404: No gender found
* return: {
    "status": "success",
    "results": [
        {
            id: 1,
            name: "user",
        }
    ]
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
* 200: success
* 401: Error
* 404: No record found
* return: {
    "status": "success",
    "results": {}
}

### GET /api/user/checkoutUser
This route is used to check in user to the gym

#### Parameters
* checkin_id: id of the checkin record

#### Response
* 200: success
* 401: Error
* 404: No record found
* return: {
    "status": "success",
    "results": {}
}

### GET /api/user/getCheckinByUserId
This route is used to get the id of the most recent checkin record of the user 

#### Parameters
* user_id: id of the user

#### Response
* 200: success
* 401: Error
* 404: No record found
* return: {
    "status": "success",
    "results": {}
}

Gym Routes
============
The gym routes are used to manage gyms

* api/gym/getAllGyms
* api/gym/getGymByID

## User Routes
### GET /api/gym/getAllGyms
This endpoint returns a list of all gyms in the database.

#### Parameters

#### Response
* 200: The users were found
* 404: No users were found
* 401: Error
* return: {
    "status": "success",
    "results": [
        {   
            "id": 1,
            "location_id": 1,
            "city": "San Jose",
            "state": "CA",
            "country": "United States",
            "address": "1 Washington Sq",
        }
    ] 
}

### GET /api/gym/getGymByID
This endpoint returns a single gym based on their ID.

#### Parameters
* gym_id: the id of the gym

#### Response
* 200: Success
* 401: Error
* return: {
    "status": "success",
    "results": {   
        "id": 1,
        "location_id": 1,
        "city": "San Jose",
        "state": "CA",
        "country": "United States",
        "address": "1 Washington Sq",
    }
}

Class Routes
============
The class routes are used to manage classes

* api/class/getAllClasses
* api/class/getClassesByGym
* api/class/getClassById
* api/class/getClassesByUserId
* api/class/enrollClass
* api/class/addActivity
* api/class/addClass

## User Routes
### GET /api/class/getAllClasses
This endpoint returns a list of all classes in the database.

#### Parameters

#### Response
* 200: The classes were found
* 404: No classes were found
* 401: Error
* return: {
    "status": "success",
    "results": [
        {   
            "id": 1,
            "activity_id": 1,
            "activity_name": "cycling",
            "employee_id": 1,
            "gym_id": 1,
            "employee_id": 1,
            "start_time": "2022-03-29T15:16:09.000Z",
            "duration": 60,
            "capacity": 10
        }
    ] 
}

### GET /api/class/getClassesByGym
This endpoint returns a list of all classes in the gym.

#### Parameters
* gym_id: the id of the gym

#### Response
* 200: Success
* 401: Error
* return: {
    "status": "success",
    "results": [
        {   
            "id": 1,
            "activity_id": 1,
            "activity_name": "cycling",
            "employee_id": 1,
            "gym_id": 1,
            "employee_id": 1,
            "start_time": "2022-03-29T15:16:09.000Z",
            "duration": 60,
            "capacity": 10
        }
    ] 
}

### GET /api/class/getClassById
This endpoint returns a class with its id.

#### Parameters
* class_id: the id of the class

#### Response
* 200: Success
* 401: Error
* return: {
    "status": "success",
    "results": {   
        "id": 1,
        "activity_id": 1,
        "activity_name": "cycling",
        "employee_id": 1,
        "gym_id": 1,
        "employee_id": 1,
        "start_time": "2022-03-29T15:16:09.000Z",
        "duration": 60,
        "capacity": 10
    }
}

### GET /api/class/getClassesByUserId
This endpoint returns all classes enrolled by user.

#### Parameters
* user_id: the id of the user

#### Response
* 200: Success
* 401: Error
* return: {
    "status": "success",
    "results": [
        {   
            "id": 1,
            "activity_id": 1,
            "activity_name": "cycling",
            "employee_id": 1,
            "gym_id": 1,
            "employee_id": 1,
            "start_time": "2022-03-29T15:16:09.000Z",
            "duration": 60,
            "capacity": 10
        }
    ] 
}

### GET /api/class/enrollClass
This endpoint returns a single class based on their ID.

#### Parameters
* user_id: the id of the user
* class_id: the id of the class

#### Response
* 200: Success
* 401: Error
* return: {
    "status": "success",
    "results": {}
}

### GET /api/class/addClass
This endpoint returns a single class based on their ID.

#### Parameters
* activity_id: the id of the activity
* employee_id: the id of the employee
* gym_id: the id of the gym
* start_time: the start time of the class
* duration: the duration time of the class
* capacity: the capacity time of the class

#### Response
* 200: Success
* 401: Error
* return: {
    "status": "success",
    "results": {}
}

### GET /api/class/addActivity
This endpoint returns a single class based on their ID.

#### Parameters
* name: the name of the activity

#### Response
* 200: Success
* 401: Error
* return: {
    "status": "success",
    "results": {}
}


SSO Routes
============
The sso routes are used to manage sso

* api/sso/userSignin
* api/sso/employeeSignin
* api/sso/verifyToken

## SSO Routes
### GET /api/sso/userSignin
This endpoint use for user signin.

#### Parameters
* email: email of the user
* password: password of the user

#### Response
* 200: Sign in success
* 404: Sign in failed
* 401: Error
* return: {
    "status": "success",
    "token": "abcdefg",
    "results": {   
        "id": 1,
        "first_name": "John",
        "last_name": "Doe",
        "phone": "123-456-7890",
        "email": "johndoe@example.com",
        "gender_id": 1,
        "create_time": "2022-03-29T15:16:09.000Z",
        "level_id": 1,
        "level": "user",
        "gender": "Male"
    }
}

### GET /api/sso/employeeSignin
This endpoint use for employee signin.

#### Parameters
* email: email of the employee
* password: password of the employee

#### Response
* 200: Sign in success
* 404: Sign in failed
* 401: Error
* return: {
    "status": "success",
    "token": "abcdefg",
    "results": {   
        "id": 1,
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


### GET /api/sso/verifyToken
This endpoint use to verify the token.

#### Parameters
* email: email of the employee
* password: password of the employee

#### Response
* 200: Verify success
* 401: Error
* return: {
    "status": "success",
    "token": "abcdefg",
    "results": {   
        "id": 1,
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