import { Patient } from "./Patient";

export class HistoriaClinica {
    _id: string;
    descripcion: string;
    patient: Patient = new Patient;

    constructor() {
        this._id = '';
        this.descripcion = '';
    }
}