const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Promotions = require('../models/promotions');
const promoRouter = express.Router();
var authenticate = require('../authenticate');
promoRouter.use(bodyParser.json());
const cors = require('./cors');

promoRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors,authenticate.verifyUser,(req,res,next) => {
    Promotions.find(req.query)
    .then((promotions) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotions);
    },(err) => next(err))
    .catch((err) => next(err));})
.post(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) =>{
    Promotions.create(req.body)
    .then((promo) => {
        console.log('Dish Created ', promo);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) =>{
    res.statusCode=403;
    res.end('PUT operation not supported on /promo');
})
.delete(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) =>{
    Promotions.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));});

promoRouter.route('/:promoId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors,authenticate.verifyUser,(req,res,next) =>{
    Promotions.findById(req.params.promoId)
    .then((promo) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo); 
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) =>{
    res.statusCode = 403;
    res.end('POST operation not supported on /promo/'+req.params.promoId);
})
.put(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) =>{
    Promotions.findByIdAndUpdate(req.params.promoId,{
        $set: req.body
    },{new: true})
    .then((promo) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo); 
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next) =>{
    Promotions.findByIdAndRemove(req.params.promoId)
    .then((promo) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo); 
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = promoRouter;