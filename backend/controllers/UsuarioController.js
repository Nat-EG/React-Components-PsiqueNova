import Usuario from "../models/Usuario.js";
import bcrypt from "bcryptjs";


//POST para registrar un nuevo usuario
export const registrarUsuario = async (req, res) => {
    try {
        console.log("BODY RECIBIDO:", req.body);
        
        const { 
            nombresApellidos, 
            documentoIdentidad,
            tipoDocumento,
            email, 
            password, 
            direccion, 
            telefono, 
            fechaNacimiento, 
            rol,
            corrientePsicologica
         } = req.body;

        //Validar campos obligatorios
        if (
            !nombresApellidos ||  
            !documentoIdentidad ||
            !tipoDocumento ||
            !email || 
            !password || 
            !direccion || 
            !telefono || 
            !fechaNacimiento || 
            !rol
        ) {   
        return res.status(400).json({ mensaje: 'Complete todos los campos obligatorios.' });
        }
    //Validar psicologo
    if (rol === 'psicologo' && !corrientePsicologica) {
        return res.status(400).json({ mensaje: 'La corriente psicológica es obligatoria para psicólogos.' });
    }

    //Verificar si el usuario ya existe
     const existeUsuario = await Usuario.findOne({ email });
      if (existeUsuario) {
        return res.status(400).json({ mensaje: 'El correo ya está registrado.' });
      }

    //Hashear la contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    //CREAR NUEVO USUARIO
    const nuevoUsuario = new Usuario({
        nombresApellidos,
        documentoIdentidad,
        tipoDocumento,
        email,
        password: passwordHash,
        direccion,
        telefono,
        fechaNacimiento,
        rol,
        corrientePsicologica: rol === 'psicologo' ? corrientePsicologica : undefined,
        estadoUsuario: 'activo',
    });

    //Guardar el usuario en la base de datos
    await nuevoUsuario.save();

    return res.status(201).json({ mensaje: 'Usuario registrado correctamente.',
        usuario: {
            nombresApellidos,
            email,
            rol,
            estadoUsuario: 'activo',
        }
     });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        return res.status(500).json({ mensaje: 'Error del servidor. Por favor, intente nuevamente más tarde.' });
    }
};

//DELETE para eliminar un usuario por su ID
export const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        //Buscar y eliminar el usuario por su ID
        const usuarioEliminado = await Usuario.findByIdAndDelete(id);

        if (!usuarioEliminado) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
        }

        res.status(200).json({ mensaje: 'Usuario eliminado correctamente.' 
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar cuenta. Por favor, intente nuevamente más tarde.',
            error: error.message
        });
    }
};

//GET para obtener solo psicologos
export const obtenerPsicologos = async (req, res) => {
    try {
        //Buscar usuarios con rol de psicologo
        const psicologos = await Usuario.find({ 
            rol: 'psicologo',
            estadoUsuario:"activo" 
        }).select("nombresApellidos corrientePsicologica");

        res.json(psicologos);
    } catch (error) {
        console.error('Error al obtener psicólogos:', error);
        res.status(500).json({ mensaje: 'Error del servidor. Por favor, intente nuevamente más tarde.' });
    }
};

//GET para obtener todos los usuarios
export const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find()
            .select("nombresApellidos documentoIdentidad email rol estadoUsuario telefono createdAt")
            .sort({ createdAt: -1 });

        res.json(usuarios);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ mensaje: 'Error del servidor. Por favor, intente nuevamente más tarde.' });
    }
};

//GET para obtener un usuario por ID
export const obtenerUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const usuario = await Usuario.findById(id)
            .select("nombresApellidos documentoIdentidad email rol estadoUsuario telefono direccion");

        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
        }

        res.json(usuario);
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        res.status(500).json({ mensaje: 'Error del servidor. Por favor, intente nuevamente más tarde.' });
    }
};

//PUT para actualizar un usuario
export const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    let { nombresApellidos, email, telefono, direccion, estadoUsuario } = req.body;

    //  Normalizar enum
    if (estadoUsuario) {
      estadoUsuario = estadoUsuario.toLowerCase();
    }
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      id,
      { nombresApellidos, email, telefono, direccion, estadoUsuario },
      { new: true, runValidators: true }
    );

    if (!usuarioActualizado) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
    }

    res.status(200).json({ 
      mensaje: 'Usuario actualizado correctamente.',
      usuario: usuarioActualizado 
    });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ mensaje: 'Error del servidor. Por favor, intente nuevamente más tarde.' });
  }
};

