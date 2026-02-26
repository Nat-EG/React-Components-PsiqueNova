# Psique-Nova

Aplicación web para la comercialización de servicios psicológicos y gestión de citas, desarrollada bajo arquitectura cliente-servidor con autenticación segura basada en JWT.<br>
Proyecto académico desarrollado en el programa Tecnología en Análisis y Desarrollo de Software del Servicio Nacional de Aprendizaje.

## Descripcion general

Psique-Nova permite la interacción entre tres roles:
- Administrador
- Psicologo
- Paciente

El sistema incluye:
- Registro y login
- Autenticación con JWT
- Recuperación de contraseña mediante token temporal
- Protección de rutas basada en roles
- Gestion de agenda
- Agendamiento, cancelación y reprogramación de citas
- Simulación de pagos
- Historial de ventas
- Módulo de bienestar "Mi lugar seguro"

## Arquitectura del proyecto

El repositorio contiene frontend y backend en el mismo proyecto, organizado en carpetas independientes:<br>
/frontend<br>
/backend<br>
Se implementa una arquitectura cliente-servidor con separación por capas:
- Presentación: SPA desarrollada en React
- Lógica de negocio: API RES desarrollada con Node.js y Express.
- Persistencia: base de datos NoSQL en MongoDB

La comunicación se realiza mediante peticiones HTTP usando JSON.

## Backend-Estructura Técnica
### Configuracion principal
- Uso de dotenv para variables de entorno
- Conexión de base de datos mediante módulo independiente
- Middleware global para
  * CORS
  * Parseo de JSON
- Modularización por rutas

Ejemplo de rutas:<br>
/api/usuarios<br>
/api/auth<br>
/api/servicios<br>
/api/pagos<br>
/api/ventas<br>
/api/agendas<br>
/api/citas<br>
/api/disponibilidad<br>

Se implementa separación por capas
- Routes
- Controllers
- Models
- Middleware
- Config (.env)


## Seguridad implementada
### Autenticacion
El sistema implementa autenticación basada en JSON Web Token (JWT) siguiendo el siguiente flujo <br>
#### 1. Registro de usuario
El usuario envía sus datos al endpoint:<br>
POST /api/auth/registro<br>

El backend:
- Vaida los datos.
- Hashea la contraseña utilizando bcrypt.
- Guarda el usuario en MongoDB con la contraseña encriptada

#### 2. Inicio de sesión
El usuario envía credenciales al endpoint:<br>
POST /api/auth/login <br>

El backend:
- Busca el usuario por email.
- Compara la contraseña ingresada con el hash almacenado.
- Si es válida, genera un JWT firmado con JWT_SECRET.
- Retorna el token al cliente. <br>

El token contiene informacion como:
- id del usuario
- rol de usuario

#### 3. Acceso a rutas protegidas
El frontend envía el token en el header:
Authorization: Bearer <token>

Middleware de autenticación:
- Extrae token desde el header Authorization.
- Verifica token con jwt.verify().
- Si es válido, adjunta los datos del usuario (id y rol) a la request.
- Maneja errores 401 en caso de token inválido o expirado.


#### 4. Recuperación de contraseña
El usuario solicita recuperación.<br>
El backend:
- Generación de resetToken aleatorio usando crypto.
- Token con expiración de 1 hora.
- Almacenamiento de resetToken y resetTokenExpiry en la base de datos<br>
Se envía el enlace al usuario.<br>
El sistema valida el token antes de permitir el cambio de contraseña.

### Decisiones técnicas
- Se utiliza JWT para mantener el sistema stateless.
- las contraseñas nunca se almacenan en texto plano.
- La autorización se basa en roles (admin, psicólogo, paciente).
- Las rutas críticas están protegidas mediante middleware.

## Modelo de Datos
Colecciones principales:
- Usuario
- Servicio
- Agenda
- Cita
- Pago
- Venta

Relaciones gestionadas mediante ObjectId


## Instalacion
### Requisitos
- Node.js v18+
- npm
- MongoDB Atlas
- Git

### Clonar repositorio

git clone https://github.com/Nat-EG/React-Components-PsiqueNova.git<br>
cd React-Components-PsiqueNova

### Configuración Backend
cd backend <br>
npm install

Crear archivo .env basado en .env.example<br>
MONGO_URI=
EMAIL_USER=
EMAIL_PASS=
JWT_SECRET=

Ejecutar <br>
npm run dev<br>

Servidor en:
http://localhost:4000

### Configuración Frontend
cd frontend<br>
npm install<br>
npm start <br>

Aplicación en: http://localhost:3000<br>

## Buenas prácticas implementadas
- Uso de variables de entorno
- Separación por capas
-  Manejo de errores
-  Protección de rutas
-  Hash de contraseña
-  Control de acceso por rol
-  Organización modular
-  Uso de Git para el control de versiones.

## Autoras
Natalia Echavarría Grajales<br>
Anyi Paola Gómez Arias

Tecnología en Análisis y Desarrollo de Software
(https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
