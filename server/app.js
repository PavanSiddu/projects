const express = require('express');
const app = express();
app.use(express.json());
const cou = [
    {id:1,name:'pavan'}
]
app.get('/api/courses/:id',(req,res)=>{
    res.send(req.params.id);
});
app.post('/api/courses',(req,res)=>{
    const course = {
        id:cou.length+1,
        name:req.body.name
    };
    cou.push(course);
    res.send(course);
});


app.get('/',(req,res)=>{
    res.send('helloworld');
});
app.listen(8000);