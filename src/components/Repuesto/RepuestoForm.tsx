import { ChangeEvent, useEffect, useState } from "react";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import React from 'react';
import IRepuestoModel from "../../models/Repuesto";
import RepuestoService from "../../services/RepuestoService";


export const RepuestoForm=()=> {
     const{id}=useParams();
     let navigate=useNavigate();

     //Poner un modeo vacio
     const initialRepuestoModel:IRepuestoModel={
        id:null,
        nombre:"",
        tipo:"",
        descripcion:"",
        cantidad:1,
        vehiculo: null,
        mantenimiento: null

     };

     
     //Hooks para gestionar el modelo
     const[repuesto,setRepuesto]=useState<IRepuestoModel>(initialRepuestoModel);

     //determina los cambios en cada control input y asigna los valores a cada modelo
     const handleInputChange=(event: ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=event.target;
        setRepuesto({...repuesto,[name]:value});
     };

     const handleTextAreaChange=(event:ChangeEvent<HTMLTextAreaElement>)=>{
        const {name,value}=event.target;
        setRepuesto({...repuesto,[name]:value });
     };

     const saveRepuesto=()=>{
        if(repuesto.id!==null){
            RepuestoService.update(repuesto).then((response:any)=>{
                navigate("/repuestos");
                console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
        }else{
            RepuestoService.create(repuesto).then((response:any)=>{
                navigate("/repuestos");
                console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
        }
     };

     useEffect(() => {
        if (id)
        getRepuesto(id);
      }, [id]);


      const getRepuesto=(id:any)=>{
        RepuestoService.retrieve(id).then((response:any)=>{
            setRepuesto(response.data);
            console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
      };




    return ( 
        <div className="submit-form">
            <div>
                {repuesto.id !==null?( <h1> Registro Actualizado</h1>):( <h1> Registro de nuevo repuesto </h1>) } 
                <div className="form-group"></div>
                <label htmlFor="nombre">Nombre</label>
                <input type="text" 
                placeholder="Ingrese Nombre del Repuesto"
                className="form-control"
                id="nombre"
                required
                value={repuesto.nombre}
                onChange={handleInputChange}
                name="nombre"
                />

                <label htmlFor="tipo">Tipo</label>
                <input type="text" 
                placeholder="Ingrese Tipo de Repuesto"
                className="form-control"
                id="tipo"
                required
                value={repuesto.tipo}
                onChange={handleInputChange}
                name="tipo"
                />


                <label htmlFor="descripcion">Descripcion</label>
                <input type="text" 
                placeholder="Ingrese Descripcion del Repuesto"
                className="form-control"
                id="descripcion"
                required
                value={repuesto.descripcion}
                onChange={handleInputChange}
                name="descripcion"
                />


                <label htmlFor="cantidad">cantidad</label>
                <input type="number" 
                placeholder="Ingrese la cantidad de repuestos"
                className="form-control"
                id="cantidad"
                required
                value={repuesto.cantidad}
                onChange={handleInputChange}
                name="cantidad"
                />
                <br />

                <div className="btn-group" role="group">
                <Link to={"/repuestos"} className="btn btn-primary">
                    <FaArrowLeft /> Volver
                </Link>
                <button typeof="button" onClick={saveRepuesto} className="btn btn-success">
                <FaSave />Guardar
                </button>

                </div>


            </div>
        </div>
     )
    ;
}

 