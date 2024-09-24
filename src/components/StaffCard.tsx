import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '15px',
  padding: "10px",
  margin: '10px',
  maxWidth: 300,
  width: '300px',   
  height: '350px',  
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  cursor: 'pointer',  
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const StaffCard: React.FC<{ name?: string; role: string; imageUrl?: string }> = ({ name = "Unknown", role, imageUrl }) => {
  const truncatedName = (name && typeof name === 'string' && name.length > 20) ? `${name.slice(0, 20)}...` : name || "Unknown";
  return (
    <StyledCard>
      <CardMedia
        style={{
          borderRadius: '10px',
          height: '250px',
          objectFit: 'cover',
        }}
        component="img"
        alt={name}
        image={imageUrl}
        title={name}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" sx={{ color: '#202020', fontWeight: 'bold', textAlign: "center" }}>
          {truncatedName}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p" sx={{ color: '#202020', textAlign: "center", fontSize: "0.9rem" }}>
          {role}
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

export default StaffCard;
