import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IUserModel from "../../models/User";
import React from "react";
import IUserTokenModel from "../../models/UserToken";
import UserService from "../../services/UserServices";
import '../Style/login.css';


const initialUserModel: IUserModel = {
  name: "",
  password: "",
};

export const LoginCard = () => {

  let navigate = useNavigate();

  //Hooks control de Token
  const [userToken, setUserToken] = useState<IUserTokenModel>();
  const [user, setUser] = useState<IUserModel>(initialUserModel);


      //Escucha los cambios en cada control Input y los asigna a los valores del Modelo
      const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

  const loginUser = () => {
      UserService.login(user)
        .then((response: any) => {
          navigate('/exams');
          console.log(response.data);
        })
        .catch((e: Error) => {
          navigate('/');
          console.log(e);

        });
  };
   return (
    <div className="container">
    <div className="d-flex justify-content-center h-100">
      <div className="card">
        <div className="card-header">
          <h3>Sign In</h3>
        </div>
        <div className="card-body ">
          <form >
            <div className="input-group-prepend">
                        <input
                      type="text"
                      placeholder="username"
                      className="form-control"
                      id="name"
                      required
                      value={user.name}
                      onChange={handleInputChange}
                      name="name"
                    />

            </div>
            
            <div className="input-group-prepend">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="password"
                    id="password"
                    required
                    value={user.password}
                    onChange={handleInputChange}
                    name="password"
                  />

            </div>
            <div className="boton">
                <button  type="button"  className="btn float-right login_btn"  onClick={loginUser} >
                  Login
                </button>

            </div>
          </form>
        </div>
        <div className="card-footer">
          <div className="d-flex justify-content-center links">
            Don't have an account?<a href="#">Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};