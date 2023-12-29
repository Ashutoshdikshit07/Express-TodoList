# Express-TodoList
Todo List created using express and mongoose.

#How to test it.

1. npm install
2. To Run: nodemon TodoServer.js
3. To testout all the routes, use postman.
4. To view the whole todo list.
    http://localhost:3001/todos/ (its a get request which can been seen in the browser as well)
5. To view a specific todo item. 
     METHOD: GET http://localhost:3001/todos/:id 
     Id should be the one which is automatically assigned by the mongoDB.
     for eg: http://localhost:3001/todos/658dc2d59a4714737a071073
6. To update a specific todo item.
    METHOD: PUT http://localhost:3001/todos/:id 
    Id should be the one which is automatically assigned by the mongoDB.
    for eg: http://localhost:3001/todos/658dc2d59a4714737a071073
    And pass the data which needs to be updated in the body. 
    Eg: {
        "title":"dont study dude, sleep",
        "description": "EXTREMELY IMPORTANT",
        "completed":true
    }   

7. To Delete a specific todo item.
     METHOD: DELETE http://localhost:3001/todos/:id 
    Id should be the one which is automatically assigned by the mongoDB.
    for eg: http://localhost:3001/todos/658dc2d59a4714737a071073
    And pass the data which needs to be updated in the body. 

