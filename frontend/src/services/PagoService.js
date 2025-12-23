import axios from "axios";

const API_URL = "http://localhost:4000/api/pagos";

export const procesarPago = async (datosPago) => {
    const response = await axios.post(API_URL, datosPago);
    return response.data;
};