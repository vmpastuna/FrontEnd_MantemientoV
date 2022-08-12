import { ChangeEvent, useEffect, useState } from "react";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import React from 'react';
import IMantenimientoModel from "../../models/Mantenimiento";
import MantenimientoService from "../../services/MantenimientoService";




export const MantenimientoCard=()=> {
    const {id}=useParams();

    const[mantenimiento,setMantenimiento]=useState<IMantenimientoModel>();
    useEffect(()=> {
        if(id)
        getMantenimiento(id);
    },[id]);
    
    const getMantenimiento=(id:any)=>{
        MantenimientoService.retrieve(id).then((response:any)=>{
            setMantenimiento(response.data);
            console.log(response.data);
        }).catch((e:Error)=>{
            console.log(e);
        });
    };

    return ( 
        <div>
            {
                
                mantenimiento?(
                <div>
                    <h1>Nombre:{mantenimiento.nombre}</h1>

                    <tr>
                        <td>Fecha Mantenimiento:{mantenimiento.fechaMantenimiento}</td>
                    </tr>

                    <tr>
                        <td>Precio: {mantenimiento.precio}</td>
                    </tr>

                    <tr>
                        <td> Tipo:{mantenimiento.tipo}</td>
                    </tr>

                    
                    
                    <br />
                    <div className="btn-group" role="group">
                    <Link to={"/mantenimientos"} className="btn btn-primary">
                    <FaArrowLeft /> Volver
                    </Link>
                    
                    <button type="button" className="btn btn-danger">
                    <FaTrash />Eliminar
                    </button>

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
 