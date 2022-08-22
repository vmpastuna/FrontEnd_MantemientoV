import { ChangeEvent, useEffect, useState } from "react";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import React from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import IVehiculoModel from "../../models/Vehiculo";
import IMantenimientoModel from "../../models/Mantenimiento";
import VehiculoService from "../../services/VehiculoService";
import MantenimientoService from "../../services/MantenimientoService";


export const MantenimientoCard=()=> {

    const {id,idVehiculo}=useParams();
    let navigate=useNavigate();

    //Hooks para gestionar el modelo
    const[mantenimiento,setMantenimiento]=useState<IMantenimientoModel>();
    const[vehiculo,setVehiculo]=useState<IVehiculoModel>();


    useEffect(()=> {
        if(idVehiculo){
         VehiculoService.retrieve(+idVehiculo).then((response:any)=>{
            setVehiculo(response.data);
            mantenimiento!.vehiculo=vehiculo!;
            console.log(response.data);
         }).catch((e:Error)=>
         {
            console.log(e);
         });
        }

        if(id && idVehiculo){
            MantenimientoService.retrieve(+idVehiculo,+id).then((response:any)=>{
                setMantenimiento(response.data);
                mantenimiento!.vehiculo=vehiculo!;
                console.log(response.data);
            }).catch((e:Error)=>{
                console.log(e);
            });
        }
    },[vehiculo,mantenimiento,id,idVehiculo]);

console.log("hi");
    return ( 
        <div>
            {
                
                mantenimiento?(
                <div className="card text-white bg-dark mb-3 p-5">
                    
                    <tr>
                        <td>
                         <strong>Nombre:</strong>{mantenimiento.nombre} 
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <strong>Fecha Mantenimiento:</strong> {mantenimiento.fechaMantenimiento}</td>
                    </tr>

                    <tr>
                        <td>
                           <strong> Precio:</strong>  {mantenimiento.precio}</td>
                    </tr>

                    <tr>
                        <td>
                            <strong> Tipo:</strong> {mantenimiento.tipo}</td>
                    </tr>

                    
                    
                    <br />
                    <div className="btn-group" role="group">
                    <Link to={`/vehiculos/retrieve/${idVehiculo}`} className="btn btn-primary">
                    <FaArrowLeft /> Volver
                    </Link>
      

                    </div>

                </div>


                ):
                (
                    <h1>No hay ningun Mantenimiento</h1>
                    
                )
            }



        </div>
     );
}
 