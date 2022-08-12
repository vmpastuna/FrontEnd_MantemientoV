import Swal from "sweetalert2";
import http from "../http-common";
import IVehiculoModel from "../models/Vehiculo";

const create = async (data: IVehiculoModel) => {    
  try {
    const response = await http.post<IVehiculoModel>("/vehiculos", data);
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
    return http.get<IVehiculoModel>(`/vehiculos/${id}`);
};

const update = async (data: IVehiculoModel) => {
  try {    
    const response = await http.put<IVehiculoModel>(`/vehiculos/${data.id}`, data);
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

const remove = async (id: number) => {
    try {
      const response = await  http.delete<string>(`/vehiculos/${id}`);
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


const list = (page: number, size: number, sort? : String) => {
  const urlRequest : string = "/vehiculos/" + page + "/" + size ;
  console.log(urlRequest);
  return http.get<Array<IVehiculoModel>>(urlRequest);
};

const count = async () =>  {  
  const response = await http.get<number>("/vehiculos/count");
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