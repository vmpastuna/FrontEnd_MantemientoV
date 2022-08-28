import { useEffect, useState } from "react";
import { FaEye, FaPen, FaPlus, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import React from "react";
import { showAlert, showErrorAlert } from "../../common/alerts";
import MantenimientoService from "../../services/MantenimientoService";
import IMantenimientoModel from "../../models/Mantenimiento";

type AppProps = {
  idVehiculo: number;
};

export const MantenimientoList = (props: AppProps) => {
  //Hook define un atributo y la funcion lo va actualizar
  const [mantenimientos, setMantenimientos] = useState<Array<IMantenimientoModel>>([]);

  //Hook para llamar a la web API
  useEffect(() => {
    MantenimientoService.list(props.idVehiculo)
      .then((response: any) => {
        setMantenimientos(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }, [props.idVehiculo]);

  const removeMantenimiento = (id: number, idVehiculo: number) => {
    Swal.fire({
      title: "¿Desea eliminar?",
      showDenyButton: true,
      confirmButtonText: "Si",
      denyButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        MantenimientoService.remove(idVehiculo, id)
          .then((response: any) => {
            showAlert("¡Correcto!", "Mantenimiento eliminado correctamente");
          })
          .catch((e: Error) => {
            showErrorAlert(
              "¡Error!",
              "Error al intentar borrar el Mantenimiento"
            );
            console.log(e);
          });
      }
    });
  };
  return (
    <div className="list row">
      <h4>Mantenimientos</h4>
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
                <Link
                  to={
                    "/vehiculos/" + props.idVehiculo + "/mantenimientos/create"
                  }
                  className="btn btn-success"
                >
                  <FaPlus /> Agregar
                </Link>
              </th>
              
            </tr>
          </thead>
          <tbody>
            {mantenimientos &&
              mantenimientos.map((Mantenimiento, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{Mantenimiento.nombre}</td>
                  <td>{Mantenimiento.fechaMantenimiento}</td>
                  <td>{Mantenimiento.precio}</td>
                  <td>{Mantenimiento.tipo}</td>

                  <td className="Btn-group " role="group">
                    <Link
                      to={
                        "/vehiculos/" +
                        props.idVehiculo +
                        "/mantenimientos/retrieve/" +
                        Mantenimiento.id
                      }
                      className="btn btn-warning"
                    >
                      <FaEye /> Ver
                    </Link>
                    <Link
                      to={
                        "/vehiculos/" +
                        props.idVehiculo +
                        "/mantenimientos/update/" +
                        Mantenimiento.id
                      }
                      className="btn btn-primary"
                    >
                      <FaPen /> Editar
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        removeMantenimiento(Mantenimiento.id!, props.idVehiculo)
                      }
                    >
                      <FaTrash />
                      Eliminar
                    </button>

                    <Link to={"/vehiculos/" + props.idVehiculo + "/mantenimientos/"+ Mantenimiento.id +"/create"} className="btn btn-success">
                   <FaPlus /> Agregar Repuesto
                                </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
