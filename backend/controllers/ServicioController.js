import Servicio from "../models/Servicio.js";

// Obtener todos los servicios activos
export const obtenerServicios = async (req, res) => {
    try {
        const servicios = await Servicio.find({ estadoServicio: 'Activo' });
        res.json(servicios);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los servicios", error });
    }
};

//obtener servicio por id
export const obtenerServicioPorId = async (req, res) => {
    try {
        const servicio = await Servicio.findById(req.params.id);
        if (!servicio) {
            return res.status(404).json({ message: "Servicio no encontrado" });
        }
        res.json(servicio);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el servicio", error });
    }
};

// CREAR un nuevo servicio
export const crearServicio = async (req, res) => {
    try {
        const {
            idServicio,
            nombreServicio,
            descripcionServicio,
            precioServicio
        } = req.body;

        const nuevoServicio = new Servicio({
            idServicio,
            nombreServicio,
            descripcionServicio,
            precioServicio,
            imagenServicio: req.file ? req.file.filename : "",
            estadoServicio: 'Activo'
        });

        await nuevoServicio.save();

        res.status(201).json({nuevoServicio });
    } catch (error) {
        console.error("ERROR CREAR SERVICIO", error);
        res.status(500).json({ message: "Error al crear el servicio", error });
    }
};

// ACTUALIZAR un servicio existente
export const actualizarServicio = async (req, res) => {
    try {
        const { id } = req.params;

        const datosActualizados = {
            nombreServicio: req.body.nombreServicio,
            descripcionServicio: req.body.descripcionServicio,
            precioServicio: req.body.precioServicio,
            estadoServicio: req.body.estadoServicio
        };


        // Si se subió una nueva imagen, actualizar el campo imagenServicio
        if (req.file) {
            datosActualizados.imagenServicio = req.file.filename;
        }

        // Actualizar el servicio en la base de datos
        const servicioActualizado = await Servicio.findByIdAndUpdate(
            id,
            datosActualizados,
            { new: true }
        );

        res.json({ servicioActualizado });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el servicio" });
    }
};

// ELIMINAR un servicio (cambiar estado a Inactivo)
export const eliminarServicio = async (req, res) => {
    try {
        const { id } = req.params;
        await Servicio.findByIdAndUpdate(id, { estadoServicio: 'Inactivo' });

        res.json({ message: "Servicio eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el servicio", error });
    }
};