import Box from '@mui/material/Box'
import Column from './Column/Column'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import { Button } from '@mui/material'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'

function ListColumn({ columns }) {

  return (
    <>
      <SortableContext
        items={columns?.map(c => c._id)}
        strategy={horizontalListSortingStrategy}>
        <Box sx={{
          bgcolor: 'inherit',
          width: '100%',
          height: '100%',
          overflowY: 'hidden',
          overflowX: 'auto',
          display: 'flex',
          '&::-webkit-scrollbar-thumb-track': {
            m: 2
          }

        }}>
          { columns?.map(column => <Column key={column._id} column={ column }/>)}
          {/* add new column */}
          <Box
            sx={{
              minWidth: '200px',
              maxWidth: '200px',
              mx:2,
              borderRadius: '6px',
              bgcolor: '#ffffff3d',
              height: 'fit-content'
            }}
          >
            <Button
              startIcon={<NoteAddIcon />}
              sx={{
                color: 'white',
                width: '100%',
                justifyContent: 'flex-start',
                pl: 2.5,
                py: 1
              }}>
                  Add new column
            </Button>
          </Box>
        </Box>
      </SortableContext>
    </>
  )
}

export default ListColumn