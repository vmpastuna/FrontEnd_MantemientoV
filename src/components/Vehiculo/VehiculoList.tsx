import { FaPen, FaEye, FaTrash, FaPlus } from "react-icons/fa";
import React, { ChangeEvent,useState, useEffect } from 'react'
import { Link,useParams} from 'react-router-dom';
import VehiculoService from '../../services/VehiculoService';
import IVehiculoModel from '../../models/Vehiculo';
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import Dropdown from 'react-dropdown'
import axios from "axios";
import { showAlert, showErrorAlert } from "../../common/alerts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export const VehiculoList = () => {
    const{id}=useParams();
    
    //Hook: Define un atributo y la función que lo va a actualizar
    const [vehiculos,setVehiculos] = useState<Array<IVehiculoModel>>([]);
    const [itemsCount, setItemsCount] = useState<number>(0);
    const [pageCount, setPageCount] = useState<number>(0);
    const [itemsPerPage, setItemsPerPage] = useState<string>('5');
    const [numberPage, setNumberPage] = useState<number>(0);
    
    const[busqueda,setBusqueda]=useState("")
    
    

    //Hook para llamar a la Web API
    useEffect(() => {
      VehiculoService.count().then((response: any) =>{        
        var itemsCount = response;
        setItemsCount(itemsCount);
        setPageCount(Math.ceil(itemsCount/ +itemsPerPage));
        console.log(response);
      }).catch((e : Error)=> {
        console.log(e);
      });      
    },[itemsPerPage]);

   //Metodo de filtrado
    const filtroBu  = () : IVehiculoModel[] => {
      if (busqueda.length === 0 ) 
        return vehiculos ;
      const filtro = vehiculos.filter (pro =>
        pro.placa.toString().toLowerCase().includes(busqueda.toLowerCase()))
      
      return filtro
    }

     //Captar busqueda
    const handleChange = (e : any ) => {
      setBusqueda(e.target.value)
      setPageCount(0);
     }


    useEffect(() => {
      VehiculoService.list(numberPage, +itemsPerPage)
         .then((response: any) => {
           setVehiculos(response.data); //Víncula el resultado del servicio con la función del Hook useState           
           console.log(response.data);
         })
         .catch((e: Error) => {
           console.log(e);
         });          
    },[itemsPerPage, numberPage, itemsCount]);   





    const handlePageClick = (event: any) => {        
      setNumberPage(event.selected);                         
    };


    const handleItemPerPageClick = (event : any) => {
      setItemsPerPage(event.value);
    }


    const removeVehiculo=(id:number)=>{
        Swal.fire({
            title:'¿Desea eliminar el Vehiculo?',
            showDenyButton:true,
            confirmButtonText:'Si',
            denyButtonText:'No',
        }).then((result)=>{
            if(result.isConfirmed){
                VehiculoService.remove(id)
                .then((response:any)=>{
                    var updateItemsCount=itemsCount-1;
                    setItemsCount(updateItemsCount);
                    setPageCount(Math.ceil(updateItemsCount/+itemsPerPage));
                    showAlert('¡Correcto!','Registro eliminado Correctamente');
                    window.location.reload();
                }).catch((e:Error)=>{
                    showErrorAlert('¡Error!', 'Error al intentar borrar el registro');
                    console.log(e);
                });      
            }
          });        
     };



    
     
     const options = ["5", "10", "15" ];

   
    return ( 
        <div className='list row' style={{ color: 'red' }}>
              <h1> hay {itemsCount} Vehículos</h1>
            <div className="row containerInput">
                    <div className="col-5">
                      <input
                      className="form-control inputBuscar"
                      value={busqueda}
                      placeholder="Búsqueda por Placa"
                      onChange={handleChange}
                      />
                    </div>
                    <div className="col-2">
                      <button className="btn btn-success ">
                      <FontAwesomeIcon icon={faSearch}/>
                      </button>
                    </div>
                    

            </div>
            <div className="m-"></div>
            <div className="table" >
                <table className="table  "  style={{ color: 'white' }}>
                    <thead >
                        <tr  style={{ color: 'white' }}>
                            <th><strong>#</strong> </th>
                            <th><strong>Placa</strong> </th>
                            <th><strong> Modelo</strong></th>
                            <th><strong> Color</strong></th>
                            <th><strong> Marca</strong></th>
                            <th>
                                <Link to={"/vehiculos/create"} className="btn btn-success">
                                  <FaPlus /> Agregar
                                </Link>
                            </th>
                            <th>
                            <Dropdown 
                              className="dropdown"
                              menuClassName="dropdown-menu dropdown-item"                              
                              placeholderClassName="btn btn-secondary dropdown-toggle"
                              options={options} 
                              onChange={handleItemPerPageClick}
                              value={itemsPerPage} 
                              />
                            </th>   
                        </tr>
                        
                    </thead>
                    <tbody>
                      {vehiculos && vehiculos.map((Vehiculo,index)=>(
                        <tr key={index}>
                            <td>{(numberPage * +itemsPerPage) + index + 1}</td>
                            <td>{Vehiculo.placa}</td>
                            <td>{Vehiculo.modelo}</td>
                            <td>{Vehiculo.color}</td>
                            <td>{Vehiculo.marca}</td>
                            <td colSpan={2}> 

                            <div role="group">
                                <Link to={"/vehiculos/retrieve/" + Vehiculo.id} className="btn btn-outline-warning m-1">
                                        <FaEye /> Ver
                                </Link>  
                                <Link to={"/vehiculos/update/" + Vehiculo.id} className="btn btn-outline-primary m-1">
                                        <FaPen/> Editar
                                </Link> 
                                <button className="btn btn-outline-danger m-1" onClick={()=>removeVehiculo(Vehiculo.id!)}>
                                    <FaTrash/>Eliminar
                                </button>


                            </div>
                            </td>
                        </tr>
                        
                    
                      ))}  
                    </tbody>
                </table>

                <div className="page-item active">
                <ReactPaginate
                  activeClassName="page-item active"                
                  pageLinkClassName="page-link"
                  containerClassName="pagination"
                  previousLinkClassName="page-link"
                  nextLinkClassName="page-link"
                  previousClassName="page-item"
                  nextClassName="page-item"
                  breakLabel="..."
                  nextLabel=">>"
                  pageClassName="page-item"
                  onPageChange={handlePageClick}                  
                  pageCount={pageCount}
                  previousLabel="<<"
                  />
                  </div>

            </div>            
        </div>
     );
};