import React, { useState, useEffect } from "react"; 
import { isEmpty, size } from "lodash";
import { addDocument, deleteDocument, getCollection, updateDocument } from "./actions";

function App() {
  /** Parecido al concepto de encapsulamiento useState*/

  const[task,setTask] = useState("") //Almacena la tarea agregada
  const[tasks,setTasks] = useState([])//Almacena un arreglo de tareas
  const[editMode, setEditMode] = useState(false) //Con el fin de cambiar el modo de edicion al presionar el boton editar, inicia en false ya que la pagina normalmente esta en modo creacion tareas
  const [id, setId] = useState("")// Con el fin de guardar el id de la tarea que estoy moficando 
  const [error, setError] = useState(null)

  /**
   * Este metodo se ejecutara cuando la pagina cargue,
   * sera un metodo asincrono, es decir se ejecutara asi mismo(autoejecutable)
   * Finalmente consumimos nuestra getCollection 
   * ()() para que se ejecute automaticamente
   */
  useEffect(() => {
     (async ()=> {
       const result = await getCollection("tasks")
       if (result.statusResponse) {
         setTasks(result.data) //Para poder pintar las tareas que traemos desde nuestra db, result.data porque es alli donde guardamos el resultado
       }
     })() 
  }, [])
  
  const validForm = () =>{ //Metodo para validar que si se este enviando o editando una tarea
    let isValid = true
    setError(null) //Preguntar a profesor ya esta inicializado desde su declaracion

    if (isEmpty (task)) {
      setError("Debes ingresar una tarea.")
      isValid = false
    }
    return isValid
  }

  const addTask = async(e) =>{
    //Validamos que el user haya ingreado algo en la tarea.
    e.preventDefault() //para evitar que nos recargue la pagina por el submit.

    if (!validForm()) {
      return
    }
    
    /**Agregamos la tarea a nuestra db */
    const result = await addDocument("tasks", { name: task })
    if (!result.statusResponse) {
      setError(result.error)
      return
    }

    setTasks([...tasks, {id: result.data.id, name: task}])//Hacemos uso del Spread Operator para adicionar a las tareas creadas, la nueva tarea y poder mostrarlas en pantalla
    
    setTask("") //Dejamos nuevamente la vble limpia para agregar una nueva

  }
  
  const saveTask = async(e) =>{
    e.preventDefault() 

    if (!validForm()) {
      return
    }
    

    const result = await updateDocument("tasks", id, { name: task })
    if (!result.statusResponse) {
      setError(result.error)
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

  const deleteTask = async(id) => {

    /**Eliminamos la tarea en la db */
    const result = await deleteDocument("tasks", id)
    if (!result.statusResponse) {
      setError(result.error)
      return
    }

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
              <li className = "list-group-item">Aun no hay tareas programadas.</li> //Operador ternario para mostrar mensaje cuando aun no se agg alguna tarea.
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
            {
              error && <span className ="text-danger mb-2">{error}</span>
            }
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
