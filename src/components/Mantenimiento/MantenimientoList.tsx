
import { FaPen, FaEye, FaTrash, FaPlus } from "react-icons/fa";
import React, {useState, useEffect,ChangeEvent } from 'react';
import Swal from "sweetalert2";

import ReactPaginate from "react-paginate";
import { Link } from 'react-router-dom';
import MantenimientoService from '../../services/MantenimientoService';
import IMantenimientoModel from '../../models/Mantenimiento';
 


export const MantenimientoList =()=> {
   //Hook define un atributo y la funcion lo va actualizar 
    const [mantenimientos,setMantenimientos]= useState<Array<IMantenimientoModel>>([]);
    const [itemsCount,setItemsCount]=useState<number>(0);
    const [pageCount,setPageCount]=useState(0);
    const [itemsPerPage,setIemsPerPafe]=useState(5);


    //Hook para llamar a la web API
    useEffect(() => {
        getItems();  
        listMantenimientos(0, itemsPerPage);           
        }, []);

    const handlePageClick=(event:any)=>{
        const numberPage=event.selected;
        listMantenimientos(numberPage,itemsPerPage);
        
    };

    //Funcion que llama al servicio y listar datos de la web Api
    const listMantenimientos=(page:number, size:number)=>{
        MantenimientoService.list(page,size).then((response:any)=>{
            setMantenimientos(response.data);
            console.log(response.data);
        }).catch((e :Error)=>{
            console.log(e);
        });
        
    };

    const getItems =()=>{
        MantenimientoService.count().then((response:any)=>{
        var itemsCount=response;
        setItemsCount(itemsCount);
        setPageCount(Math.ceil(itemsCount/itemsPerPage));
        setIemsPerPafe(5);
        console.log(response);
        }).catch((e:Error)=>{
            console.log(e);
        });
    };

    const removeMantenimiento=(id:number)=>{
        Swal.fire({
            title:'¿Desea eliminar el registro?',
            showDenyButton:true,
            confirmButtonText:'Si',
            denyButtonText:'No',
        }).then((result)=>{
            if(result.isConfirmed){
                MantenimientoService.remove(id).then((response:any)=>{
                    listMantenimientos(0,itemsPerPage);

                }).catch((e:Error)=>{
                    console.log(e);
                })
            }
        });
    };


    return (  
        
        <div className="list row">
            <h1> hay {itemsCount} Mantenimientos</h1>
            <div className="col-md-12">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Fecha Mantenimiento</th>
                            <th>Precio</th>
                            <th>Tipo</th>
                            <th>
                            <Link to={"/mantenimientos/create"} className="btn btn-success">
                                  <FaPlus /> Agregar
                              </Link>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                      {mantenimientos && mantenimientos.map((Mantenimiento,index)=>(
                        <tr key={index}>
                            <td>{++index}</td>
                            <td>{Mantenimiento.nombre}</td>
                            <td>{Mantenimiento.fechaMantenimiento}</td>
                            <td>{Mantenimiento.precio}</td>
                            <td>{Mantenimiento.tipo}</td>
                            

                            <div className="Btn-group " role="group">
                                <Link to={"/mantenimientos/retrieve/" + Mantenimiento.id} className="btn btn-warning">
                                        <FaEye /> Ver
                                </Link>  
                                <Link to={"/mantenimientos/update/" + Mantenimiento.id} className="btn btn-primary">
                                        <FaEye /> Editar
                                </Link> 
                                <button className="btn btn-danger" onClick={()=>removeMantenimiento(Mantenimiento.id!)}>
                                    <FaTrash/>Eliminar
                                </button>


                            </div>

                        </tr>
                        
                    
                      ))}  
                    </tbody>
                </table>

                <ReactPaginate
                
                className="pagination"
                breakLabel="..."
                nextLabel="Siguiente>"
                onPageChange={handlePageClick}
                pageCount={pageCount}
                previousLabel="<anterior"
                />
            </div>
        
        </div>
    );


}

 