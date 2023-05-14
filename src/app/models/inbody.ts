import { HistoriaClinica } from "./HistoriaClinica";

export class Inbody {
    _id:string;
    url:string;
    historia_clinica: HistoriaClinica
    name:string;
    fecha:string;

    constructor() {
        this._id = '';
        this.url = '';
        this.name = '';
        this.fecha = '';
    }
}