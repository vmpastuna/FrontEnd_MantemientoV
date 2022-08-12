import Swal from "sweetalert2";
import http from "../http-common";
import IRepuestoModel from "../models/Repuesto";

const create = async (data: IRepuestoModel) => {    
  try {
    const response = await http.post<IRepuestoModel>("/repuestos", data);
    if(response.status === 201){
      Swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: 'Repuesto registrado correctamente',
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
    return http.get<IRepuestoModel>(`/repuestos/${id}`);
};

const update = async (data: IRepuestoModel) => {
  try {    
    const response = await http.put<IRepuestoModel>(`/repuestos/${data.id}`, data);
    if(response.status === 200){
      Swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: ' Repuesto actualizado',
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
      const response = await  http.delete<string>(`/repuestos/${id}`);
      if(response.status === 200){
        Swal.fire({
          icon: 'success',
          title: 'Correcto',
          text: 'Repuesto eliminado',
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
  const urlRequest : string = "/repuestos/" + page + "/" + size ;
  console.log(urlRequest);
  return http.get<Array<IRepuestoModel>>(urlRequest);
};

const count = async () =>  {  
  const response = await http.get<number>("/repuestos/count");
  return response.data;
};

const RepuestoService = {
  create,
  retrieve,
  update,
  remove,
  list,
  count

};
export default RepuestoService;