import Swal from "sweetalert2";
import http from "../http-common";
import IMantenimientoModel from "../models/Mantenimiento";

const create = async (data: IMantenimientoModel) => {    
  try {
    const response = await http.post<IMantenimientoModel>("/vehiculos/1/mantenimientos", data);
    if(response.status === 201){
      Swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: 'Mantenimiento registrado correctamente',
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
    return http.get<IMantenimientoModel>(`/mantenimientos/${id}`);
};

const update = async (data: IMantenimientoModel) => {
  try {    
    const response = await http.put<IMantenimientoModel>(`/mantenimientos/${data.id}`, data);
    if(response.status === 200){
      Swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: ' Mantenimiento actualizado',
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
      const response = await  http.delete<string>(`/mantenimientos/${id}`);
      if(response.status === 200){
        Swal.fire({
          icon: 'success',
          title: 'Correcto',
          text: 'Mantenimiento eliminado',
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
  const urlRequest : string = "/mantenimientos/" + page + "/" + size ;
  console.log(urlRequest);
  return http.get<Array<IMantenimientoModel>>(urlRequest);
};

const count = async () =>  {  
  const response = await http.get<number>("/mantenimientos/count");
  return response.data;
};

const MantenimientoService = {
  create,
  retrieve,
  update,
  remove,
  list,
  count

};
export default MantenimientoService;