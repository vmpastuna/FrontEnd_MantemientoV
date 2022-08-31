
import { FaPen, FaEye, FaTrash, FaPlus } from "react-icons/fa";
import React, {useState, useEffect,ChangeEvent } from 'react';
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import { showAlert, showErrorAlert } from "../../common/alerts";
import { Link } from 'react-router-dom';
import RepuestoService from '../../services/RepuestoService';
import IRepuestoModel from '../../models/Repuesto';
 


type AppProps = {
    idVehiculo: number;
  };
  
  export const RepuestoList = (props: AppProps) => {
    //Hook define un atributo y la funcion lo va actualizar
    const [repuesto, setRepuesto] = useState<Array<IRepuestoModel>>([]);
  
    //Hook para llamar a la web API
    useEffect(() => {
      RepuestoService.list(props.idVehiculo)
        .then((response: any) => {
          setRepuesto(response.data);
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }, [props.idVehiculo]);
  
    const removeRepuesto = (id: number, idVehiculo: number) => {
      Swal.fire({
        title: "¿Desea eliminar?",
        showDenyButton: true,
        confirmButtonText: "Si",
        denyButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          RepuestoService.remove(idVehiculo, id)
            .then((response: any) => {
              showAlert("¡Correcto!", "Repuesto eliminado correctamente");
              window.location.reload();
            })
            .catch((e: Error) => {
              showErrorAlert(
                "¡Error!",
                "Error al intentar borrar el Repuesto"
              );
              console.log(e);
            });
        }
      });
    };
    return (
      <div className="list row" style={{ color: 'white' }}>
        <h4>Repuesto</h4>
        <div className="col-md-12">
          <table className="table" style={{ color: 'white' }}>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Descripcion</th>
                <th>Cantidad</th>
                <th>
                  <Link
                    to={
                      "/vehiculos/" + props.idVehiculo + "/repuestos/create"
                    }
                    className="btn btn-success"
                  >
                    <FaPlus /> Agregar
                  </Link>
                </th>
                
              </tr>
            </thead>
            <tbody>
              {repuesto &&
                repuesto.map((Repuesto, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{Repuesto.nombre}</td>
                    <td>{Repuesto.tipo}</td>
                    <td>{Repuesto.descripcion}</td>
                    <td>{Repuesto.cantidad}</td>
  
                    <td className="Btn-group " role="group">
                      
                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          removeRepuesto(Repuesto.id!, props.idVehiculo)
                        }
                      >
                        <FaTrash />
                        Eliminar
                      </button>
  
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  