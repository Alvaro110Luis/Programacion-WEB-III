import axios from 'axios'

const API = 'http://localhost:3000/api/medicamento/'

export const getMedicamentos = async () => {
  try {
    const respuesta = await axios.get(API)
    return respuesta.data
  } catch (error) {
    console.error(error)
    return []
  }
}

export const AgregarMedicamento = async (medicamento) => {
  try {
    const respuesta = await axios.post(API, medicamento)
    console.log(respuesta)
    return respuesta.data
  } catch (error) {
    console.error(error)
  }
}

export const ActualizarMedicamentos = async (medicamento) => {
  try {
    const respuesta = await axios.put(`${API}${medicamento.id_medicamento}`, medicamento)
    return respuesta.data
  } catch (error) {
    console.error(error)
  }
}

export const EliminarMedicamento = async (id) => {
  try {
    const respuesta = await axios.delete(`${API}${id}`)
    return respuesta.data
  } catch (error) {
    console.error(error)
  }
}
