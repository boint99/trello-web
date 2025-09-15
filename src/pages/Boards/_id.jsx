import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './Boardbar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { mockData } from '~/apis/mock-data'
import { useEffect, useState } from 'react'
import { fetBoarDetails_API } from '~/apis'
import { set } from 'lodash'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect (() => {
    const boardId = '68c18e19bd3e01964bde2a74'
    fetBoarDetails_API(boardId).then(board => {
      setBoard(board)
    })
  }, [])
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh', backgroundColor:'primary.main' }}>
      <AppBar />
      <BoardBar board= { board?.board}/>
      <BoardContent board= { board?.board} />
    </Container>
  )
}

export default Board
