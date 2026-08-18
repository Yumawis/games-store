import { Box } from '@mui/material'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AppHeader from '../common/AppHeader'
import AddGameModal from '../modals/AddGameModal'

const MainLayout = () => {
  const [modalOpen, setModalOPen] = useState(false)

  const handleOpenModal = () => {
    setModalOPen(true)
  }

  const handleCloseModal = () => {
    setModalOPen(false)
  }

  return (
    <Box>
      <AppHeader onAddGame={handleOpenModal} />

      <Box p={3}>
        <Outlet />
      </Box>
      <AddGameModal open={modalOpen} handleClose={handleCloseModal} />
    </Box>
  )
}

export default MainLayout
