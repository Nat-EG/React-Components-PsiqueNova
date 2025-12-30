import Agenda from "../models/Agenda.js";

// Normaliza una fecha a medianoche UTC
const normalizarFecha = (fecha) => {
  const d = new Date(`${fecha}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) throw new Error("Fecha inválida");
  return d;
};

// Suma días a una fecha
const sumarDias = (d, days) => new Date(d.getTime() + days * 24 * 60 * 60 * 1000);

// Servicio para listar agendas de un psicólogo
export const listarAgendasSvc = async (psicologoId) => {
  return Agenda.find({ psicologo: psicologoId }).sort({ fecha: 1 }).lean();
};

// Servicio para crear una nueva agenda o agregar bloques a una existente
export const crearAgendaSvc = async ({ psicologo, fecha, bloques }) => {
  if (!psicologo) throw new Error("psicologo es requerido");
  const start = normalizarFecha(fecha);
  const end = sumarDias(start, 1);

  const existente = await Agenda.findOne({
    psicologo,
    fecha: { $gte: start, $lt: end },
  });

  // Si ya existe una agenda para ese día, agregar bloques nuevos sin duplicar
  if (existente) {
    // Merge: agregar bloques nuevos sin duplicar
    const horariosExistentes = new Set(existente.bloques.map(b => `${b.horaInicio}-${b.horaFin}`));
    const nuevosBloques = bloques.filter(b => !horariosExistentes.has(`${b.horaInicio}-${b.horaFin}`));
    
    existente.bloques = [...existente.bloques, ...nuevosBloques];
    await existente.save();
    return existente;
  }

  return await Agenda.create({
    psicologo,
    fecha: start,
    bloques,
  });
};

// Servicio para actualizar un bloque específico en una agenda es decir indicar "disponible" o "no disponible"
export const actualizarBloqueSvc = async (agendaId, bloqueIndex, data) => {
  const agenda = await Agenda.findById(agendaId);
  if (!agenda) throw new Error("Agenda no encontrada");
  if (bloqueIndex < 0 || bloqueIndex >= agenda.bloques.length) throw new Error("Bloque inválido");
  const bloque = agenda.bloques[bloqueIndex];
  if (data.horaInicio) bloque.horaInicio = data.horaInicio;
  if (data.horaFin) bloque.horaFin = data.horaFin;
  if (typeof data.disponible === "boolean") bloque.disponible = data.disponible;
  await agenda.save();
  return agenda;
};


// Servicio para eliminar un bloque específico en una agenda o eliminar toda la agenda si es el último bloque

export const eliminarBloqueSvc = async (agendaId, bloqueIndex) => {
  const agenda = await Agenda.findById(agendaId);
  if (!agenda) throw new Error("Agenda no encontrada");
  if (bloqueIndex < 0 || bloqueIndex >= agenda.bloques.length) {
    throw new Error("Bloque inválido");
  }

  // Eliminar el bloque por índice
  agenda.bloques.splice(bloqueIndex, 1);

  // Si no quedan bloques, eliminar toda la agenda
  if (agenda.bloques.length === 0) {
    await Agenda.findByIdAndDelete(agendaId);
    return { mensaje: "Último bloque eliminado, agenda borrada" };
  }

  await agenda.save();
  return agenda;
};