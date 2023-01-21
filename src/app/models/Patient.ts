export class Patient{

    _id: string;
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    dni: string;
    genero: string;
    obra_social: string;
    num_obra_social: string;
    fecha_nacimiento: string;

    constructor(){
        this._id= '';
        this.nombre= '';
        this.apellido= '';
        this.telefono= '';
        this.email= '';
        this.dni= '';
        this.genero= '';
        this.obra_social= '';
        this.num_obra_social= '';
        this.fecha_nacimiento= '';

    }
}