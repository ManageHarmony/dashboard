'use client';

import React from 'react';
import { Grid, Button, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
import ViewListIcon from '@mui/icons-material/ViewList';
import IdCardIcon from '@mui/icons-material/Badge'; // Using Badge icon as an example for ID card
import StaffCard from './StaffCard'; // Adjust the path if needed
import { useRouter } from 'next/navigation';

const StyledButton = styled(Button)(({ theme }) => ({
  color: '#2C297D',
  borderColor: '#2C297D',
  marginRight: '10px',
}));

const DropdownMenu = ({ anchorEl, handleClose }: any) => {
  const router = useRouter(); // Ensure useRouter is used within the component

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={() => {
        handleClose();
        router.push('/manager/staff');
      }}>
        <ListItemIcon sx={{ color: '#2C297D' }}>
          <ViewListIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="View" sx={{ color: '#2C297D' }} />
      </MenuItem>
      <MenuItem>
        <ListItemIcon sx={{ color: '#2C297D' }}>
          <IdCardIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Cards" sx={{ color: '#2C297D' }} />
      </MenuItem>
    </Menu>
  );
};

const StaffCardView: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const router = useRouter(); // Correctly use useRouter here

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const staffData = [
    { name: 'Naseem Ahmad', role: 'Manager for Mental Psychology', imageUrl: '/assets/avatar.jpg' },
    { name: 'Shubham Solanki', role: 'Creator for Marketing', imageUrl: '/assets/avatar.jpg' },
    { name: 'Naseem Ahmad', role: 'Manager for Mental Psychology', imageUrl: '/assets/avatar.jpg' },
    { name: 'Shubham Solanki', role: 'Creator for Marketing', imageUrl: '/assets/avatar.jpg' },
    { name: 'Naseem Ahmad', role: 'Manager for Mental Psychology', imageUrl: '/assets/avatar.jpg' },
    { name: 'Shubham Solanki', role: 'Creator for Marketing', imageUrl: '/assets/avatar.jpg' },
    { name: 'Naseem Ahmad', role: 'Manager for Mental Psychology', imageUrl: '/assets/avatar.jpg' },
    { name: 'Shubham Solanki', role: 'Creator for Marketing', imageUrl: '/assets/avatar.jpg' },

    // Add more staff data as needed
  ];

  return (
    <div style={{ padding: '10px 10px', width: "100%" }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '15px' }}>
        <div style={{display: "flex"}}>
          <StyledButton variant="contained" className='bg-white mx-0'>Creators</StyledButton>
          <StyledButton variant="contained" className='mx-0 text-white' style={{backgroundColor: "#2C297D"}}>View All</StyledButton>
          <StyledButton variant="contained" className='bg-white '>Doctors</StyledButton>
        </div>
        <div>
          <Button
            variant="contained"
            startIcon={<IdCardIcon sx={{ color: '#2C297D' }} />}
            sx={{ color: '#2C297D', borderColor: '#2C297D', backgroundColor: "#fff" }}
            onClick={handleClick}
          >
            View
          </Button>
          <DropdownMenu anchorEl={anchorEl} handleClose={handleClose} />
        </div>
      </div>
      <Grid container spacing={1}>
        {staffData.map((staff, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index} style={{ display: 'flex', justifyContent: 'center' }}>
            <StaffCard name={staff.name} role={staff.role} imageUrl={staff.imageUrl} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default StaffCardView;
