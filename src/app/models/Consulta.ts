import { HistoriaClinica } from "./HistoriaClinica";

export class Consulta {
    _id: string;
    fecha: string;
    peso: string;
    altura: string;
    historia_clinica: HistoriaClinica = new HistoriaClinica;
    
    constructor() {
        this._id = '';
        this.peso = '';
        this.altura = '';
        this.fecha = '';
    }
}