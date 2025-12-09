import mongoose from 'mongoose';

//Conectar a la base de datos
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB conectado correctamente');
        } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        process.exit(1);
    } 
};

export default connectDB;