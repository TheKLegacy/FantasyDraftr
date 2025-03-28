import React, { useState } from 'react';
import { 
  Button, 
  Box,
  Stack
} from '@mui/material';
import LoginModal from './LoginModal';
import CreateUserModal from './CreateUserModal';

const ProfileIcon: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsCreateModalOpen(false);
  };

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
    setIsLoginModalOpen(false);
  };

  const handleCloseModals = () => {
    setIsLoginModalOpen(false);
    setIsCreateModalOpen(false);
  };

  return (
    <>
      <Box 
        sx={{
          position: 'fixed',
          top: 16,
          right: 16,
          zIndex: 1000,
        }}
      >
        <Stack 
          direction="row" 
          spacing={1}
        >
          <Button
            size="small"
            variant="outlined"
            color="primary"
            onClick={handleOpenLoginModal}
          >
            Sign In
          </Button>
          
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={handleOpenCreateModal}
          >
            Register
          </Button>
        </Stack>

        <LoginModal 
          open={isLoginModalOpen} 
          onClose={handleCloseModals} 
        />
        
        <CreateUserModal 
          open={isCreateModalOpen} 
          onClose={handleCloseModals} 
        />
      </Box>
    </>
  );
};

export default ProfileIcon;