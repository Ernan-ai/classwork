import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Link } from 'react-router-dom';

interface DrawerRProps {
  items: { name: string; alpha3Code: string }[]; // Тип пропсов, которые ожидает компонент
}

const DrawerR = ({ items }: DrawerRProps) => {
  const [open, setOpen] = useState(true); // Управление состоянием Drawer

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Drawer open={open} onClose={toggleDrawer} variant="persistent" anchor="left">
      <Box
        sx={{
          width: 400,
          backgroundColor: '#2c3e50',
          color: '#ecf0f1',
          height: '100vh', 
          paddingTop: '20px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
          position: 'fixed', 
          top: 0,
          left: 0,
          zIndex: 1300, 
          
        }}
        role="presentation"
      >
        <Box sx={{ maxHeight: '100vh', overflowY: 'auto' }}> 
          <List>
            {items.map((country) => (
              <ListItem key={country.alpha3Code}>
                <Link
                  to={`/${country.alpha3Code}`}
                  style={{
                    textDecoration: 'none',
                    color: '#ecf0f1',
                    fontSize: '1.1rem',
                    display: 'block',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    transition: 'background-color 0.3s ease',
                  }}
                >
                  {country.name} ({country.alpha3Code})
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Drawer>
  );
};

export default DrawerR;
