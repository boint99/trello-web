import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import DashboardIcon from '@mui/icons-material/Dashboard'
import { AddToDrive, VpnLock } from '@mui/icons-material'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import { Button, Tooltip } from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { capitalizeFirstLetter } from '~/utils/formatter'

const boardMenu = {
  color: 'white',
  bgcolor: 'transparent',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '.MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  }
}
function BoardBar({ board }) {

  return (
    <Box px={2} sx={{
      height: (theme) => theme.trelloCustom.boardBarHeight,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      overflowX: 'auto',
      borderBottom: '1px solid white',
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2')
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip
          icon={<DashboardIcon />}
          clickable
          label={board?.title}
          sx={boardMenu}
        />
        <Chip
          icon={<VpnLock />}
          label={capitalizeFirstLetter(board?.type)}
          clickable
          sx={boardMenu}
        />
        <Chip
          icon={<AddToDrive />}
          label="Add to Google Drive"
          clickable
          sx={boardMenu}
        />
        <Chip
          icon={<BoltIcon />}
          label="Automation"
          clickable
          sx={boardMenu}
        />
        <Chip
          icon={<FilterListIcon />}
          label="Filters"
          clickable
          sx={boardMenu}
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          variant='outlined'
          startIcon={<PersonAddIcon />}
          sx={{
            color: 'white',
            borderColor: 'white',
            '&Lhover': { borderColor: 'white' }
          }}
        >
            Invite</Button>
        <AvatarGroup
          max={4}
          sx={{
            gap: '10px',
            '& .MuiAvatar-root': {
              width: 30,
              height: 30,
              fontSize: 16,
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              '&:first-of-type': { bgcolor: '#a4b0be' }
            }
          }}
        >
          <Tooltip title= 'users'>
            <Avatar alt="users" src='https://binhminhdigital.com/StoreData/PageData/3429/Tim-hieu-ve-ban-quyen-hinh-anh%20(3).jpg' />
          </Tooltip>
          <Tooltip title= 'users'>
            <Avatar alt="users" src='https://binhminhdigital.com/StoreData/PageData/3429/Tim-hieu-ve-ban-quyen-hinh-anh%20(3).jpg' />
          </Tooltip>
          <Tooltip title= 'users'>
            <Avatar alt="users" src='https://binhminhdigital.com/StoreData/PageData/3429/Tim-hieu-ve-ban-quyen-hinh-anh%20(3).jpg' />
          </Tooltip>
          <Tooltip title= 'users'>
            <Avatar alt="users" src='https://binhminhdigital.com/StoreData/PageData/3429/Tim-hieu-ve-ban-quyen-hinh-anh%20(3).jpg' />
          </Tooltip>
          <Tooltip title= 'users'>
            <Avatar alt="users" src='https://binhminhdigital.com/StoreData/PageData/3429/Tim-hieu-ve-ban-quyen-hinh-anh%20(3).jpg' />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
