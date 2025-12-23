import axios from "axios";

export const obtenerAgendaPsicologo = async (idPsicologo, fecha) => {
    const url = `http://localhost:4000/api/agendas/${idPsicologo}/${fecha}`;
    console.log("Llamando a:", url);

    const response = await axios.get(url);
    return response.data;
};