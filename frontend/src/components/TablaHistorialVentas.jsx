import React, { useState } from "react";
import * as XLSX from "xlsx";
import styles from "../styles/TablaHistorialVentas.module.css";
import DateRangeFilter from "./DateRangeFilter";
import IconAtras from "../includes/Back UpiconSvg.co.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronDown,
    faChevronUp,
    faCalendarAlt,
    faAngleLeft,
    faAngleRight,
    faAnglesLeft,
    faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";

export default function TablaHistorialVentas() {
    const [search, setSearch] = useState("");
    const [recordsPerPage, setRecordsPerPage] = useState(15);
    const [currentPage, setCurrentPage] = useState(1);
    const [showFilter, setShowFilter] = useState(false);
    const [dateRange, setDateRange] = useState({ start: null, end: null });
    const [sortOrder, setSortOrder] = useState("asc");

    const data = [
        { idFactura: "001", fechaHora: "2024-06-01 10:32", nombrePaciente: "Juan Perez", idPaciente: "12312314", psicologo: "Eliana Arroyave", servicio: "03", valor: 150000 },
        { idFactura: "002", fechaHora: "2024-06-02 11:15", nombrePaciente: "Maria Gomez", idPaciente: "45645615", psicologo: "Carlos Ruiz", servicio: "01", valor: 200000 },
        { idFactura: "003", fechaHora: "2024-06-03 09:45", nombrePaciente: "Luis Martinez", idPaciente: "78978916", psicologo: "Ana Torres", servicio: "02", valor: 180000 },
        { idFactura: "004", fechaHora: "2024-06-04 14:20", nombrePaciente: "Carmen Diaz", idPaciente: "32132117", psicologo: "Eliana Arroyave", servicio: "03", valor: 220000 },
        { idFactura: "005", fechaHora: "2024-06-05 16:00", nombrePaciente: "Pedro Sanchez", idPaciente: "65465418", psicologo: "Carlos Ruiz", servicio: "01", valor: 160000 },
        { idFactura: "006", fechaHora: "2024-06-06 13:30", nombrePaciente: "Ana Lopez", idPaciente: "98798719", psicologo: "Ana Torres", servicio: "02", valor: 190000 },
        { idFactura: "007", fechaHora: "2024-06-07 12:10", nombrePaciente: "Jorge Ramirez", idPaciente: "14714720", psicologo: "Eliana Arroyave", servicio: "03", valor: 210000 },
        { idFactura: "008", fechaHora: "2024-06-08 15:45", nombrePaciente: "Lucia Fernandez", idPaciente: "25825821", psicologo: "Carlos Ruiz", servicio: "01", valor: 170000 },
        { idFactura: "009", fechaHora: "2024-06-09 11:55", nombrePaciente: "Miguel Torres", idPaciente: "36936922", psicologo: "Ana Torres", servicio: "02", valor: 200000 },
        { idFactura: "010", fechaHora: "2024-06-10 10:05", nombrePaciente: "Sofia Morales", idPaciente: "15915923", psicologo: "Eliana Arroyave", servicio: "03", valor: 230000 }, 
        { idFactura: "011", fechaHora: "2024-06-11 14:30", nombrePaciente: "Diego Castro", idPaciente: "75375324", psicologo: "Carlos Ruiz", servicio: "01", valor: 180000 },
        { idFactura: "012", fechaHora: "2024-06-12 09:20", nombrePaciente: "Valentina Rojas", idPaciente: "85285225", psicologo: "Ana Torres", servicio: "02", valor: 210000 }, 
    ];

    const filteredData = data.filter((row) => {
        const term = search.toLowerCase();
        return (
            row.idFactura.toLowerCase().includes(term) ||
            row.nombrePaciente.toLowerCase().includes(term) ||
            row.idPaciente.toLowerCase().includes(term) ||
            row.psicologo.toLowerCase().includes(term) ||
            row.servicio.toLowerCase().includes(term) ||
            row.valor.toString().includes(term)
        );
    });

    const updateFilter = (type, value) => {
        setDateRange((prev) => ({
            ...prev,
            [type]: value,
        }));
    };

    const filteredByDate = filteredData.filter((row) => {
        if (!dateRange.start && !dateRange.end) return true;
        const fecha = new Date(row.fechaHora);
        const inicio = dateRange.start ? new Date(dateRange.start) : null;
        const fin = dateRange.end ? new Date(dateRange.end) : null;
        return (!inicio || fecha >= inicio) && (!fin || fecha <= fin);
    });

    const sortedData = [...filteredByDate].sort((a, b) => {
        const dateA = new Date(a.fechaHora);
        const dateB = new Date(b.fechaHora);
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    const toggleSort = () => setSortOrder(sortOrder === "asc" ? "desc" : "asc");

    const totalPages = Math.ceil(sortedData.length / recordsPerPage);
    const startIdx = (currentPage - 1) * recordsPerPage;
    const paginatedData = sortedData.slice(startIdx, startIdx + recordsPerPage);

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(sortedData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "HistorialVentas");
        XLSX.writeFile(wb, "HistorialVentas.xlsx");
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.headerWrapper}>
                <button className={styles.btnAtras} onClick={() => window.history.back()}>
                    <img className={styles.iconAtras} src={IconAtras} alt="Atrás" />
                    Atrás
                </button>

                <h1 className={styles.title}>CONSULTAR HISTORIAL DE VENTAS</h1>
            </div>

            <hr className={styles.hr} />

            <div className={styles.tableMainContainer}>

                <div className={styles.searchContainer}>
                    <label>Buscar</label>
                    <input
                        type="text"
                        className={styles.inputSearch}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>ID Factura</th>

                                <th className={styles.thFechaHora}>
                                    Fecha y hora
                                    <FontAwesomeIcon
                                        icon={sortOrder === "asc" ? faChevronUp : faChevronDown}
                                        className={styles.iconSort}
                                        onClick={toggleSort}
                                    />

                                    <FontAwesomeIcon
                                        icon={faCalendarAlt}
                                        className={styles.iconCalendar}
                                        onClick={() => setShowFilter(!showFilter)}
                                    />

                                    {showFilter && (
                                        <DateRangeFilter
                                            startDate={dateRange.start}
                                            endDate={dateRange.end}
                                            onStartChange={(value) => updateFilter("start", value)}
                                            onEndChange={(value) => updateFilter("end", value)}
                                        />
                                    )}
                                </th>

                                <th>Nombre Paciente</th>
                                <th>ID Paciente</th>
                                <th>Psicólogo</th>
                                <th>Servicio</th>
                                <th>Valor</th>
                            </tr>
                        </thead>

                        <tbody>
                            {paginatedData.length > 0 ? (
                                paginatedData.map((row, index) => (
                                    <tr key={index}>
                                        <td>{row.idFactura}</td>
                                        <td>{row.fechaHora}</td>
                                        <td>{row.nombrePaciente}</td>
                                        <td>{row.idPaciente}</td>
                                        <td>{row.psicologo}</td>
                                        <td>{row.servicio}</td>
                                        <td>{row.valor}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" style={{ textAlign: "center" }}>
                                        Sin datos.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className={styles.footerTable}>
                    <button className={styles.btnExportarExcel} onClick={exportToExcel}>
                        Exportar Excel
                    </button>

                    <nav>
                        <div className={styles.rowSelector}>
                            <label>Mostrar</label>
                            <select
                                value={recordsPerPage}
                                onChange={(e) => setRecordsPerPage(Number(e.target.value))}
                            >
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={30}>30</option>
                                <option value={50}>50</option>
                            </select>
                            <span>datos</span>
                        </div>

                        <ul className={styles.paginationNav}>
                            <li className={styles.pageItem}>
                                <button onClick={() => setCurrentPage(1)}>
                                    <FontAwesomeIcon icon={faAnglesLeft} />
                                </button>
                            </li>

                            <li className={styles.pageItem}>
                                <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}>
                                    <FontAwesomeIcon icon={faAngleLeft} />
                                </button>
                            </li>

                            <li className={styles.pageInfo}>
                                Página {currentPage} de {totalPages}
                            </li>

                            <li className={styles.pageItem}>
                                <button
                                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                                >
                                    <FontAwesomeIcon icon={faAngleRight} />
                                </button>
                            </li>

                            <li className={styles.pageItem}>
                                <button onClick={() => setCurrentPage(totalPages)}>
                                    <FontAwesomeIcon icon={faAnglesRight} />
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}