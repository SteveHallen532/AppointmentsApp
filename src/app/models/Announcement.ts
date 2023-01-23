import { Organizacion } from "./Organizacion";

export class Announcement {
    _id: string;
    date: number;
    title: string;
    body: string;
    organizacion: Organizacion;

    constructor() {
        this._id = '';
        this.date = 0;
        this.title = '';
        this.body = '';
    }

}