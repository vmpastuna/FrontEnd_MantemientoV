import IVehiculoModel from "./Vehiculo"

export default interface  IMantenimientoModel {

    id?: number | null,
    nombre: string,
    fechaMantenimiento: string,
    precio:number,
    tipo:string,
    vehiculo: IVehiculoModel | null
   
    
}

