import { ChangeEvent, useEffect, useState } from "react";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import React from "react";
import { useParams } from "react-router-dom";
import IVehiculoModel from "../../models/Vehiculo";
import VehiculoService from "../../services/VehiculoService";
import { MantenimientoList } from "../Mantenimiento/MantenimientoList";
import { RepuestoList } from "../Repuesto/RepuestoList";

export const VehiculoCard = () => {
  const { id } = useParams();
  const [vehiculo, setVehiculo] = useState<IVehiculoModel>();

  useEffect(() => {
    if (id) {
      VehiculoService.retrieve(+id)
        .then((response: any) => {
          setVehiculo(response.data);
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  }, [id]);

  return (
    <div>
      {vehiculo ? (
        <div>
          <div className="card text-white bg-dark mb-3 p-5">
            <h1>
              {" "}
              <strong>Placa :</strong> {vehiculo.placa}
            </h1>
            <div>
              <strong>Modelo: </strong> {vehiculo.modelo}
            </div>
            <div>
              <strong>Color:</strong> {vehiculo.color}
            </div>
            <div>
              <strong>Marca:</strong> {vehiculo.marca}
            </div>
          </div>
          <div>
            <MantenimientoList idVehiculo={vehiculo.id!} />
          </div>

          <div>
            <RepuestoList idVehiculo={vehiculo.id!} />
          </div>

          <br />
          <div className="btn-group" role="group">
            <Link to={"/vehiculos"} className="btn btn-primary">
              <FaArrowLeft /> Volver
            </Link>
          </div>
        </div>
      ) : (
        <h1>No hay un Vehiculo</h1>
      )}
    </div>
  );
};
