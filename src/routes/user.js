const express = require('express');
const userSchema = require('../models/user');

const router = express.Router();



//Crear un usuario
router.post('/users', (req,res)=> {
    const user = userSchema(req.body);
    user
    .save()
    .then((data)=> res.json(data))
    .catch((error)=>res.json({message: error}));
});

//Obtener todos los usuarios
router.get('/users/list', (req,res)=> {
    userSchema
    .find()
    .then((data)=> res.json(data))
    .catch((error)=>res.json({message: error}));
});

//Obtener un usuario por Id
router.get('/users/id', (req,res)=> {
    const {id}=req.body;
    userSchema
    .findById(id)
    .then((data)=> res.json(data))
    .catch((error)=>res.json({message: error}));
});

//Obtener un Id por su correo electrónico
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

//Actualizar información de un usuario
router.put('/users/config', (req,res)=> {
    //const {id}=req.params;
    const {id,name,email}=req.body;
    userSchema
    .updateOne({_id: id},{$set: {name, email}})
    .then(()=> res.json({message: 'Usuario Actualizado correctamente'}))
    .catch((error)=>res.json({erro: 'Error al actualizar el usuario'}));
});

//Eliminar usuario
router.delete('/users/delete', (req,res)=> {
    const {id}=req.body;
    userSchema
    .findById(id)
    .then(()=> res.json({message: 'Usuario eliminado correctamente'}))
    .catch((error)=>res.json({error: 'Error al eliminar usuario'}));
});

module.exports = router;