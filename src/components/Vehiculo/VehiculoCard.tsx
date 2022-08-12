import { ChangeEvent, useEffect, useState } from "react";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import React from 'react';
import { useParams } from "react-router-dom";
import IVehiculoModel from "../../models/Vehiculo";
import VehiculoService from "../../services/VehiculoService";




export const VehiculoCard=()=> {
    const {id}=useParams();

    const[vehiculo,setVehiculo]=useState<IVehiculoModel>();
    useEffect(()=> {
        if(id)
        getVehiculo(id);
    },[id]);
    
    const getVehiculo=(id:any)=>{
        VehiculoService.retrieve(id).then((response:any)=>{
            setVehiculo(response.data);
            console.log(response.data);
        }).catch((e:Error)=>{
            console.log(e);
        });
    };

    return ( 
        <div>
            {
                
                vehiculo?(
                <div>
                    <h1>Placa:{vehiculo.placa}</h1>

                    <tr>
                        <td>Modelo:{vehiculo.modelo}</td>
                    </tr>

                    <tr>
                        <td>Color: {vehiculo.color}</td>
                    </tr>

                    <tr>
                        <td> Marca:{vehiculo.marca}</td>
                    </tr>
                     
                    
                    <br />
                    <div className="btn-group" role="group">
                    <Link to={"/vehiculos"} className="btn btn-primary">
                    <FaArrowLeft /> Volver
                    </Link>
                    
                    <button type="button" className="btn btn-danger">
                    <FaTrash />Eliminar
                    </button>

                    </div>




                </div>


                ):
                (
                    <h1>No hay un Vehiculo</h1>
                )
            }



        </div>
     );
}
 