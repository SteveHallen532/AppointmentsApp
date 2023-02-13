import { HistoriaClinica } from "./HistoriaClinica";

export class Consulta {
    _id: string;
    fecha: string;
    peso: string;
    circunferencia_de_cintura: string;
    circunferencia_de_cintura_baja: string;
    cadera: string;
    circunferencia_de_muslo: string;
    torax: string;
    torax_alto: string;
    busto: string;
    busto_medio: string; 
    cuello: string;
    brazo: string;
    historia_clinica: HistoriaClinica = new HistoriaClinica;
    
    constructor() {
        this._id = '';
        this.fecha = '';
        this.peso = '';
        this.circunferencia_de_cintura = '';
        this.circunferencia_de_cintura_baja = '';
        this.cadera = '';
        this.circunferencia_de_muslo = '';
        this.torax = '';
        this.torax_alto = '';
        this.busto = '';
        this.busto_medio = ''; 
        this.cuello = '';
        this.brazo = '';
    }
}