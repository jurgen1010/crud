import { isEmpty, size } from "lodash";
import React, { useState } from "react"; 
import shortid from "shortid";
/* useState, me permitira alamacenar y modificar datos*/

function App() {
  
  const[task,setTask] = useState("") //Almacena la tarea agregada
  const[tasks,setTasks] = useState([])//Almacena un arreglo de tareas
  const[editMode, setEditMode] = useState(false) //Con el fin de cambiar el modo de edicion al presionar el boton editar, inicia en false ya que la pagina normalmente esta en modo creacion tareas
  const [id, setId] = useState("")// Con el fin de guardar el id de la tarea que estoy moficando 

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
  
  const saveTask = (e) =>{
    e.preventDefault() 
    if (isEmpty (task)) {
      console.log("Task empty")
      return 
    }
    
    /**
     * Me devuelve un item, sí el id del item que estamos editando,
     * es igual al que estoy editando, voy a reemplazar ese objeto con el mismo id,
     * pero en name reemplazo por lo que user haya escrito en el input, en caso contrario dejo el item como estaba
     */
    const editedTasks = tasks.map (item => item.id === id ? {id, name :task} : item)

    /** Finalmente almacenamos las tarea editada */
    setTasks(editedTasks) 

    /**
     * Limpiamos nuevamente los valores en caso 
     * de que se vaya a editar otra tarea tomes los nuevos valores
     */
    setEditMode(false)
    setTask("") 
    setId("")
  }

  const deleteTask = (id) => {
    const filteredTasks = tasks.filter(task => task.id !== id) //Filtramos nuestra coleccion de tareas para recuperarlas todas menos el id que estoy enviando
    setTasks(filteredTasks)
  }

  const editTask = (theTask)=>{
     setTask(theTask.name)
     setEditMode(true) //Al presionar el boton editar podremos el modo edicion en true
     setId(theTask.id) //Guardamos el id de dicha tarea
  }

  
  return (
    <div className="container mt-5">
      <h1>Tareas</h1>
      <hr />
      <div className="row ">
        <div className="col-8">
          <h4 className="text-center">Lista de Tareas</h4>
          {
            size(tasks) === 0 ? (
              <h5 className = "text-center">Aun no hay tareas programadas.</h5> //Operador ternario para mostrar mensaje cuando aun no se agg alguna tarea.
            ) : (
              <ul className="list-group">
              {
                tasks.map((task) => ( //Dentro de mi coleccion tasks, voy a iterar por medio de un objeto llamado task
                  <li className="list-group-item" key = {task.id}>
                    <span className="lead">{task.name}</span>
                    <button 
                      className="btn- btn-danger btn-sm float-right mx-2"//mx es la manera de darle una margen horizontal de 2 px
                      onClick = {()=> deleteTask(task.id)}
                    >
                      Eliminar
                    </button>
                    <button 
                      className="btn- btn-warning btn-sm float-right"
                      onClick = {()=> editTask(task)}
                    >
                      Editar
                    </button>
                  </li>
                ))
              }
              </ul>
            )
          }
        </div>
        <div className="col-4">
          <h4 className="text-center">
           { editMode ? "Modificar Tarea" : "Agregar Tarea"} {/*Con este operador cambiare el titulo del formario en caso que modoEdit sea true */}
          </h4> 
          <form onSubmit = {editMode ? saveTask : addTask }>
            <input 
            type="text"
            className ="form-control mb-2" /* mb es un margin bottom para que el seiguiente boton no quede tan cerca */
            placeholder ="Ingrese la tarea ..." 
            onChange = {(text) => setTask(text.target.value)} /* Cuando ingrese algo en tarea vamos a guardar el texto a traves de setTask */
            value = {task} /**Asignaremos el valor de recuperandolo a traves de task*/
            />
            <button className= {editMode ? "btn btn-warning btn-block" : "btn btn-dark btn-block"} 
            type="submit">{/* btn-block para que se gaste todo el espacio disponible, propiedad nos deja enviar el form al accionar el button */}
              {editMode ? "Guardar" : "Agregar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
