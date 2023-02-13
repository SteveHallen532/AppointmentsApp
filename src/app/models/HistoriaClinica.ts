import { Patient } from "./Patient";

export class HistoriaClinica {
    _id: string;
    fecha_inicio: string;
    tiempo_estimado_tratamiento: string;
    talla: string;
    peso: string;
    peso_ideal: string;
    descripcion: string;
    patient: Patient = new Patient;

    constructor() {
        this._id = '';
        this.fecha_inicio = '';
        this.tiempo_estimado_tratamiento = '';
        this.talla = '';
        this.peso = '';
        this.peso_ideal = '';
        this.descripcion = '';
    }
}