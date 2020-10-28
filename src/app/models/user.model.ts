export class User {
    id: number;
    exito: boolean;
    id_rol: number;
    desc_rol: string;

    constructor(id, exito, id_rol, desc_rol) {
        this.id = id;
        this.exito = exito;
        this.id_rol= id_rol;
        this.desc_rol = desc_rol
    }
}