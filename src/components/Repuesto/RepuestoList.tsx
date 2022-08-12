
import { FaPen, FaEye, FaTrash, FaPlus } from "react-icons/fa";
import React, {useState, useEffect,ChangeEvent } from 'react';
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import { Link } from 'react-router-dom';
import RepuestoService from '../../services/RepuestoService';
import IRepuestoModel from '../../models/Repuesto';
 


export const RepuestoList =()=> {
   //Hook define un atributo y la funcion lo va actualizar 
    const [repuestos,setRepuestos]= useState<Array<IRepuestoModel>>([]);
    const [itemsCount,setItemsCount]=useState<number>(0);
    const [pageCount,setPageCount]=useState(0);
    const [itemsPerPage,setIemsPerPafe]=useState(5);


    //Hook para llamar a la web API
    useEffect(() => {
        getItems();  
        listRepuestos(0, itemsPerPage);           
        }, []);

    const handlePageClick=(event:any)=>{
        const numberPage=event.selected;
        listRepuestos(numberPage,itemsPerPage);
        
    };

    //Funcion que llama al servicio y listar datos de la web Api
    const listRepuestos=(page:number, size:number)=>{
        RepuestoService.list(page,size).then((response:any)=>{
            setRepuestos(response.data);
            console.log(response.data);
        }).catch((e :Error)=>{
            console.log(e);
        });
        
    };

    const getItems =()=>{
        RepuestoService.count().then((response:any)=>{
        var itemsCount=response;
        setItemsCount(itemsCount);
        setPageCount(Math.ceil(itemsCount/itemsPerPage));
        setIemsPerPafe(5);
        console.log(response);
        }).catch((e:Error)=>{
            console.log(e);
        });
    };

    const removeRepuesto=(id:number)=>{
        Swal.fire({
            title:'¿Desea eliminar el registro?',
            showDenyButton:true,
            confirmButtonText:'Si',
            denyButtonText:'No',
        }).then((result)=>{
            if(result.isConfirmed){
                RepuestoService.remove(id).then((response:any)=>{
                    listRepuestos(0,itemsPerPage);

                }).catch((e:Error)=>{
                    console.log(e);
                })
            }
        });
    };


    return (  
        
        <div className="list row">
            <h1> hay {itemsCount} Repuestos</h1>
            <div className="col-md-12">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Tipo</th>
                            <th>Descripcion</th>
                            <th>Cantidad</th>
                            <th>
                            <Link to={"/repuestos/create"} className="btn btn-success">
                                  <FaPlus /> Agregar
                              </Link>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                      {repuestos && repuestos.map((Repuesto,index)=>(
                        <tr key={index}>
                            <td>{++index}</td>
                            <td>{Repuesto.nombre}</td>
                            <td>{Repuesto.tipo}</td>
                            <td>{Repuesto.descripcion}</td>
                            <td>{Repuesto.cantidad}</td>

                            <div className="Btn-group " role="group">
                                <Link to={"/repuestos/retrieve/" + Repuesto.id} className="btn btn-warning">
                                        <FaEye /> Ver
                                </Link>  
                                <Link to={"/repuestos/update/" + Repuesto.id} className="btn btn-primary">
                                        <FaEye /> Editar
                                </Link> 
                                <button className="btn btn-danger" onClick={()=>removeRepuesto(Repuesto.id!)}>
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

 