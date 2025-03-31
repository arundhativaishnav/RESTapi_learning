//to stop the server ctrl+c
const express = require('express');
const app = express();

app.use(express.json()); //every incoming req is converted into json
const tasks = [];

//priority of use method is higher
// app.use((req,res,next) =>{
//     console.log("i am use method ");
//     next();
// });
// app.use((req,res,next) =>{
//     res.status(200).json({
//         msg : "hello i am use method 2.0"
//     })
//     console.log("use method again ");

// });

//key value pair is called as query parameters 
app.get('/tasks', (req, res, next) => {  
//     if(!(req.query.num1 && req.query.num2)){
//         res.status(401).json({
//             error : 'bad request',
//             msg : "please provide both num1 and num2"
//     });
//     return ;
// }
//     const total = parseInt(req.query.num1) + parseInt(req.query.num2);
//     res.status(200).json({
//         total : total
        
//     });
// });
    //console.log('req.headrers', req.headers);
    //to print body we need to parse it to js
    console.log('req.body' , req.body);
    res.status(200).json({
       // yourheader : req.headers
       tasks : tasks
    });
});

app.post('/task',(req, res, next) =>{

    if(!req.body.newTask){
        res.status(400).json({
            msg : "Please give task in newTask "
        });
        return ;
    }
     const newtask =req.body.newTask;
    tasks.push(newtask);
    res.status(200).json({
        msg : "Task added successfully !"
    });
});

app.delete('/task/:index',(req, res, next) => {
    tasks.splice(req.params.index, 1)
    res.status(200).json({
        msg : "Task deleted successfully ! "
    });
});

app.put('/task/:id', (req, res, next) => {
    const taskId = req.params.id; 
    const newTask = req.body.newTask; 

    // Check if the task ID is valid
    if (!taskId || !tasks[taskId]) {
        return res.status(404).json({
            msg: "Task not found"
        });
    }

    // Check if the new task data is provided
    if (!newTask) { 
        return res.status(400).json({
            msg: "Please provide a new task in newTask"
        });
    }

    // Update the task
    tasks[taskId] = newTask; 
    res.status(200).json({
        msg: "Task updated successfully!"
    }); 
});

app.listen(3000 , () => {
    console.log("server started at http:/localhost:3000");
}) ;
