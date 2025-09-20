import axios from 'axios'
import { API_ROOT } from '~/utils/contansts'

export const fetBoarDetailsAPI = async(boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  return response.data
}

export const updateBoardDetailsAPI = async(boardId, updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/boards/${boardId}`, updateData)
  return response.data
}

export const moveCardToDifferentColumnAPI = async(updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/boards/supports/moving_card`, updateData)
  return response.data
}


// Column
export const createNewColumnAPI = async(newColumn) => {
  const response = await axios.post(`${API_ROOT}/v1/columns`, newColumn )
  return response.data
}

export const updateColumnDetailsAPI = async(columnId, updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/columns/${columnId}`, updateData)
  return response.data
}


// card

export const createNewCardAPI = async(newCard) => {
  const response = await axios.post(`${API_ROOT}/v1/cards`, newCard)
  return response.data
}