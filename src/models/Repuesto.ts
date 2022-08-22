import IMantenimientoModel from "./Mantenimiento";
import IVehiculoModel from "./Vehiculo";

export default interface  IRepuestoModel {

    id?: number | null,
    nombre: string,
    tipo: string,
    descripcion:string,
    cantidad:number,
    vehiculo:IVehiculoModel |null,
    mantenimiento:IMantenimientoModel | null
    
}
