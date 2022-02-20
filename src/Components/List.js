import React, { useCallback } from "react";
import url from '../Var';
import 'bootstrap/dist/css/bootstrap.min.css';

class List extends React.Component {
    constructor(props){
        super(props);
        this.state={
            people:[]
        }
    }
    componentDidMount(){
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = ()=>{
            if(xhr.readyState == xhr.DONE)
                this.setState({people:JSON.parse(xhr.responseText)});
        }
        xhr.open('GET',url,true);
        xhr.send('');
    }
    render() {
      return <div>
          <h1> Registros</h1>
          <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">Nombre y Apellidos</th>
                    <th scope="col">Sexo</th>
                    <th scope="col">Dirección</th>
                    <th scope="col">Correo</th>
                    <th scope="col">Teléfono</th>
                </tr>
            </thead>
            <tbody>
                  {this.state.people.map((person)=>
                    
                    <tr key={person.primary_key}>
                        <td>{person.name}</td>
                        <td>{person.sex}</td>
                        <td>{person.address}</td>
                        <td>{person.email}</td>
                        <td>{person.phone}</td>
                    </tr>
                  )
                }
            </tbody>
          </table>
          <button onClick={()=>this.componentDidMount()} class="btn btn-primary">Mostrar</button>
      </div>;
    }
}

export default List;