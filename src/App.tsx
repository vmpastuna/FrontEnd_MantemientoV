import { Routes, Route, Link } from "react-router-dom";
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Home } from "./components/Home";
import { VehiculoList } from "./components/Vehiculo/VehiculoList";
import { VehiculoForm } from './components/Vehiculo/VehiculoForm';
 import { VehiculoCard } from "./components/Vehiculo/VehiculoCard";
//importaciones de entidad mantenimiento
 import { MantenimientoForm } from "./components/Mantenimiento/MantenimientoForm";
 import { MantenimientoCard } from "./components/Mantenimiento/MantenimientoCard";
 
const title = "Mechanical Workshop";
const description = "Control de Mantenimiento Vehicular";

const App: React.FC = () => {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">   
        <Link to={"/"}  className="navbar-brand ms-3 ">
             <img src="https://cdn-icons-png.flaticon.com/512/3339/3339392.png" height="45" width="45" alt="logo"/>
          
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/vehiculos"} className="nav-link  navbar-brand">
              Vehículos
            </Link>
          </li>   
          <li className="nav-item">
            <Link to={"/mantenimientos"} className="nav-link  navbar-brand">
              Mantenimiento
            </Link>
          </li>   
          <li className="nav-item">
            <Link to={"/repuestos"} className="nav-link  navbar-brand">
              Repuesto
            </Link>
          </li>       
        </div>
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home title={title} description={description} />} />    
          <Route path="/vehiculos" element={<VehiculoList />}/>    
          <Route path="/vehiculos/create" element={<VehiculoForm />}/>   
          <Route path="/vehiculos/retrieve/:id" element={<VehiculoCard />}/>  
          <Route path="/vehiculos/update/:id" element={<VehiculoForm />}/>  
  
          <Route path="/vehiculos/:idVehiculo/mantenimientos/create" element={<MantenimientoForm />}/>    
          <Route path="/vehiculos/:idVehiculo/mantenimientos/retrieve/:id" element={<MantenimientoCard />} />
          <Route path="/vehiculos/:idVehiculo/mantenimientos/:id" element={<MantenimientoForm />}/> 
          <Route path="/vehiculos/:idVehiculo/mantenimientos/update/:id" element={<MantenimientoForm />} />

     
          
           
        </Routes>
      </div>
    </div>
  );
}
export default App;
