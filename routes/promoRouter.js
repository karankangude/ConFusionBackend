const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all((req,res,next) =>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all promo to you!');
})
.post((req,res,next) =>{
    res.end('Will add the promo '+ req.body.name + 
    ' with the description detail as '+ req.body.description);
})
.put((req,res,next) =>{
    res.statusCode=403;
    res.end('PUT operation not supported on /promo');
})
.delete((req,res,next) =>{
    res.end('Will delete all promo!');
});

promoRouter.route('/:promoId')
.all((req,res,next) =>{
    res.statusCode = 200;
    res.setHeader("Content-Type",'text/plain');
    next();
})
.get((req,res,next) =>{
    res.end('Will send  promo'+
    req.params.promoId+' to you!');
})
.post((req,res,next) =>{
    res.statusCode = 403;
    res.end('POST operation not supported on /promo/'+req.params.promoId);
})
.put((req,res,next) =>{
    res.write('Updating the promo : '+req.params.promoId);
    res.end('\nWill update the promo:'+
    req.body.name+' with details: '+
    req.body.description);
})
.delete((req,res,next) =>{
    res.end('Deleting the promo! '+req.params.promoId);
});

module.exports = promoRouter;