import { ChangeEvent, useEffect, useState } from "react";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import React from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import IVehiculoModel from "../../models/Vehiculo";
import VehiculoService from "../../services/VehiculoService";


export const VehiculoForm=()=> {
     const{id}=useParams();
     let navigate=useNavigate();

     //Poner un modeo vacio
     const initialVehiculoModel:IVehiculoModel={
        id:null,
        placa:"",
        modelo:"",
        color:"",
        marca:""
     };

     //Hooks para gestionar el modelo
     const[vehiculo,setVehiculo]=useState<IVehiculoModel>(initialVehiculoModel);

     //determina los cambios en cada control input y asigna los valores a cada modelo
     const handleInputChange=(event: ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=event.target;
        setVehiculo({...vehiculo,[name]:value});
     };

     const handleTextAreaChange=(event:ChangeEvent<HTMLTextAreaElement>)=>{
        const {name,value}=event.target;
        setVehiculo({...vehiculo,[name]:value });
     };

     const saveVehiculo=()=>{
        if(vehiculo.id!==null){
            VehiculoService.update(vehiculo).then((response:any)=>{
                navigate("/vehiculos");
                console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
        }else{
            VehiculoService.create(vehiculo).then((response:any)=>{
                navigate("/vehiculos");
                console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
        }
     };

     useEffect(() => {
        if (id)
        getVehiculo(id);
      }, [id]);


      const getVehiculo=(id:any)=>{
        VehiculoService.retrieve(id).then((response:any)=>{
            setVehiculo(response.data);
            console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
      };




    return ( 
        <div className="submit-form">
            <div>
                {vehiculo.id !==null?( <h1> Vehicculo Actualizado</h1>):( <h1> Registro de nuevo vehiculo </h1>) } 
                <div className="form-group"></div>
                <label htmlFor="placa">Placa</label>
                <input type="text" 
                placeholder="Ingrese Placa del Vehiculo"
                className="form-control"
                id="placa"
                required
                value={vehiculo.placa}
                onChange={handleInputChange}
                name="placa"
                />

                <label htmlFor="modelo">Modelo</label>
                <input type="text" 
                placeholder="Ingrese Modelo del Vehiculo"
                className="form-control"
                id="modelo"
                required
                value={vehiculo.modelo}
                onChange={handleInputChange}
                name="modelo"
                />


                <label htmlFor="color">Color</label>
                <input type="text" 
                placeholder="Ingrese Color del Vehiculo"
                className="form-control"
                id="color"
                required
                value={vehiculo.color}
                onChange={handleInputChange}
                name="color"
                />


                <label htmlFor="marca">Marca</label>
                <input type="text" 
                placeholder="Ingrese Marca del Vehiculo"
                className="form-control"
                id="marca"
                required
                value={vehiculo.marca}
                onChange={handleInputChange}
                name="marca"
                />
                <br />

                <div className="btn-group" role="group">
                <Link to={"/vehiculos"} className="btn btn-primary">
                    <FaArrowLeft /> Volver
                </Link>
                <button typeof="button" onClick={saveVehiculo} className="btn btn-success">
                <FaSave />Guardar
                </button>

                </div>


            </div>
        </div>
     )
    ;
}

 