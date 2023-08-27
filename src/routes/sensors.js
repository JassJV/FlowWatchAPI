const express = require('express');
const sensorSchema = require('../models/sensors');

const router = express.Router();

// Crear un nuevo sensor
router.post('/users/sensors', async (req, res) => {
    try {
      const { name, userId, place, paid, noti, numericData, dateData } = req.body;
      const sensor = new sensorSchema({ name, userId, place, paid, noti, numericData, dateData });
      await sensor.save();
      res.json(sensor);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el sensor' });
    }
  });
  
  // Enviar datos relacionados a un sensor
  router.post('/users/sensors/data', async (req, res) => {
    try {
      const sensor = await sensorSchema.findById(req.body.sensorId);
      if (!sensor) {
        return res.status(404).json({ error: 'Sensor no encontrado' });
      }
      
      const {sensorId, numericData, dateData } = req.body;
      sensor.numericData.push(numericData);
      sensor.dateData.push(dateData);
      await sensor.save();

      res.json(sensor);
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Error al enviar los datos del sensor' });
    }
  });

  
  // Actualizar nombre de un sensor
  router.put('/users/sensors/config', async (req, res) => {
    try {
      const sensor = await sensorSchema.findByIdAndUpdate(
        req.body.sensorId,
        { $set: { name: req.body.name } },
        { new: true }
      );
      
      if (!sensor) {
        return res.status(404).json({ error: 'Sensor no encontrado' });
      }
  
      res.json(sensor);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el nombre del sensor' });
    }
  });
  
  // Obtener sensores asociados a un usuario
  router.post('/users/sensors/list', async (req, res) => {
    try {
      const sensors = await sensorSchema.find({ userId: req.body.userId });
      res.json({sensors});
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los sensores asociados al usuario' });
    }
  });
  
  // Obtener un sensor en específico
  router.get('/users/sensors/unique', async (req, res) => {
    try {
      const sensor = await sensorSchema.findById(req.body.sensorId);
      if (!sensor) {
        return res.status(404).json({ error: 'Sensor no encontrado' });
      }
      res.json(sensor);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el sensor' });
    }
  });
  
  // Eliminar un sensor
  router.delete('/users/sensors/delete', async (req, res) => {
    try {
      const sensor = await sensorSchema.findByIdAndDelete(req.body.sensorId);
      if (!sensor) {
        return res.status(404).json({ error: 'Sensor no encontrado' });
      }
      res.json({ mensaje: 'Sensor eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el sensor' });
    }
  });

  router.put('/users/sensors/update-noti', async (req, res) => {
    try {
        const { sensorId, noti } = req.body;

        const sensor = await sensorSchema.findByIdAndUpdate(
            sensorId,
            { $set: { noti: noti } },
            { new: true }
        );

        if (!sensor) {
            return res.status(404).json({ error: 'Sensor no encontrado' });
        }

        res.json(sensor);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la información de notificaciones del sensor' });
    }
});

module.exports = router;