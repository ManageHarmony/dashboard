'use client';

import React, { useEffect, useState } from 'react';
import { Grid, Button, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList';
import IdCardIcon from '@mui/icons-material/Badge'; // Using Badge icon as an example for ID card
import StaffCard from './StaffCard'; // Adjust the path if needed
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Spinner } from 'react-bootstrap';


const DropdownMenu = ({ anchorEl, handleClose }: any) => {
  const router = useRouter(); 
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={() => {
        handleClose();
        router.push('/admin/staff');
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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [staffData, setStaffData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState('All');

  const fetchData = async (role?: string) => {
    setLoading(true);
    try {
      const response = await fetch('https://harmony-backend-z69j.onrender.com/api/admin/get/staff');
      const data = await response.json();

      if (data && data.staff) {
        const { creators, managers, doctors } = data.staff;

        // Combine all the staff data
        let combinedStaff = [
          ...creators.map((item: any) => ({
            id: item.id,
            name: item.username,
            role: 'Creator',
            imageUrl: "/assets/avatar.jpg",
          })),
          ...managers.map((item: any) => ({
            id: item.id,
            name: item.name,
            role: 'Manager',
            imageUrl: "/assets/avatar.jpg",
          })),
          ...doctors.map((item: any) => ({
            id: item.id,
            name: item.doctor_name,
            role: 'Doctor',
            imageUrl: "/assets/avatar.jpg",
          })),
        ];

        // Filter data based on the role passed to the function
        if (role && role !== 'All') {
          combinedStaff = combinedStaff.filter((staff) => staff.role === role);
        }

        setStaffData(combinedStaff);
      } else {
        console.error('Unexpected data structure:', data);
      }
    } catch (error) {
      console.error('Error fetching staff data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();  
  }, []);

  const handleFilter = (role: string) => {
    setSelected(role);
    fetchData(role);  
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <h4 className="mx-2">Loading..</h4>
      </div>
    );
  }

  return (
    <div style={{ padding: '10px 10px', width: "100%" }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '15px' }}>
        <div style={{
          display: "flex", marginRight: '10px', borderColor: '#2C297D',
        }}>
          <Button
            variant="contained"
            className='mx-0'
            style={{
              backgroundColor: selected === 'Creator' ? '#2C297D' : '#FFFFFF',
              color: selected === 'Creator' ? '#FFFFFF' : '#2C297D',
            }}
            onClick={() => handleFilter('Creator')}
          >
            Creators
          </Button>
          <Button
            variant="contained"
            className='mx-0'
            style={{
              backgroundColor: selected === 'All' ? '#2C297D' : '#FFFFFF',
              color: selected === 'All' ? '#FFFFFF' : '#2C297D',
            }}
            onClick={() => handleFilter('All')}
          >
            View All
          </Button>
          <Button
            variant="contained"
            className=''
            style={{
              backgroundColor: selected === 'Manager' ? '#2C297D' : '#FFFFFF',
              color: selected === 'Manager' ? '#FFFFFF' : '#2C297D',
            }}
            onClick={() => handleFilter('Manager')}
          >
            Managers
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            startIcon={<IdCardIcon sx={{ color: '#2C297D' }} />}
            sx={{ color: '#2C297D', borderColor: '#2C297D', backgroundColor: "#fff" }}
            onClick={(event) => setAnchorEl(event.currentTarget)}
          >
            View
          </Button>
          <DropdownMenu anchorEl={anchorEl} handleClose={() => setAnchorEl(null)} />
        </div>
      </div>
      <Grid container spacing={1}>
        {staffData.map((staff) => {
          const detailPath = `/admin/staff/cards/${staff.id}?role=${encodeURIComponent(staff.role)}`;
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={staff.id} style={{ display: 'flex', justifyContent: 'center' }}>
              <Link href={detailPath} passHref>
                <div style={{ cursor: 'pointer' }}>
                  <StaffCard name={staff.name} role={staff.role} imageUrl={staff.imageUrl} />
                </div>
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default StaffCardView;
