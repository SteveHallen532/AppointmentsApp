import { Patient } from "./Patient";

export class Appointment {
    _id: string;
    fecha: string;
    hora: string;
    patient: Patient;
    sobreturno: boolean;
    asignado: boolean;
    enabled: boolean;
    confirmado: boolean;

    constructor() {
        this._id = '';
        this.fecha = '';
        this.hora = '';
        this.patient = new Patient();
        this.sobreturno = false;
        this.asignado = false;
        this.enabled = true;
        this.confirmado = false;
    }

}