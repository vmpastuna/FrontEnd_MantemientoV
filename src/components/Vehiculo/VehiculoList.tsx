
import { FaPen, FaEye, FaTrash, FaPlus } from "react-icons/fa";
import React, {useState, useEffect,ChangeEvent } from 'react';
import Swal from "sweetalert2";

import ReactPaginate from "react-paginate";
import { Link } from 'react-router-dom';
import VehiculoService from '../../services/VehiculoService';
import IVehiculoModel from '../../models/Vehiculo';
 


export const VehiculoList =()=> {
   //Hook define un atributo y la funcion lo va actualizar 
    const [vehiculos,setVehiculos]= useState<Array<IVehiculoModel>>([]);
    const [itemsCount,setItemsCount]=useState<number>(0);
    const [pageCount,setPageCount]=useState(0);
    const [itemsPerPage,setItemsPerPage]=useState(5);

    //Hook para llamar a la web API
    useEffect(() => {
        getItems();  
        listVehiculos(0, itemsPerPage);           
        }, []);

    const handlePageClick=(event:any)=>{
        const numberPage=event.selected;
        listVehiculos(numberPage,itemsPerPage);
        
    };

    //Funcion que llama al servicio y listar datos de la web Api
    const listVehiculos=(page:number, size:number)=>{
        VehiculoService.list(page,size).then((response:any)=>{
            setVehiculos(response.data);
            console.log(response.data);
        }).catch((e :Error)=>{
            console.log(e);
        });
        
    };

    const getItems =()=>{
        VehiculoService.count().then((response:any)=>{
        var itemsCount=response;
        setItemsCount(itemsCount);
        setPageCount(Math.ceil(itemsCount/itemsPerPage));
        setItemsPerPage(4);
        console.log(response);
        }).catch((e:Error)=>{
            console.log(e);
        });
    };

    const removeVehiculo=(id:number)=>{
        Swal.fire({
            title:'¿Desea eliminar el Vehiculo?',
            showDenyButton:true,
            confirmButtonText:'Si',
            denyButtonText:'No',
        }).then((result)=>{
            if(result.isConfirmed){
                VehiculoService.remove(id).then((response:any)=>{
                    listVehiculos(0,itemsPerPage);

                }).catch((e:Error)=>{
                    console.log(e);
                })
            }
        });
    };


    return (  
        
        <div className="list row">
            <h1> hay {itemsCount} Vehículos</h1>
            <div className="col-md-12">
                <select className="form-control w-25 mb-2">
                    <option value="2">2</option>
                    <option value="4">4</option>
                    <option value="6">6</option>
                    <option value="8">8</option>
                </select>
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Placa</th>
                            <th>Modelo</th>
                            <th>Color</th>
                            <th>Marca</th>
                            <th>
                            <Link to={"/vehiculos/create"} className="btn btn-success">
                                  <FaPlus /> Agregar
                              </Link>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                      {vehiculos && vehiculos.map((Vehiculo,index)=>(
                        <tr key={index}>
                            <td>{++index}</td>
                            <td>{Vehiculo.placa}</td>
                            <td>{Vehiculo.modelo}</td>
                            <td>{Vehiculo.color}</td>
                            <td>{Vehiculo.marca}</td>

                            <div className="Btn-group " role="group">
                                <Link to={"/vehiculos/retrieve/" + Vehiculo.id} className="btn btn-warning">
                                        <FaEye /> Ver
                                </Link>  
                                <Link to={"/vehiculos/update/" + Vehiculo.id} className="btn btn-primary">
                                        <FaEye /> Editar
                                </Link> 
                                <button className="btn btn-danger" onClick={()=>removeVehiculo(Vehiculo.id!)}>
                                    <FaTrash/>Eliminar
                                </button>


                            </div>

                        </tr>
                        
                    
                      ))}  
                    </tbody>
                </table>


            <ReactPaginate 
                previousLabel={'Anterior'}
                nextLabel={'Siguiente'}
                breakLabel={'...'}
                pageCount={pageCount}
                marginPagesDisplayed={3}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={'pagination justify-content-center'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                activeClassName={'active'}
            />
            </div>
        
        </div>
    );


}

 