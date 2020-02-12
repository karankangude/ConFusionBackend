const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all((req,res,next) =>{
    res.statusCode=200;
    res.setHeader('Content_Type','text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all leaders to you!');
})
.post((req,res,next) =>{
    res.end('Will add the leader '+ req.body.name + 
    ' with the description detail as '+ req.body.description);
})
.put((req,res,next) =>{
    res.statusCode=403;
    res.end('PUT operation not supported on /leader');
})
.delete((req,res,next) =>{
    res.end('Will delete all leader!');
});

leaderRouter.route('/:leaderId')
.all((req,res,next) =>{
    res.statusCode = 200;
    res.setHeader("Content-Type",'text/plain');
    next();
})
.get((req,res,next) =>{
    res.end('Will send  leader'+
    req.params.leaderId+' to you!');
})
.post((req,res,next) =>{
    res.statusCode = 403;
    res.end('POST operation not supported on /leader/'+req.params.leaderId);
})
.put((req,res,next) =>{
    res.write('Updating the leader : '+req.params.leaderId);
    res.end('\nWill update the leader:'+
    req.body.name+' with details: '+
    req.body.description);
})
.delete((req,res,next) =>{
    res.end('Deleting the leader! '+req.params.leaderId);
});

module.exports = leaderRouter;