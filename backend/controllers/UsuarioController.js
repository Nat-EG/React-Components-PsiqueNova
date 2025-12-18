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
            rol
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
            !fechaNacimiento
        ) {   
        return res.status(400).json({ mensaje: 'Por favor, complete todos los campos obligatorios.' });
        }
    //Verificar si el usuario ya existe
     const usuarioExistente = await Usuario.findOne({ email });
      if (usuarioExistente) {
        return res.status(400).json({ mensaje: 'El correo ya está registrado.' });
      }

    //Hashear la contraseña
    const contraseñaHasheada = await bcrypt.hash(password, 10);

    //CREAR NUEVO USUARIO
    const nuevoUsuario = new Usuario({
        nombresApellidos,
        documentoIdentidad,
        tipoDocumento,
        email,
        password: contraseñaHasheada,
        direccion,
        telefono,
        fechaNacimiento,
        rol,
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




    

