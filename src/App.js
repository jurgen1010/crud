import { isEmpty } from "lodash";
import React, { useState } from "react"; 
import shortid from "shortid";
/* useState, me permitira alamacenar y modificar datos*/

function App() {
  
  const[task,setTask] = useState("") //Almacena la tarea agregada
  
  const[tasks,setTasks] = useState([])//Almacena un arreglo de tareas

  const addTask = (e) =>{
    //Validamos que el user haya ingreado algo en la tarea.
    e.preventDefault() //para evitar que nos recargue la pagina por el submit.
    if (isEmpty (task)) {
      console.log("Task empty")
      return //Para salir de la validacion
    }

    const newTask = { //Creo un objeto para guardar tareas con un id dinamico
      id : shortid.generate(),
      name : task
    }

    setTasks([...tasks, newTask])//Hacemos uso del Spread Operator para no solo guardar la ultima tarea sino tambien las anteriores
    
    setTask("") //Dejamos nuevamente la vble limpia para agregar una nueva

  }

  return (
    <div className="container mt-5">
      <h1>Tareas</h1>
      <hr />
      <div className="row ">
        <div className="col-8">
          <h4 className="text-center">Lista de Tareas</h4>
          <ul className="list-group">
            {
             tasks.map((task) => ( //Dentro de mi coleccion tasks, voy a iterar por medio de un objeto llamado task
               <li className="list-group-item" key = {task.id}>
                 <span className="lead">{task.name}</span>
                 <button className="btn- btn-danger btn-sm float-right mx-2">Eliminar</button>{/* mx es la manera de darle una margen horizontal de 2 px*/}
                 <button className="btn- btn-warning btn-sm float-right">Editar</button>
               </li>
             ))
            }
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">Formulario</h4>
          <form onSubmit = {addTask}>
            <input 
            type="text"
            className ="form-control mb-2" /* mb es un margin bottom para que el seiguiente boton no quede tan cerca */
            placeholder ="Ingrese la tarea ..." 
            onChange = {(text) => setTask(text.target.value)} /* Cuando ingrese algo en tarea vamos a guardar el texto a traves de setTask */
            value = {task} /**Asignaremos el valor de recuperandolo a traves de task*/
            />
            <button className= "btn btn-dark btn-block" type="submit">{/* btn-block para que se gaste todo el espacio disponible, propiedad nos deja enviar el form al accionar el button */}
              Agregar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
