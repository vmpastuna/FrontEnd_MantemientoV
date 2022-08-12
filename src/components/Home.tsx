import React from 'react';
type Portada = {
    title : string;
    description: string;
  }

export const Home = (props: Portada) => {
    return (
        <div className="px-4 py-5 my-5 text-center">
          <img src="https://cdn-icons-png.flaticon.com/512/1514/1514782.png" className="d-block mx-auto mb-4" height="200" alt="logo"/>
          <h1 className='display-5 fw-bold'>{props.title}</h1>
          <div className='col-lg-6 mx-auto'>
            <p className='lead mb-4'>
              {props.description}
            </p>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <button type="button" className="btn btn-primary btn-lg px-4 gap-3">Iniciar Sesion</button>
              <button type="button" className="btn btn-outline-secondary btn-lg px-4">Registrarse</button>
            </div>
          </div>
        </div>
      );
}

