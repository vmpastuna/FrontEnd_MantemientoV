import { ChangeEvent, useEffect, useState } from "react";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import React from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import IMantenimientoModel from "../../models/Mantenimiento";
import MantenimientoService from "../../services/MantenimientoService";


export const MantenimientoForm=()=> {
     const{id}=useParams();
     let navigate=useNavigate();

     //Poner un modeo vacio
     const initialMantenimientoModel:IMantenimientoModel={
        id:null,
        nombre:"",
        fechaMantenimiento:"",
        precio:1.5,
        tipo:""
     };

     //Hooks para gestionar el modelo
     const[mantenimiento,setMantenimiento]=useState<IMantenimientoModel>(initialMantenimientoModel);

     //determina los cambios en cada control input y asigna los valores a cada modelo
     const handleInputChange=(event: ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=event.target;
        setMantenimiento({...mantenimiento,[name]:value});
     };

     const handleTextAreaChange=(event:ChangeEvent<HTMLTextAreaElement>)=>{
        const {name,value}=event.target;
        setMantenimiento({...mantenimiento,[name]:value });
     };

     const saveMantenimiento=()=>{
        if(mantenimiento.id!==null){
            MantenimientoService.update(mantenimiento).then((response:any)=>{
                navigate("/mantenimientos");
                console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
        }else{
            MantenimientoService.create(mantenimiento).then((response:any)=>{
                navigate("/mantenimientos");
                console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
        }
     };

     useEffect(() => {
        if (id)
        getMantenimiento(id);
      }, [id]);


      const getMantenimiento=(id:any)=>{
        MantenimientoService.retrieve(id).then((response:any)=>{
            setMantenimiento(response.data);
            console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
      };




    return ( 
        <div className="submit-form">
            <div>
                {mantenimiento.id !==null?( <h1> Mantenimiento Actualizado</h1>):( <h1> Registro de nuevo Mantenimiento </h1>) } 
                <div className="form-group"></div>
                <label htmlFor="nombre">Nombre</label>
                <input type="text" 
                placeholder="Ingrese Mantenimiento Vehicular"
                className="form-control"
                id="nombre"
                required
                value={mantenimiento.nombre}
                onChange={handleInputChange}
                name="nombre"
                />

                <label htmlFor="fechaMantenimiento">Fecha Mantenimiento</label>
                <input type="date" 
                placeholder="Ingrese Fecha Mantenimiento"
                className="form-control"
                id="fechaMantenimiento"
                required
                value={mantenimiento.fechaMantenimiento}
                onChange={handleInputChange}
                name="fechaMantenimiento"
                />


                <label htmlFor="precio">Precio</label>
                <input type="number" 
                placeholder="Ingrese Precio"
                className="form-control"
                id="precio"
                required
                value={mantenimiento.precio}
                onChange={handleInputChange}
                name="precio"
                />


                <label htmlFor="tipo">Tipo</label>
                <input type="text" 
                placeholder="Ingrese Tipo de Mantenimiento"
                className="form-control"
                id="tipo"
                required
                value={mantenimiento.tipo}
                onChange={handleInputChange}
                name="tipo"
                />
                <br />

                <div className="btn-group" role="group">
                <Link to={"/mantenimientos"} className="btn btn-primary">
                    <FaArrowLeft /> Volver
                </Link>
                <button typeof="button" onClick={saveMantenimiento} className="btn btn-success">
                <FaSave />Guardar
                </button>

                </div>


            </div>
        </div>
     )
    ;
}

 