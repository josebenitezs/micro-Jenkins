
const { request, response } = require('express');
const Proyecto = require('../models/proyecto');
const TipoProyecto = require('../models/tipoProyecto');
const Cliente = require('../models/cliente');
const Universidad = require('../models/universidad');
const Etapa = require('../models/etapa');

/**
 * crea
 */
const createProyecto = async (req = request, res = response) => {
    try {


        const { cliente, tipoProyecto, universidad, etapa, numero, titulo, fechaIniciación, fechaEntrega, valor } = req.body

        const datos = {
            numero, titulo, fechaIniciación, fechaEntrega, valor, cliente, tipoProyecto, universidad, etapa
        }
        const tipoProyectoBD = await TipoProyecto.findOne({
            _id: tipoProyecto._id
        })
        if (!tipoProyectoBD) {
            return res.status(400).json({
                msj: 'No existe tipo Proyecto'
            })
        }
        const clienteBD = await Cliente.findOne({
            _id: cliente._id
        })
        if (!clienteBD) {
            return res.status(400).json({
                msj: 'No existe cliente'
            })
        }
        const universidadBD = await Universidad.findOne({
            _id: universidad._id
        })
        if (!universidadBD) {
            return res.status(400).json({
                msj: 'No exixte Universidad'
            })
        }
        const etapaBD = await Etapa.findOne({
            _id: etapa._id
        })
        if (!etapaBD) {
            return res.status(400).json({
                msj: 'No exixte la etapa'
            })
        }
        const proyecto = new Proyecto(datos);
        await proyecto.save();
        return res.status(201).json(proyecto);
    } catch (e) {
        return res.status(500).json({
            error: e
        });
    }
}

/**
 * Consultar todos
 */
const getProyectos = async (req, res = response) => {
    try {
        const proyectosBD = await Proyecto.find()
            .populate({
                path: 'cliente'
            })
            .populate({
                path: 'tipoProyecto'
            })
        return res.json(proyectosBD);
    } catch (e) {
        return res.status(500).json({
            error: e
        })
    }
}

/**
 * Consultar todos inventarios
 */
const getProyectoId = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const query = { _id: id };
        const proyectoBD = await Proyecto.findOne(query)
        return res.json(proyectoBD)

    } catch (e) {
        return res.status(500).json({ msj: e })

    }
}


const updateProyecto = async (req = request, res = response) => {

    try {
        const { id } = req.params
        const { título, valor } = req.body
        const data = {

            título,
            valor,
            fechaActualizacion: new Date()
        }
        const proyecto =
            await Proyecto.findByIdAndUpdate(id, data, { new: true });
        res.status(201).json(proyecto)
    } catch (e) {
        return res.status(500).json({ msj: e })
    }
}





module.exports = {
    createProyecto,
    getProyectos,
    getProyectoId,
    updateProyecto
}