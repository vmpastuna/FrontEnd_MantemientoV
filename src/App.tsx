import { Routes, Route, Link, Navigate } from "react-router-dom";
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Home } from "./components/Home";
import { VehiculoList } from "./components/Vehiculo/VehiculoList";
import { VehiculoForm } from './components/Vehiculo/VehiculoForm';
 import { VehiculoCard } from "./components/Vehiculo/VehiculoCard";
//importaciones de entidad mantenimiento
 import { MantenimientoForm } from "./components/Mantenimiento/MantenimientoForm";
 import { MantenimientoCard } from "./components/Mantenimiento/MantenimientoCard";
import { RepuestoForm } from "./components/Repuesto/RepuestoForm";
import { LoginCard } from "./components/Login/LoginCard";
import { FaLongArrowAltUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
 
 
const title = "Mechanical Workshop";
const description = "Control de Mantenimiento Vehicular";

const App: React.FC = () => {
  //Eliminar el localStorage y se elimina el token
  let navigate = useNavigate();

  const Salir=()=>{
    localStorage.clear();
    navigate('/login');
    console.log("hola");
  }

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">  
       
        <Link to={"/"}  className="navbar-brand ms-3 ">
             <img src="https://cdn-icons-png.flaticon.com/512/3339/3339392.png" height="45" width="45" alt="logo"/>
          
        </Link>
        <Link to={"/login"}  className="navbar-brand ms-3 ">
          Login
        </Link > 

        <button  className="navbar-brand ms-3 " onClick={Salir} style={{ color: 'red' }} >
        Salir
        </button>
        
        
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/vehiculos"} className="nav-link  navbar-brand"></Link>
          </li>   
       
           
        </div>
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home title={title} description={description} />} />    
          <Route path="/login" element={<LoginCard />}/> 
          <Route path="/vehiculos" element={<VehiculoList />}/>    
          <Route path="/vehiculos/create" element={<VehiculoForm />}/>   
          <Route path="/vehiculos/retrieve/:id" element={<VehiculoCard />}/>  
          <Route path="/vehiculos/update/:id" element={<VehiculoForm />}/>  
  
          <Route path="/vehiculos/:idVehiculo/mantenimientos/create" element={<MantenimientoForm />}/>    
          <Route path="/vehiculos/:idVehiculo/mantenimientos/retrieve/:id" element={<MantenimientoCard />} />
          <Route path="/vehiculos/:idVehiculo/mantenimientos/:id" element={<MantenimientoForm />}/> 
          <Route path="/vehiculos/:idVehiculo/mantenimientos/update/:id" element={<MantenimientoForm />} />

          <Route path="/vehiculos/:idVehiculo/repuestos/create" element={<RepuestoForm />}/> 
          
         
        </Routes>
      </div>
    </div>
  );
}
export default App;
