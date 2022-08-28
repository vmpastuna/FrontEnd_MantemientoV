import { ChangeEvent, useEffect, useState } from "react";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import React from 'react';
import Dropdown from 'react-dropdown'
import IRepuestoModel from "../../models/Repuesto";
import RepuestoService from "../../services/RepuestoService";
import IVehiculoModel from "../../models/Vehiculo";
import IMantenimientoModel from "../../models/Mantenimiento";
import MantenimientoService from "../../services/MantenimientoService";
import VehiculoService from "../../services/VehiculoService";


export const RepuestoForm=()=> {
  const { id, idVehiculo, idMantenimiento } = useParams();
  let navigate = useNavigate();

  // modeo vacio
  const initialRepuestoModel: IRepuestoModel = {
    id: null,
    nombre: "",
    tipo:"",
    descripcion:"",
    cantidad:0,
    vehiculo: null,
    mantenimiento:null 
  };

  //Hooks para gestionar el modelo
  const [repuesto, setRepuesto] = useState<IRepuestoModel>(initialRepuestoModel);
  const [vehiculo, setVehiculo] = useState<IVehiculoModel>();
  const [mantenimiento, setMantenimiento] = useState<IMantenimientoModel>();
  const [opt, setOption] = useState<string>('Tipos de Repuesto');

  //determina los cambios en cada control input y asigna los valores a cada modelo
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRepuesto({ ...repuesto, [name]: value });
  };
  const handleItemPerPageClick = (event : any) => {
    const {value} = event;
    setRepuesto({ ...initialRepuestoModel, ["tipo"]: value });
  }

  useEffect(() => {
    if (idVehiculo) {
      VehiculoService.retrieve(+idVehiculo)
        .then((response: any) => {
        //  setMantenimiento(response.data);
          setVehiculo(response.data);
          console.log(response.data);
          
        })
        .catch((e: Error) => {
          console.log(e);
        });

        if(idVehiculo!=null){}

  
/*            if (idVehiculo && idMantenimiento) {
              MantenimientoService.retrieve(+idVehiculo,+idMantenimiento)
                .then((response: any) => {
                  console.log("USE EFECT"+ response)
                  setMantenimiento(response.data);
                  console.log(response.data);
                })
                .catch((e: Error) => {
                  console.log(e);
        });
            
        }*/
        
    }
    
    

  }, [id, idVehiculo]);

  const saveRepuesto = () => {
      repuesto.vehiculo = vehiculo!;
      repuesto.mantenimiento = mantenimiento!;
      console.log("Repuesto: \n"+repuesto.id+ " nombre repuesto: "+repuesto.nombre);
      RepuestoService.create(repuesto)
        .then((response: any) => {
          navigate(`/vehiculos/retrieve/${vehiculo!.id}/mantenimientos/retrieve/${mantenimiento!.id}`);
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    
}


const options = ["Mantenimiento Preventivo", "Mantenimiento Correctivo", "Mantenimiento Predictivo" ];

  return (
    <div className="submit-form">
      <div>
        <h1> Registro de nuevo repuesto  </h1>
        {mantenimiento ?  <h3>{mantenimiento.nombre} </h3> : <h3>N/A</h3>}
         
        <label htmlFor="nombre">Nombre</label>
        <input
          type="text"
          placeholder="Ingrese Repuesto"
          className="form-control"
          id="nombre"
          required
          value={repuesto.nombre}
          onChange={handleInputChange}
          name="nombre"
        />

        <label htmlFor="tipo">Tipo </label>
        <Dropdown 
          className="dropdown"
          menuClassName="dropdown-menu dropdown-item"                              
          placeholderClassName="btn btn-secondary dropdown-toggle"
          options={options} 
          onChange={handleItemPerPageClick}
          value={opt} 
          />
        <label htmlFor="descrpcion">Descripcion</label>
        <input
          type="text"
          placeholder="Ingrese Descripcion"
          className="form-control"
          id="descripcion"
          required
          value={repuesto.descripcion}
          onChange={handleInputChange}
          name="descripcion"
        />

        <label htmlFor="cantidad">Cantidad</label>
        <input
          type="number"
          placeholder="Ingrese cantidad"
          className="form-control"
          id="cantidad"
          required
          value={repuesto.cantidad}
          onChange={handleInputChange}
          name="cantidad"
        />

        <div className="btn-group" role="group">
          <Link
            to={`/mantenimiento/retrieve/${idMantenimiento}`}
            className="btn btn-primary"
          >
            <FaArrowLeft /> Volver
          </Link>
          <button
            typeof="button"
            onClick={saveRepuesto}
            className="btn btn-success"
          >
            <FaSave />
            Guardar
          </button>
        </div>
      </div>
    </div>
  );


};
