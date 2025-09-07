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
  closestCorners,
  pointerWithin,
  rectIntersection,
  getFirstCollision
} from '@dnd-kit/core'
import { useCallback, useEffect, useRef, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumn/Column/Column'
import Card from './ListColumn/Column/ListCards/Card/Card'
import { cloneDeep, isEmpty } from 'lodash'
import { generatePlaceholdercard } from '~/utils/formatter'
// import { useRect } from '@dnd-kit/core/dist/hooks/utilities'

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
  const lastOverId = useRef(null)


  useEffect (() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  // tìm 1 cái column theo card id
  const findColumnbyCardId = (cardId) => {
    return orderedColumns.find(column => column?.cards?.map(card => card._id)?.includes(cardId))
  }

  const moveCardBetweenDifferenColums = (
    overColumn,
    activeColumn,
    overCardId,
    active,
    over,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {
    setOrderedColumns (prevColumns => {
      // Tìm vị trí (index) của cái overcard trong columm dích (nơi card sắp được thả)
      const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)

      let newCardIndex
      const isBelowOverItem = active.rect.current.translated &&
      active.rect.current.translated.top > over.rect.top + over.rect.height
      const modifiler = isBelowOverItem ? 1 : 0

      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifiler : overColumn?.cards?.length + 1

      // clone mảng setOrderedColumns cũ ra cái mới để sử ly data rồi return - cập nhật lại setOrderedColumns mới
      const nexColumns = cloneDeep(prevColumns)
      const nexActiveColumn = nexColumns.find(column => column._id === activeColumn._id)
      const nextOverColumn = nexColumns.find(column => column._id === overColumn._id)

      // column cũ
      if (nexActiveColumn) {
        nexActiveColumn.cards = nexActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)

        // thêm Placehodlder card nếu  Column rỗng
        if (isEmpty(nexActiveColumn.cards)) {
          console.log('card cuối cùng kéo đi')
          nexActiveColumn.card = [generatePlaceholdercard(nexActiveColumn)]
        }
        nexActiveColumn.cardOrderIds = nexActiveColumn.cards.map(card => card._id)

      }

      // column mới
      if (nextOverColumn) {
        // Kiểm tra card có tồn tại ở overcilumn chưa, nếu có thì cần xóa nó trước
        nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)

        // Nếu
        const rebuild_activeDraggingCardId = {
          ...activeDraggingCardData,
          columnId: nextOverColumn._id
        }
        // tiếp theo là thêm card kéo vào overColum theo vị trí index mới
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuild_activeDraggingCardId)

        //  xóa placehoder card
        nextOverColumn.cards = nextOverColumn.cards.filter(c => !c.FE_placehoderCard)
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
      }
      console.log('🚀 ~ moveCardBetweenDifferenColums ~ nextOverColumn:', nextOverColumn)
      return nexColumns
    })
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

  // Trigger trong quá trình kéo drag một phần tử
  const handleDragOver = (event) => {
    const { active, over } = event

    // Nếu không tồn active và over thì dừng lại
    if (!active || !over) return

    //  activeDraggingCard  là cáu card dang được kéo
    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
    const { id: overCardId } = over
    const activeColumn = findColumnbyCardId(activeDraggingCardId)
    const overColumn = findColumnbyCardId(overCardId)

    // Nếu không tồn tại 1 trong 2 thì ko làm gì hết
    if (!activeColumn || !overColumn) return

    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenDifferenColums (
        overColumn,
        activeColumn,
        overCardId,
        active,
        over,
        activeDraggingCardId,
        activeDraggingCardData
      )
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
      const activeColumn = findColumnbyCardId(activeDraggingCardId)
      const overColumn = findColumnbyCardId(overCardId)
      // Nếu không tồn tại 1 trong 2 thì ko làm gì hết
      if (!activeColumn || !overColumn) return

      // Hành động kéo thả card giữa 2 colum khác nhau
      // Phải dùng tới activeDragItemData.columId (set và state từ bước handleDragStart) chứ không phải
      // activeData trong scope handleDragend này sau khi đi qua unDragOver tới là state của card bị cập nhật 1 lần
      if (oldColumWhenDraggingCard._id !== overColumn._id) {

        moveCardBetweenDifferenColums (
          overColumn,
          activeColumn,
          overCardId,
          active,
          over,
          activeDraggingCardId,
          activeDraggingCardData
        )

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
          targetColumn.cardOrderIds = dndOrderedCards.map(card => card._id)

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

  const collisionDetectionStrategy = useCallback ((args) => {
    if (activeDrapItemType === activeDrapItemType.COLUMN) {
      return closestCorners({ ...args })
    }
    const pointerInterSections = pointerWithin(args)

    if (!pointerInterSections?.length) return

    // const intersection = !!(pointerInterSections?.length)
    //   ? pointerInterSections : rectIntersection(args)

    let overId = getFirstCollision(pointerInterSections, 'id')

    if (overId) {

      const checkColumn = orderedColumns.find(c => c._id === overId)
      if (checkColumn) {
        overId = closestCorners ({
          ...args,
          droppableContainers: args.droppableContainers.filter(container =>
            container.id !==overId && checkColumn?.cardOrderIds?.includes(container.id))
        })[0]?.id
      }
      lastOverId.current = overId
      return [{ id: overId }]
    }

    return lastOverId.current ? [{ id: lastOverId.current }] : []

  }, [activeDrapItemType, orderedColumns])

  return (
    <DndContext
      // collisionDetection={closestCorners}
      collisionDetection={collisionDetectionStrategy}

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
        <DragOverlay drop={dropAnmination}>
          {activeDrapItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && <Column column={activeDrapItemData} />}
          {activeDrapItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && <Card card={activeDrapItemData} />}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent