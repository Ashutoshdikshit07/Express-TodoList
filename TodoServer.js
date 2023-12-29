const express = require('express');
const bodyParser = require('body-parser');
const mongoose =require('mongoose')

mongoose.connect('mongodb+srv://{username}:{password}@cluster0.1tfxvrc.mongodb.net/todos')
const app = express();
const port = 3001;
  
app.use(bodyParser.json());
  
module.exports = app;


const todoSchema = new mongoose.model('todo_database',{
  title: String,
  description: String,
  completed: Boolean,
});

// const todo = new todoSchema({title:"Assignment",description:"Need to complete an Assignment on mongo and http",completed:false})
// todo.save().then(()=>console.log('added'))



// it shows all the todo items present in the array
//  "title":"study","completed":"false","description": "react"
app.get('/', function(req, res) {
  const a = {
    'GET METHOD': {'/todos':'To print all the data'},
    'GET METHOD': {'/todos/:id':'It fetches a specific item from the array if present'},
    'post METHOD': {'/todos':'It adds a new todo item to the array storage. [Send a post request using postman and pass title, description and completed json file in the body. eg-{"title":"study","completed":"false","description": "react"}'},
    'put METHOD': {'/todos/:id':'It helps us to update a specific todo item like mark it as complete'},
    'DELETE METHOD': {'/todos/:id':'It deletes the item from the list [pass the id of the todo to delete in the url. eg - http://localhost/todos/2'},
  }

//  {'/todos':'to print all the data'}, 
//     {'/todos':'to print all the data'}

res.json(a)
})


app.get('/todos', async function(req, res) {
  try {
    console.log('inside get todo')
    // Retrieve the list of TODO items from the database
    const todos = await todoSchema.find();
    //console.log('List of TODO items:', todos);
    res.json(todos);
  } catch (error) {
    console.error('Error retrieving TODO list:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
 })

//it fetches a specific item from the array if present
app.get('/todos/:id', async function(req, res) {

  const taskId = req.params.id;
  try{
    //it finds by id which can be passed in the params eg - http://localhost:3001/todos/658dc2d59a4714737a071073
  const fetchTask = await todoSchema.findById(taskId); 
  if (!fetchTask) {
    return res.status(404).send('Task not found');
  }

  res.status(200).json(fetchTask);
 }
 catch(error){
  console.error('Error retrieving TODO by ID:', error);
  res.status(500).json({ error: 'Internal Server Error' });

 }
})


//it adds a new todo item to the array storage
app.post('/todos', function(req, res) {
  
  try {
  const newTask = {
    //id:(storage.length+1).toString(),
    title:req.body['title'],
    completed:req.body['completed'],
    description:req.body['description']
  }
console.log('creating todo object')

  const todo = new todoSchema(newTask)   //adding the data based on the todoSchema we created at the top.
  todo.save()
  console.log('Task added to the database:', todo);
  res.status(201).json(todo);

  } 
  catch (error) {
    console.error('Error adding task to the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

//it helps us to update a specific todo item like mark it as complete
app.put('/todos/:id', async function(req, res) {
  try{

    //first it checks if the body has the below mentioned fields if yes it is updated in the variable
  const taskId = req.params.id;
  if (req.body.title) {
     updatedTitle = req.body.title;
  }
  if (req.body.completed) {
    
     updatedCompleted = req.body.completed;
  }
  if (req.body.description) {
     updatedDescription = req.body.description;
  }

  //the above variables are then added to the below updateTodo varaible
  // where it finds if the todo work is present in the
  // database (findByIdAndUpdate) with the help of taskId 
  //if yes then the data is updated if not return 404

  //todoSchema is the model which we used to update
  const updateTodo = await todoSchema.findByIdAndUpdate(taskId,{
    title:updatedTitle,
     completed:updatedCompleted,
      description:updatedDescription,

  },{new:true})

  if(!updateTodo){
     return res.status(404).json({ error: 'TODO not found' });
  }
  res.json(updateTodo);
  } catch (error) {
    console.error('Error updating TODO by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})



// //It deletes the item from the list
app.delete('/todos/:id', async function (req, res) {
  try {
    const todoId = req.params.id;
    const deletedTodo = await todoSchema.findByIdAndDelete(todoId);
    console.log(deletedTodo)

    if (!deletedTodo) {
      return res.status(404).json({ error: 'TODO not found' });
    }

    res.status(200).json(deletedTodo);

  } catch (error) {
    console.error('Error deleting TODO by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, function() {

  console.log(`Example app listening on port ${port}`)
})
