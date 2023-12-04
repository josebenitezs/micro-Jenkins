const { Router } = require('express');
const {
    createProyecto,
    getProyectos,
    updateProyecto,
    getProyectoId
} = require('../controllers/proyecto');

const router = Router();

/**
 * Obtiene todos 
 */
router.get('/', getProyectos);

/**
 * Obtiene por id
 */
router.get('/:id', getProyectoId);

/**
 * Crear 
 */
router.post('/', createProyecto);

/**
 * Actualiza  por id
 */
router.put('/:id', updateProyecto);


module.exports = router;