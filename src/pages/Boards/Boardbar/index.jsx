import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import DashboardIcon from '@mui/icons-material/Dashboard'
import { AddToDrive, VpnLock } from '@mui/icons-material'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import { Button, Tooltip } from '@mui/material'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

const boardMenu = {
  color: 'primary.main',
  bgcolor: 'white',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '& .MuiSvgIcon-root': {
    color: 'primary.main'
  },
  '&:hover': {
    bgcolor: 'primary.50'
  }
}
function BoardBar() {
  return (
    <Box px={2} sx={{
      height: (theme) => theme.trelloCustom.boardBarHeight,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      overflowX: 'auto',
      borderTop: '1px solid #00bfa5',
      backgroundColor: '#fff'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip
          icon={<DashboardIcon />}
          label="Dashboard"
          clickable
          sx={boardMenu}
        />
        <Chip
          icon={<VpnLock />}
          label="Public/Private Workspace"
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
        <Button variant='outlined' startIcon={<PersonAddIcon />}>Invite</Button>
        <AvatarGroup
          max={4}
          sx={{
            '& .MuiAvatar-root': {
              width: 30,
              height: 30,
              fontSize: 16
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
