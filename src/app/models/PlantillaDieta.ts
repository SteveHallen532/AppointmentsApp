import { Organizacion } from "./Organizacion";

export class PlantillaDieta {
    _id: string;
    tipo: string;
    descripcion:string;
    organizacion: Organizacion;

    constructor() {
        this._id = '';
        this.tipo = '';
        this.descripcion = '';
    }
}