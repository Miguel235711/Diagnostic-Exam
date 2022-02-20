import React from "react";
import url from '../Var';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'


class Form extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          name:''
          ,sex:'Mujer'
          ,address:''
          ,email:''
          ,phone:''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    isBlank(str){
      return !str || /^\s*$/.test(str);
    }
    fireError(str){
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: str
      });
    }
    isEmail(email){
      return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    }
    isNotNumber(number){
      return /.*[0-9].*/.test(number);
    }
    handleSubmit(event){
        event.preventDefault();
        const data = this.state;
        if(this.isBlank(data.name)){
          this.fireError('El nombre no puede estar vacío.');
          return;
        }
        if(this.isBlank(data.address)){
          this.fireError('La dirección no puede estar vacía.');
          return;
        }
        if(!this.isEmail(data.email)){
          this.fireError('El correo no es válido.');
          return;
        }
        if(!this.isNotNumber(data.phone)){
          this.fireError('El teléfono no es válido.');
          return;
        }
        const xhr = new XMLHttpRequest();
        xhr.open('POST',url);
        xhr.setRequestHeader('Content-Type','application/json');
        xhr.onload = ()=>{
          if(xhr.readyState === xhr.DONE)
            if(xhr.status === 200){
              alert(JSON.parse(xhr.responseText).msg);
              this.setState( {
                name:''
                ,sex:'Mujer'
                ,address:''
                ,email:''
                ,phone:''
              });
            }
        }
        xhr.send(JSON.stringify(this.state));
    }
    handleChange(event){

    }
    update(name,event){
      this.setState({
        [name]:event.target.value
      });
    }
    render() {
      return <form onSubmit={this.handleSubmit} ref={(el)=>this.myFormRef=el}>
          <h1>Formulario</h1>
          <div class="row g-2 align-items-center">
            <div class="col-auto">
              <label for="name" class="col-form-label">Nombres y Apellidos:</label>
            </div>
            <div class="col-auto">
              <input type="text" class="form-control"  aria-describedby="nameHelp" value={this.state.name} onChange={(e)=>this.update('name',e)}></input>
            </div>
          </div>
          <div class="row g-2 align-items-center">
            <div class="col-auto">
              <label for="sex" class="col-form-label">Sexo:</label>
            </div>
            <div class="col-auto">
              <select value={this.state.sex}  class="form-select" onChange={(e)=>this.update('sex',e)}>
                  <option value="Mujer" selected>Mujer</option>
                  <option value="Hombre">Hombre</option>
                  <option value="No binario">No binario</option>
                  <option value="Prefiero no especificar">Prefiero no especificar</option>
              </select>
            </div>
          </div>
          <div class="row g-2 align-items-center">
            <div class="col-auto">
              <label for="address" class="col-form-label">Dirección:</label>
            </div>
            <div class="col-auto">
              <input class="form-control" value={this.state.address} onChange={(e)=>this.update('address',e)}></input>
            </div>
          </div>
          <div class="row g-2 align-items-center">
            <div class="col-auto">
              <label for="email" class="col-form-label"> Correo:</label>
            </div>
            <div class="col-auto">
              <input value={this.state.email} class="form-control" onChange={(e)=>this.update('email',e)}></input>
            </div>
          </div>
          <div class="row g-2 align-items-center">
            <div class="col-auto">
              <label for="phone" class="col-form-label">Teléfono:</label>
            </div>
            <div class="col-auto">
              <input value={this.state.phone} class="form-control" onChange={(e)=>this.update('phone',e)}></input>
            </div>
          </div>
          <button type="submit" class="btn btn-primary">OK</button>
      </form>;
    }
}

export default Form;