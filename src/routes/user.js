const express = require('express');
const userSchema = require('../models/user');

const router = express.Router();



//create user
router.post('/users', (req,res)=> {
    const user = userSchema(req.body);
    user
    .save()
    .then((data)=> res.json(data))
    .catch((error)=>res.json({message: error}));
});

//get all user
router.get('/users', (req,res)=> {
    userSchema
    .find()
    .then((data)=> res.json(data))
    .catch((error)=>res.json({message: error}));
});

//get a user
router.post('/users/:id', (req,res)=> {
    const {id}=req.params;
    userSchema
    .findById(id)
    .then((data)=> res.json(data))
    .catch((error)=>res.json({message: error}));
});

// Obtener un usuario por su correo electrónico
router.get('/users/email', (req, res) => {

    const { email } = req.body;
    userSchema
      .findOne({ email }) // Buscar por el campo email
      .select('_id')
      .then((data) => {
        if (!data) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(data);
      })
      .catch((error) => res.json({ message: error }));
});

//update a user
router.put('/users/:id', (req,res)=> {
    const {id}=req.params;
    const {name,email}=req.body;
    userSchema
    .updateOne({_id: id},{$set: {name, email}})
    .then((data)=> res.json(data))
    .catch((error)=>res.json({message: error}));
});

module.exports = router;