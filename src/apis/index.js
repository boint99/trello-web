import axios from 'axios'
import { API_ROOT } from '~/utils/contansts'

export const fetBoarDetails_API = async(boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  return response.data
}