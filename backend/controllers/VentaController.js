import Venta from '../models/Venta.js';
import Usuario from '../models/Usuario.js';
import Servicio from '../models/Servicio.js';
import Pago from '../models/Pago.js';
import Cita from '../models/Cita.js';

export const crearVenta = async (req, res) => {
    try {
        const { pagoId } = req.body;

        // Buscar el pago asociado
        const pago = await Pago.findById(pagoId)
            .populate('paciente')
            .populate('psicologo')
            .populate('servicio');

        if (!pago || pago.estado !== 'aprobado') {
            return res.status(400).json({ message: 'Pago no válido o no aprobado.' });
        }

        // Buscar la cita asociada al pago
        const cita = await Cita.findOne({pago: pago._id});

        if (!cita) {
            return res.status(400).json({ message: 'Cita no encontrada para el pago dado.' });
        }

        const idFactura = `FAC-${Date.now()}`;

        // Crear la venta
        const venta = await Venta.create({
            idFactura,
            paciente: {
                idUsuario: pago.paciente._id,
                nombre: pago.paciente.nombresApellidos,
            },
            psicologo: {
                idUsuario: pago.psicologo._id,
                nombre: pago.psicologo.nombresApellidos,
            },
            servicio: {
                idServicio: pago.servicio._id,
                nombre: pago.servicio.nombreServicio,
            },
            valor: pago.valor,
            pago: pago._id,
            cita: cita._id,
        });

        res.status(201).json({ message: 'Venta creada exitosamente.', venta });
    } catch (error) {
        console.error('Error al crear la venta:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

//obtener ventas (admin)
export const obtenerVentas = async (req, res) => {
    try {
        const ventas = await Venta.find()
        .sort ({ fechaHora: -1});

    res.json(ventas);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las ventas." });
    }
};

