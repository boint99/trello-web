import Box from '@mui/material/Box'
import ListColumn from './ListColumn/ListColumn'
import { mapOrder } from '~/utils/sorts'
import { DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners
} from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumn/Column/Column'
import Card from './ListColumn/Column/ListCards/Card/Card'
import { clone, cloneDeep } from 'lodash'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board }) {

  // chuột di chuyển 10px thì even hoạt động
  const PointerSenser = useSensor(PointerSensor, {
    activationConstraint: { distance: 10 }
  })
  // const sensors = useSensors(PointerSenser)

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 10 }
  })

  // nhấn giữa 250 miligiay và dung sai của cảm ứng (dẽ là di chuyển /chênh lênh 5px) thì kích hoạt event
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 250, tolerance: 500 }
  })

  const [orderedColumns, setOrderedColumns] = useState([])
  const sensors = useSensors(mouseSensor, touchSensor )
  const [activeDrapItemId, setActiveDrapItemId] = useState(null)
  const [activeDrapItemType, setActiveDrapItemType] = useState(null)
  const [activeDrapItemData, setActiveDrapItemData] = useState(null)
  const [oldColumWhenDraggingCard, setOldColumWhenDraggingCard] = useState(null)


  useEffect (() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  // tìm 1 cái column theo card id
  const findColumnbyCardId = (cardId) => {
    return orderedColumns.find(column => column.cards.map(card => card._id)?.includes(cardId))
  }

  const handleDragStart = (event) => {
    console.log('🚀 ~ handleDragStart ~ event:', event)
    setActiveDrapItemId(event?.active?.id)
    setActiveDrapItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDrapItemData(event?.active?.data?.current)

    // Nếu keus card thì mới thực hiện sét giá trị
    if (event?.active?.data?.current?.columnId) {
      setOldColumWhenDraggingCard(findColumnbyCardId(event?.active?.id))
    }
  }

  const handleDragEnd = (event) => {
    console.log('Hành động kéo thả card - tạm thời không làm gì!')
    return
  }

  // Trigger trong quá trình kéo drag một phần tử
  const handleDragOver = (event) => {
    console.log('🚀 ~ handleDragOver ~ event:', event)
    const { active, over } = event

    // Nếu không tồn active và over thì dừng lại
    if (!active || !over) return


    // không làm gì thêm nếu đang kéo column


    //  activeDraggingCard  là cáu card dang được kéo
    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
    const { id: overCardId } = over
    const activeColum = findColumnbyCardId(activeDraggingCardId)
    const overColum = findColumnbyCardId(overCardId)
    // Nếu không tồn tại 1 trong 2 thì ko làm gì hết
    if (!activeColum || !overColum) return


    if (activeColum._id !== overColum._id) {
      console.log('code chạy')
      setOrderedColumns (prevColumn => {
        // Tìm vị trí (index) của cái overcard trong columm dích (nơi card sắp được thả)
        const overCardIndex = overColum?.cards?.findIndex(card => card._id === overCardId)

        let newCardIndex
        const isBelowOveritem = active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height
        const modifiler = isBelowOveritem ? 1 : 0
        newCardIndex = overCardIndex >= 0 ? overCardIndex + modifiler : overColum?.cards?.length + 1

        // clone mảng setOrderedColumns cũ ra cái mới để sử ly data rồi return - cập nhật lại setOrderedColumns mới
        const nexColum = clone(prevColumn)
        const nexActiveColumn = nexColum.find(column => column._id !== activeColum._id)
        const nextOverColumn = nexColum.find(column => column._id === overColum._id)

        // column cũ
        if (nexActiveColumn) {
          nexActiveColumn.cards = nexActiveColumn.cards.filter(card => card._id === activeDraggingCardId)
          nexActiveColumn.overCardIds = nexActiveColumn.cards.map(card => card._id)
        }
        // column cũ mới
        if (nextOverColumn) {
          // Kiểm tra card có tồn tại ở overcilumn chưa, nếu có thì cần xóa nó trước
          nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)

          // tiếp theo là thêm card kéo vào overColum theo vị trí index mới
          nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDraggingCardData)
          // cập nhật lại mảng OrderedColumns
          nextOverColumn.overCardIds = nextOverColumn.cards.map(card => card._id)
        }
        return [...prevColumn]
      })
    }

    // tìm 2 cái column theo id
  }
  const handleDraghEnd = (event) => {
    const { active, over } = event

    // Không tồn tại active hoăc over thì ko làm gì cả
    if (!over || !active) return

    //  xử lý kéo thả colum
    if (activeDrapItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      //  activeDraggingCard  là cáu card dang được kéo
      const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
      const { id: overCardId } = over
      const activeColum = findColumnbyCardId(activeDraggingCardId)
      const overColumn = findColumnbyCardId(overCardId)
      // Nếu không tồn tại 1 trong 2 thì ko làm gì hết
      if (!activeColum || !overColumn) return

      // Hành động kéo thả card giữa 2 colum khác nhau
      // Phải dùng tới activeDragItemData.columId (set và state từ bước handleDragStart) chứ không phải
      // activeData trong scope handleDragend này sau khi đi qua unDragOver tới là state của card bị cập nhật 1 lần
      if (oldColumWhenDraggingCard._id !== overColumn._id) {
        //
      } else {
        // Hành động kéo thả card trong cùng 1 column
        const oldCardIndex = oldColumWhenDraggingCard?.cards?.findIndex( c => c._id === activeDrapItemId)

        // lấy vị trí mới từ over
        const newCardIndex = overColumn?.cards?.findIndex( c => c._id === overCardId)

        const dndOrderedCards = arrayMove(oldColumWhenDraggingCard.cards, oldCardIndex, newCardIndex )
        setOrderedColumns (prevColumn => {
          const nexColums = cloneDeep(prevColumn)

          // Tim tới colum mà chúng ta đang thả
          const targetColumn = nexColums.find(c => c._id === overColumn._id)

          targetColumn.cards = dndOrderedCards
          targetColumn.cardOderIds = dndOrderedCards.map(card => card._id)

          return nexColums
        })
      }
    }

    //  xử lý kéo thả colum
    if (activeDrapItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== over.id) {
        // lấy vị trí cũ từ active
        const oldColumnIndex = orderedColumns.findIndex( c => c._id === active.id)

        // lấy vị trí mới từ over
        const newColumnIndex = orderedColumns.findIndex( c => c._id === over.id)

        const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex )
        // const dndOrderedColumnsIds = dndOrderedColumns.map((c => c._id))
        setOrderedColumns(dndOrderedColumns)
      }
    }

    setActiveDrapItemId (null)
    setActiveDrapItemType(null)
    setActiveDrapItemData(null)
    setOldColumWhenDraggingCard(null)
  }

  const dropAnmination = {
    sideEffects: defaultDropAnimationSideEffects ({
      styles: {
        active: {
          opacity: 0.5
        }
      }
    })
  }
  return (
    <DndContext
      collisionDetection={closestCorners}
      sensors = {sensors}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDraghEnd}
    >
      <Box sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        width: '100%',
        height: (theme) => theme.trelloCustom.boardContentHeight,
        display: 'flex',
        p: '10px 0'
      }}>
        <ListColumn columns = { orderedColumns }/>
        <DragOverlay drop = {dropAnmination}>
          {(!activeDrapItemType ) && null}
          {( activeDrapItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && <Column column={ activeDrapItemData } /> )}
          {( activeDrapItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && <Card card={ activeDrapItemData } /> )}

        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent