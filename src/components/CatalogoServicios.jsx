import react from "react";
import styles from "../styles/CatalogoServicios.module.css";

// Importación de imagenes desde src/includes
import IconoAtras from "../includes/Back UpiconSvg.co.svg";
import terapiaIndividual from "../includes/TerapiaIndividual.jpg";
import terapiaParejas from "../includes/Terapia_de_parejas.jpg";
import terapiaFamiliar from "../includes/Terapia_de_familia.jpg";
import terapiaNinos from "../includes/Terapia_de_niños.jpg";
import orientacionVocacional from "../includes/Orientacion_vocacional.jpg";

function CatalogoServicios() {

    //Datos de los servicios
    const servicios = [

        // Servicio 1
        { 
            id: 1, 
            nombre: "Terapia Individual", 
            descripcion: "Sesion individual para adultos. Espacio personal para trabajar emociones, pensamientos y conductas. Ayuda a manejar ansiedad y estres.",
            Precio: "70.000 COP",
            imagen: terapiaIndividual 
        },

        // Servicio 2
        { 
            id: 2, 
            nombre: "Terapia de Parejas", 
            descripcion: "Sesion para parajeras. Acompañamiento paraa mejorar la comunicacion, resolver conflictos y fortalecer la confianza y el vinculo afectivo.",
            Precio: "90.000 COP",
            imagen: terapiaParejas
        },

        // Servicio 3
        { 
            id: 3,
            nombre: "Terapia Familiar", 
            descripcion: "Terapia grupal para familia. Orientada a mejorar la convivencia, fomentar la comunicacion y encontrar soluciones conjuntas a las dificultades familiares.",
            Precio: "150.000 COP",
            imagen: terapiaFamiliar 
        },

        // Servicio 4
        { 
            id: 4, 
            nombre: "Terapia de Niños", 
            descripcion: "Sesion personalizada para la infancia. Terapia adaptada a las necesidades infantiles, que facilita la expresion emocional y el desarrollo de habilidades sociales.", 
            Precio: "80.000 COP",
            imagen: terapiaNinos 
        },

        // Servicio 5
        { 
            id: 5, 
            nombre: "Orientación Vocacional", 
            descripcion: "Asesoria profesional y educativa vocacional. Apoyo en la eleccion de carrera o proyecto profesional a traves de pruebas y autoconocimiento.",
            Precio: "50.000 COP",
            imagen: orientacionVocacional 
        },
    ];

    // Funcion al hacer click en seleccionar servicio
    const handleSeleccionarServicio = (servicio) => {
        alert(`Has seleccionado el servicio: ${servicio.nombre}`);
    };

    return (

        <div className={styles.CajaPadre}>
            {/* Botón de regresar atrás */ }

            <div className={styles.headerCatalogo}>

                <button type='button' className={styles.btnAtras} onClick={() => window.history.back()}>
                    <img src={IconoAtras} alt="Atrás" className={styles.iconAtras} />
                    Atrás
                </button>  

                {/* Titulo */ }
                <h1>CATÁLOGO DE SERVICIOS</h1>
            </div>
            <hr />

            {/* Seccion de servicios */ }
            <section className={styles.servicios}>
                <div className={styles.contenidoServicios}>
                    {/* Mapeo de los servicios */}
                    {servicios.map((servicio) =>(
                        <div key={servicio.id} className={styles.tarjetaServicio}>
                            <img src={servicio.imagen} alt={servicio.nombre} />
                            <h3>{servicio.nombre}</h3>
                            <p>{servicio.descripcion}</p>
                            <span>
                                Precio:
                                <p className={styles.precio}>{servicio.Precio}</p>
                            </span>
                            <button onClick={() => handleSeleccionarServicio(servicio)}>
                                Seleccionar
                            </button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );

}
export default CatalogoServicios;

