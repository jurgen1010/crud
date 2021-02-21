import { firebaseApp } from './firebase'
import firebase from 'firebase'
import 'firebase/firestore'

const db = firebase.firestore(firebaseApp)

export const getCollection = async(collection) => {
    const result = { statusResponse : false, data: null, error: null } 
     try {
        const data = await db.collection(collection).get()
        const arrayData  = data.docs.map(doc => ({id : doc.id, ...doc.data()})) //Usamos el spread operator para mostrar adicionalmente el id, ya que no se encuentre dentro de la prop data del doc.  
        result.statusResponse = true
        result.data = arrayData
     } catch (error) {
         result.error = error
     }

     return result
}

export const addDocument = async(collection, data) => {
    const result = { statusResponse : false, data: null, error: null } 
    try {
      const response = await db.collection(collection).add(data) //La forma en como le agregamos un dato a una coleccion
      result.data = {id : response.id}
      result.statusResponse = true
    } catch (error) {
        result.error = error
    }

    return result
}

export const getDocument = async(collection, id) => {
    const result = { statusResponse : false, data: null, error: null } 
    try {
        const response= await db.collection(collection).doc(id).get() //Como obtener un documento especifico de la base de datos 
        result.data = { id: response.id, ...response.data() } 
        result.statusResponse = true
    } catch (error) {
        result.error = error
    }
    return result
}
    
export const updateDocument = async(collection, id, data) => {
    const result = { statusResponse : false,  error: null } //Quitamos la data del objeto result ya que la actualizacion no nos devuelve la data
    try {
        await db.collection(collection).doc(id).update(data)
        result.statusResponse = true
    } catch (error) {
        result.error = error
    }
    return result
}

export const deleteDocument = async(collection, id) => {
    const result = { statusResponse : false,  error: null } 
    try {
        await db.collection(collection).doc(id).delete() //Eliminando el documento de la db
        result.statusResponse = true
    } catch (error) {
        result.error = error
    }
    return result
}