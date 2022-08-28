import { ChangeEvent, useEffect, useState } from "react";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { Component, Fragment } from "react";
import Select from "react-select";
import React from "react";
import Dropdown from 'react-dropdown'
import { Link, useNavigate, useParams } from "react-router-dom";
import IMantenimientoModel from "../../models/Mantenimiento";
import MantenimientoService from "../../services/MantenimientoService";
import VehiculoService from "../../services/VehiculoService";
import IVehiculoModel from "../../models/Vehiculo";

export const MantenimientoForm = () => {
  
 

  const { id, idVehiculo } = useParams();
  let navigate = useNavigate();

  // modeo vacio
  const initialMantenimientoModel: IMantenimientoModel = {
    id: null,
    nombre: "",
    fechaMantenimiento: "",
    precio: 0,
    tipo: "",
    vehiculo: null,
  };

  //Hooks para gestionar el modelo
  const [mantenimiento, setMantenimiento] = useState<IMantenimientoModel>(
    initialMantenimientoModel
  );
  const [vehiculo, setVehiculo] = useState<IVehiculoModel>();
  const [opt, setOption] = useState<string>('Tipos de Mantenimiento');

  //determina los cambios en cada control input y asigna los valores a cada modelo
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setMantenimiento({ ...mantenimiento, [name]: value });
  };
  const handleItemPerPageClick = (event : any) => {
    const {value} = event;
    setMantenimiento({ ...mantenimiento, ["tipo"]: value });
  }

  useEffect(() => {
    if (idVehiculo) {
      VehiculoService.retrieve(+idVehiculo)
        .then((response: any) => {
          setVehiculo(response.data);
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }

    if (id && idVehiculo) {
      MantenimientoService.retrieve(+idVehiculo, +id)
        .then((response: any) => {
          setMantenimiento(response.data);
          mantenimiento.vehiculo = vehiculo!;
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  }, [id, idVehiculo]);

  const saveMantenimiento = () => {
    if (mantenimiento.id !== null) {
      MantenimientoService.update(mantenimiento)
        .then((response: any) => {
          navigate(`/vehiculos/retrieve/${vehiculo!.id}`);
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    } else {
      mantenimiento.vehiculo = vehiculo!;
      MantenimientoService.create(mantenimiento)
        .then((response: any) => {
          navigate(`/vehiculos/retrieve/${vehiculo!.id}`);
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  };



  const options = ["Mantenimiento Preventivo", "Mantenimiento Correctivo", "Mantenimiento Predictivo" ];

  return (
    <div className="submit-form">
      <div>
          <h1> Registro de nuevo Mantenimiento </h1>
        {vehiculo ? <h3>{vehiculo.placa} </h3> : <h3>N/A</h3>}
        <div className="form-group"></div>
        <label htmlFor="nombre">Nombre</label>
        <input
          type="text"
          placeholder="Ingrese Mantenimiento Vehicular"
          className="form-control"
          id="nombre"
          required
          value={mantenimiento.nombre}
          onChange={handleInputChange}
          name="nombre"
        />

        <label htmlFor="fechaMantenimiento">Fecha Mantenimiento</label>
        <input
          type="date"
          placeholder="Ingrese Fecha Mantenimiento"
          className="form-control"
          id="fechaMantenimiento"
          required
          value={mantenimiento.fechaMantenimiento}
          onChange={handleInputChange}
          name="fechaMantenimiento"
        />

        <label htmlFor="precio">Precio</label>
        <input
          type="number"
          placeholder="Ingrese Precio"
          className="form-control"
          id="precio"
          required
          value={mantenimiento.precio}
          onChange={handleInputChange}
          name="precio"
        />

        <label htmlFor="tipo">Tipo</label>
        <Dropdown 
          className="dropdown"
          menuClassName="dropdown-menu dropdown-item"                              
          placeholderClassName="btn btn-secondary dropdown-toggle"
          options={options} 
          onChange={handleItemPerPageClick}
          value={opt} 
          />

        <br />

        <div className="btn-group" role="group">
          <Link
            to={`/vehiculos/retrieve/${idVehiculo}`}
            className="btn btn-primary"
          >
            <FaArrowLeft /> Volver
          </Link>
          <button
            typeof="button"
            onClick={saveMantenimiento}
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
