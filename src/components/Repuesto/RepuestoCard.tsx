import { ChangeEvent, useEffect, useState } from "react";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import React from 'react';
import { useParams } from "react-router-dom";
import IRepuestoModel from "../../models/Repuesto";
import RepuestoService from "../../services/RepuestoService";




export const RepuestoCard=()=> {
    const {id}=useParams();

    const[repuesto,setRepuesto]=useState<IRepuestoModel>();
    useEffect(()=> {
        if(id)
        getRepuesto(id);
    },[id]);
    
    const getRepuesto=(id:any)=>{
        RepuestoService.retrieve(id).then((response:any)=>{
            setRepuesto(response.data);
            console.log(response.data);
        }).catch((e:Error)=>{
            console.log(e);
        });
    };

    return ( 
        <div>
            {
                
            repuesto?(
                <div>
                    <h1>Nombre:{repuesto.nombre}</h1>

                    <tr>
                        <td>Tipo:{repuesto.tipo}</td>
                    </tr>

                    <tr>
                        <td>Descripcion: {repuesto.descripcion}</td>
                    </tr>

                    <tr>
                        <td> Cantidad:{repuesto.cantidad}</td>
                    </tr>
                     
                    
                    <br />
                    <div className="btn-group" role="group">
                    <Link to={"/repuestos"} className="btn btn-primary">
                    <FaArrowLeft /> Volver
                    </Link>
                    
                    <button type="button" className="btn btn-danger">
                    <FaTrash />Eliminar
                    </button>

                    </div>




                </div>


                ):
                (
                    <h1>No hay ningun Repuesto</h1>
                )
            }



        </div>
     );
}
 