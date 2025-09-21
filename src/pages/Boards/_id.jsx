import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './Boardbar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { useEffect, useState } from 'react'
import { mapOrder } from '~/utils/sorts'
import {
  fetBoarDetailsAPI,
  createNewCardAPI,
  createNewColumnAPI,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI,
  moveCardToDifferentColumnAPI,
  deleteColumnDetailAPI
} from '~/apis'
import { generatePlaceholdercard } from '~/utils/formatter'
import { isEmpty } from 'lodash'
import { Box } from '@mui/material'
import { toast } from 'react-toastify'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect (() => {
    // const boardId = board._id
    const boardId = '68cad82bd9b34d4fefe8e172'

    fetBoarDetailsAPI(boardId).then(board => {
      board.columns = mapOrder(board?.columns, board.columnOrderIds, '_id')

      // Nếu columns không tồn tại thì gán mảng rỗng
      board?.columns?.forEach(c => {
        if (isEmpty(c.cards)) {
          c.cards = [generatePlaceholdercard(c)]
          c.cardOrderIds = [generatePlaceholdercard(c)._id]
        } else {
          c.cards = mapOrder(c.cards, c.cardOrderIds, '_id')
        }
      })
      setBoard(board)
    })
  }, [])

  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id
    })

    createdColumn.cards = [generatePlaceholdercard(createdColumn)]
    createdColumn.cardOderIds = [generatePlaceholdercard(createdColumn)._id]

    const newBoard = {
      ...board
    }
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)
  }

  const createNewCard = async(createNewCard) => {
    const createdCard = await createNewCardAPI({
      ...createNewCard,
      boardId: board._id
    })

    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(c => c._id === createdCard.columnId)
    if (columnToUpdate) {
      if (columnToUpdate.cards.some(card => card.FE_placehoderCard)) {
        columnToUpdate.cards = [createdCard._id]
      } else {
        columnToUpdate.cards.push(createdCard)
        columnToUpdate.cardOrderIds.push(createdCard._id)
      }

    }

    setBoard(newBoard)
  }

  // func có nhiệm vụ
  const moveColumns = (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map((c => c._id))

    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    setBoard(newBoard)

    // gọi api update board
    updateBoardDetailsAPI (newBoard._id, { columnOrderIds : newBoard.columnOrderIds })
  }

  const moveCardInTheSameColumn = (dndOrderedCards, dndOrderedCardIds, columnId) => {
    const newBoard = { ...board }

    const columnToUpdate = newBoard.columns.find(c => c._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }
    setBoard(newBoard)

    updateColumnDetailsAPI(columnId, { cardOrderIds: dndOrderedCardIds })
  }

  const moveCardToDifferentColumn = (
    curentCardId,
    prevColumnId,
    nextColumnId,
    dndOrderedColumns
  ) => {

    const dndOrderedColumnsIds = dndOrderedColumns.map((c => c._id))
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    setBoard(newBoard)

    let prevCardOrderIds = dndOrderedColumns.find(c => c._id === prevColumnId)?.cardOrderIds || []

    if (prevCardOrderIds[0]?.includes('placeholder-card')) prevCardOrderIds = []

    // call api xử lý
    moveCardToDifferentColumnAPI({
      curentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds:  dndOrderedColumns.find(c => c._id === nextColumnId)?.cardOrderIds
    })
  }

  //  xl xóa 1 column và card
  const deleteColumnDetails = (columnId) => {
    console.log('🚀 ~ deleteColumnDetails ~ columnId:', columnId)
    // Update dữ liệu state
    const newBoard = { ...board }
    newBoard.columns = newBoard.columns.filter(c => c._id !== columnId)
    newBoard.columnOrderIds = newBoard.columnOrderIds.filter(_id => _id !== columnId)
    setBoard(newBoard)

    deleteColumnDetailAPI(columnId).then(res => {
      toast.success(res?.deleteResult)
    })
  }

  if (!board) {
    return (<Box>Loading...</Box>)
  }
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh', backgroundColor:'primary.main' }}>
      <AppBar />
      <BoardBar board= {board}/>
      <BoardContent
        board= {board}
        createNewColumn={createNewColumn}
        createNewCard = {createNewCard}
        moveColumns={moveColumns}
        moveCardInTheSameColumn={moveCardInTheSameColumn}
        moveCardToDifferentColumn = {moveCardToDifferentColumn}
        deleteColumnDetails = {deleteColumnDetails}
      />
    </Container>
  )
}

export default Board
