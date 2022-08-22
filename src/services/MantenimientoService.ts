import { showAlert ,showErrorAlert} from "../common/alerts";
import http from "../http-common";
import Swal from "sweetalert2";
import IMantenimientoModel from "../models/Mantenimiento";
import { NumericLiteral } from "typescript";

const create = async (data: IMantenimientoModel) => {    
  try {
    const url : string = "/vehiculos/" + data.vehiculo!.id + "/mantenimientos";
    const response = await http.post<IMantenimientoModel>(url, data);
    if(response.status === 201){
      Swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: 'Mantenimiento creado correctamente',
        confirmButtonText: 'Aceptar'    

      });
    }
    console.log(response);
  } catch (err) {
    console.log(err);
    Swal.fire({
      icon: 'error',
      title: '¡Error!',
      text: 'Network Error',
      confirmButtonText: 'Aceptar'    
    });
  }
};
const retrieve = async (idVehiculo:number,id:number) => {
    return await http.get<IMantenimientoModel>(`/vehiculos/${idVehiculo}/mantenimientos/${id}`);
};


const update = async (data: IMantenimientoModel) => {     
  const url : string = `/vehiculos/${data.vehiculo!.id}/mantenimientos/${data.id!}`; 
  http.put<IMantenimientoModel>(url, data).then((response) => {
    console.log(response);
    showAlert('¡Correcto!','Mantenimiento actualizada correctamente');
  }).catch((err) => {
    console.error(err);
    showErrorAlert('¡Error!', 'La pregunta no pudo ser actualizada');
  });       
};

const remove = async (idVehiculo: number , id : number) => {
  const url : string = `/vehiculos/${idVehiculo}/mantenimientos/${id}`; 
  http.delete<string>(url).then((response) =>{
    console.log(response);
    showAlert('¡Correcto!','Mantenimieto eliminado correctamente');
  }).catch((err)=>{
    console.error(err);
    showErrorAlert('¡Error!', 'Error al Eliminar Mantenimiento');
  });
};


const list=async( idVehiculo:number)=>{
  const url: string =`/vehiculos/${idVehiculo}/mantenimientos`;
  return await http.get<Array<IMantenimientoModel>>(url);

};

const MantenimientoService = {
  create,
  retrieve,
  update,
  remove,
  list,
 
};
export default MantenimientoService;