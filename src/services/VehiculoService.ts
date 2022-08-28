import Swal from "sweetalert2";
import { showAlert, showErrorAlert } from "../common/alerts";
import http from "../http-common";
import IVehiculoModel from "../models/Vehiculo";

const create = async (data: IVehiculoModel) => {    
  try {
    const response = await http.post<IVehiculoModel>("/vehiculos", data ,{headers : {
      "Authorization" :  `Bearer ${localStorage.getItem('token')}`
    }});
    if(response.status === 201){
      Swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: 'Vehiculo registrado correctamente',
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

const retrieve = async (id: number) => {
    return http.get<IVehiculoModel>(`/vehiculos/${id}`,{headers : {
      "Authorization" :  `Bearer ${localStorage.getItem('token')}`
    }});
};

const update = async (data: IVehiculoModel) => {
  try {    
    const response = await http.put<IVehiculoModel>(`/vehiculos/${data.id}`, data,{headers : {
    "Authorization" :  `Bearer ${localStorage.getItem('token')}`
  }});
    if(response.status === 200){
      Swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: ' Vehiculo actualizado',
        confirmButtonText: 'Aceptar'    
      });
    }

  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '¡Error!',
      text: 'Network Error',
      confirmButtonText: 'Aceptar'    
    });
  }
    
};

/*const remove = async (id: number) => {
    try {
      const response = await  http.delete<string>(`/vehiculos/${id}`,{headers : {
        "Authorization" :  `Bearer ${localStorage.getItem('token')}`
      }});
      if(response.status === 200){
        Swal.fire({
          icon: 'success',
          title: 'Correcto',
          text: 'Vehiculo eliminado',
          confirmButtonText: 'Aceptar'    
        });
      }
    } catch (error) {
      Swal.fire({
      icon: 'error',
      title: '¡Error!',
      text: 'Network Error',
      confirmButtonText: 'Aceptar'    
    });
    }

};
*/

const remove = async (id: number) => {
  const url : string = `/vehiculos/${id}`;
  http.delete<string>(url ,  {headers : {
    "Authorization" :  `Bearer ${localStorage.getItem('token')}`
  }} ).then((response)=> {
    console.log(response);
    showAlert('¡Correcto!', 'Examen eliminado correctamente');
  }).catch((err) => {
    console.error(err);
    showErrorAlert('¡Error!', 'El Examen no pudo ser eliminado');
  });
};

const list = (page: number, size: number, sort? : String) => {
  const urlRequest : string = "/vehiculos/" + page + "/" + size ;
  console.log(urlRequest);
  return http.get<Array<IVehiculoModel>>(urlRequest,{headers : {
    "Authorization" :  `Bearer ${localStorage.getItem('token')}`
  }});
};

const count = async () =>  {  
  const response = await http.get<number>("/vehiculos/count",{headers : {
    "Authorization" :  `Bearer ${localStorage.getItem('token')}`
  }});
  return response.data;
};

const VehiculoService = {
  create,
  retrieve,
  update,
  remove,
  list,
  count

};
export default VehiculoService;