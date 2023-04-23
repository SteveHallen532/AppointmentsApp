import { HistoriaClinica } from "./HistoriaClinica";

export class Dieta {
    _id:string;
    historia_clinica:string;
    inicio:string;
    fin:string;
    tipo:string;
    descripcion:string;
    current:boolean;

    constructor() {
        this._id = '';
        this.inicio = '';
        this.fin = '';
        this.tipo = '';
        this.descripcion = '';
    }
}