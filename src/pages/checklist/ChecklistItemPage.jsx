import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import { GetAllChecklistItem } from '../../axios/todoApi';

import Iconify from '../../components/Iconify';

const ChecklistItemPage = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetAllChecklistItem({ id_checklist: id });
        setItems(response.data.data);
      } catch (error) {
        console.error('Error fetching checklist items:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <Container>
      <Typography variant="h3" textAlign="center" mb={2}>
        Checklist Items
      </Typography>
      <IconButton onClick={handleBack} sx={{ mb: 2 }}>
        <Iconify icon="Iconify" />
      </IconButton>
      <List>
        {items.map((item) => (
          <ListItem key={item.id}>
            <ListItemText primary={item.name} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete">
                {/* Add your action button here */}
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ChecklistItemPage;
