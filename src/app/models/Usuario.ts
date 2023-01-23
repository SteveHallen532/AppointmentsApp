import { Organizacion } from './Organizacion';

export class Usuario{

    _id: string;    
    username: string;
    password: string;
    organizacion: Organizacion;
    role: string;
    token: string;
        
    nombre: string;
    apellido: string;
    tipo_doc: string;
    nro_doc: string; 
    fecha_nacimiento: string;    
    genero: string;
    email: string;
    cuit_cuil: string;
    telefono: string;
    direccion: string;
    deleted: boolean;
    
    constructor(){   
        this.organizacion = null;
        this.password = "password";
    }
}