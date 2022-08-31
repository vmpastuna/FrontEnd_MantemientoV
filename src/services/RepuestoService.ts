import Swal from "sweetalert2";
import http from "../http-common";
import { showAlert ,showErrorAlert} from "../common/alerts";
import IRepuestoModel from "../models/Repuesto";

const create = async (data: IRepuestoModel) => {    
  try {
    const url : string = "/vehiculos/" + data.vehiculo!.id + "/repuestos";
    const response = await http.post<IRepuestoModel>(url, data,{headers : {
      "Authorization" :  `Bearer ${localStorage.getItem('token')}`
    }});
    if(response.status === 201){
      Swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: 'Repuesto creado correctamente',
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



const remove = async (idVehiculo: number , id : number) => {
  const url : string = `/vehiculos/${idVehiculo}/repuestos/${id}`; 
  http.delete<string>(url,{headers : {
    "Authorization" :  `Bearer ${localStorage.getItem('token')}`
  }}).then((response) =>{
    console.log(response);
    showAlert('¡Correcto!','Repuesto eliminado correctamente');
  }).catch((err)=>{
    console.error(err);
    showErrorAlert('¡Error!', 'Error al Eliminar Mantenimiento');
  });
};


const list=async( idVehiculo:number)=>{
  const url: string =`/vehiculos/${idVehiculo}/repuestos`;
  return await http.get<Array<IRepuestoModel>>(url,{headers : {
    "Authorization" :  `Bearer ${localStorage.getItem('token')}`
  }});

};

const MantenimientoService = {
  create,
  remove,
  list,
 
};
export default MantenimientoService;