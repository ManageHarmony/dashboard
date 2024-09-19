'use client';

import React, { useEffect, useState } from 'react';
import { Grid, Button, Menu, MenuItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList';
import IdCardIcon from '@mui/icons-material/Badge'; // Using Badge icon as an example for ID card
import StaffCard from './StaffCard'; // Adjust the path if needed
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Spinner } from 'react-bootstrap';

const buttonStyle = {
  background: "#fff",
  color: "#2C297E",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  transition: "background-color 0.3s, color 0.3s, border 0.3s"
};

const buttonHoverStyle = {
  background: "#2C297E",
  color: "white"
};

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

  const [anchorElOptions, setAnchorElOptions] = useState<null | HTMLElement>(null);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [anchorElView, setAnchorElView] = useState<null | HTMLElement>(null);
  const [staffData, setStaffData] = useState<any[]>([]);
  const [menuRole, setMenuRole] = useState<string | null>(null);
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

  const roleSetter = (role: string) => {
    setSelected(role);
    fetchData(role);

    if (role === 'Creator' || role === 'Manager') {
      setMenuRole(role);
    } else {
      setMenuRole(null);
    }

  };

  const handleOptionsMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElOptions(event.currentTarget);
  };

  const handleOptionsMenuClose = () => {
    setAnchorElOptions(null);
  };

  const handleViewMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElView(event.currentTarget);
  };

  const handleViewMenuClose = () => {
    setAnchorElView(null);
  };
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  if (!apiKey) {
    throw new Error('API key is missing.');
  }
  const handleMenuOptionClick = async (option: string, role: string | null) => {
    try {
      if (role === 'Manager') {
        const response = await fetch(`https://harmony-backend-z69j.onrender.com/api/admin/get/${option}/manager`, {
          method: "GET",headers:{'x-api-key':apiKey}

        });

        if (!response.ok) throw new Error(`Failed Updating ${option} Manager`);
        const data = await response.json();
        console.log("status data", data)
        setStaffData(data?.offManager || data?.data?.inactiveManger)
      } else if (role === 'Creator') {
        const response = await fetch(`https://harmony-backend-z69j.onrender.com/api/admin/get/${option}/creator`, {
          method: "GET",headers:{'x-api-key':apiKey}

        });

        if (!response.ok) throw new Error(`Failed Updating ${option} Creator`);
        const data = await response.json();
        console.log("status data", data)
        setStaffData(data?.data?.activeCreators || data?.data?.inactiveCreators || data?.data?.offCreators)
      }

    } catch (error) {
      console.error(`Failed to set as ${option}: `, error);
    }

    handleOptionsMenuClose();
  };

  const handleMouseEnter = (buttonType: string) => {
    setHoveredButton(buttonType);
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
  };

  const getButtonStyle = (buttonType: string) => {
    return hoveredButton === buttonType ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle;
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" role="statusCard">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <h4 className="mx-2">Loading..</h4>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px", padding: '10px 20px', width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          {(selected === 'Creator' || selected === 'Manager') && (
            <Button
              variant="contained"
              onClick={handleOptionsMenuClick}
              style={getButtonStyle("options")}
              onMouseEnter={() => handleMouseEnter("options")}
              onMouseLeave={handleMouseLeave}
            >
              Status
            </Button>
          )}
        </div>
        <div style={{ display: 'flex' }}>
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
              onClick={() => roleSetter('Creator')}
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
              onClick={() => roleSetter('All')}
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
              onClick={() => roleSetter('Manager')}
            >
              Managers
            </Button>




          </div>
          <Menu
            anchorEl={anchorElOptions}
            open={Boolean(anchorElOptions)}
            onClose={handleOptionsMenuClose}
          >
            <MenuItem onClick={() => handleMenuOptionClick('active', menuRole)}>Active</MenuItem>
            <MenuItem onClick={() => handleMenuOptionClick('inactive', menuRole)}>Inactive</MenuItem>
            <MenuItem onClick={() => handleMenuOptionClick('off', menuRole)}>Temporary Off</MenuItem>
          </Menu>
          <div>
            <Button
              variant="contained"
              startIcon={<IdCardIcon
                style={getButtonStyle("view")}
                onMouseEnter={() => handleMouseEnter("view")}
                onMouseLeave={handleMouseLeave}
                sx={{ color: '#2C297D' }}
              />}
              style={getButtonStyle("view")}
              onMouseEnter={() => handleMouseEnter("view")}
              onMouseLeave={handleMouseLeave}
              onClick={handleViewMenuClick}
            >
              View
            </Button>
            <DropdownMenu anchorEl={anchorElView} handleClose={handleViewMenuClose} />
          </div>
        </div>
      </div>
      <Grid container spacing={1}>
        {staffData.map((staff) => {
          const detailPath = `/admin/staff/cards/${staff.id}?role=${encodeURIComponent(staff.role || menuRole)}`;
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={staff.id} style={{ display: 'flex', justifyContent: 'center' }}>
              <Link href={detailPath} passHref>
                <div style={{ cursor: 'pointer' }}>
                  <StaffCard name={staff.name || staff.username} role={staff.role} imageUrl={staff.imageUrl} />
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
