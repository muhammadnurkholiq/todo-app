import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Typography, IconButton, Button, Checkbox, TextField, Divider, Stack } from '@mui/material';
import { GetAllChecklistItem, CreateChecklistItem, DeleteChecklistItem, UpdateStatusChecklistItem, RenameChecklistItem } from '../../axios/todoApi';
import DeleteIcon from '@mui/icons-material/Delete';

const ChecklistItemPage = () => {
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState('');
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

  const handleAddItem = async () => {
    try {
      await CreateChecklistItem({ id_checklist: id, data: { itemName: newItemName } });
      const updatedResponse = await GetAllChecklistItem({ id_checklist: id });
      setItems(updatedResponse.data.data);
      setNewItemName('');
    } catch (error) {
      console.error('Error creating checklist item:', error);
      if (error.response && error.response.status === 401) {
        navigate('/');
      }
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await DeleteChecklistItem({ id_checklist: id, id_item: itemId });
      const updatedItems = items.filter((item) => item.id !== itemId);
      setItems(updatedItems);
    } catch (error) {
      console.error('Error deleting checklist item:', error);
      if (error.response && error.response.status === 401) {
        navigate('/');
      }
    }
  };

  const handleToggleStatus = async (itemId, status) => {
    try {
      await UpdateStatusChecklistItem({ id_checklist: id, id_item: itemId, data: { itemCompletionStatus: status } });
      const updatedItems = items.map((item) => {
        if (item.id === itemId) {
          return { ...item, itemCompletionStatus: status };
        }
        return item;
      });
      setItems(updatedItems);
    } catch (error) {
      console.error('Error updating checklist item status:', error);
      if (error.response && error.response.status === 401) {
        navigate('/');
      }
    }
  };

  const handleRenameItem = async (itemId, newName) => {
    try {
      await RenameChecklistItem({ id_checklist: id, id_item: itemId, data: { itemName: newName } });
      const updatedItems = items.map((item) => {
        if (item.id === itemId) {
          return { ...item, itemName: newName };
        }
        return item;
      });
      setItems(updatedItems);
    } catch (error) {
      console.error('Error renaming checklist item:', error);
      if (error.response && error.response.status === 401) {
        navigate('/');
      }
    }
  };

  return (
    <Container>
      <Typography variant="h3" textAlign="center" mb={2}>
        Checklist Items
      </Typography>
      <IconButton onClick={handleBack} sx={{ mb: 2 }}>
        Back
      </IconButton>
      <Stack gap={2}>
        {items.map((item) => (
          <Stack key={item.id} direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
            <TextField defaultValue={item.name} onChange={(e) => handleRenameItem(item.id, e.target.value)} fullWidth />
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
              <Checkbox checked={item.itemCompletionStatus} onChange={(e) => handleToggleStatus(item.id, e.target.checked)} />
              <IconButton onClick={() => handleDeleteItem(item.id)} aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </Stack>
          </Stack>
        ))}
        <Divider sx={{ my: 2 }} />
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
          <TextField value={newItemName} onChange={(e) => setNewItemName(e.target.value)} label="New Item Name" fullWidth />
          <Button onClick={handleAddItem} variant="contained" color="primary">
            Add
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default ChecklistItemPage;
