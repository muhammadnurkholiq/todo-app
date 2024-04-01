import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
} from '@mui/material';
import { GetAllChecklist, CreateChecklist, DeleteChecklist } from '../../axios/todoApi';

const ChecklistPage = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [newChecklistName, setNewChecklistName] = useState('');
  const [selectedChecklistId, setSelectedChecklistId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetAllChecklist();
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching checklist data:', error);
        if (error.response && error.response.status === 401) {
          navigate('/');
        }
      }
    };

    fetchData();
  }, [navigate]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddChecklist = async () => {
    try {
      await CreateChecklist({ data: { name: newChecklistName } });
      const updatedResponse = await GetAllChecklist();
      setData(updatedResponse.data.data);
      handleClose();
    } catch (error) {
      console.error('Error creating checklist:', error);
      if (error.response && error.response.status === 401) {
        navigate('/');
      }
    }
  };

  const handleDeleteChecklist = async () => {
    try {
      await DeleteChecklist({ id: selectedChecklistId });
      const updatedResponse = await GetAllChecklist();
      setData(updatedResponse.data.data);
      handleCloseDeleteModal();
    } catch (error) {
      console.error('Error deleting checklist:', error);
      if (error.response && error.response.status === 401) {
        history.push('/');
      }
    }
  };

  const handleOpenDeleteModal = (id) => {
    setSelectedChecklistId(id);
    setOpenDelete(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedChecklistId(null);
    setOpenDelete(false);
  };

  return (
    <Container>
      <Grid container gap={3} pt={10}>
        <Grid item xs={12}>
          <Typography variant="h3" textAlign="center">
            Todo App
          </Typography>
        </Grid>
        <Grid item xs={12} textAlign="center">
          <Button variant="outlined" onClick={handleOpen}>
            Tambah
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {data?.map((item, key) => (
              <Grid item xs={6} sm={4} md={3} key={key}>
                <Card sx={{ boxShadow: 3, cursor: 'pointer' }}>
                  <CardContent>
                    <Stack spacing={2}>
                      <Typography variant="h5">{item.name}</Typography>
                      <Typography>Task: {item?.items?.length ? item?.items?.length : 0}</Typography>
                      <Chip
                        color={item?.checklistCompletionStatus ? 'success' : 'error'}
                        label={item?.checklistCompletionStatus ? 'Selesai' : 'Belum Selesai'}
                      />
                    </Stack>
                  </CardContent>
                  <CardActions>
                    <Stack direction="row" alignItems="center" justifyContent="center" spacing={2} sx={{ width: '100%' }}>
                      <Button variant="contained" color="info" onClick={() => navigate(`${item?.id}/items`)}>
                        Open
                      </Button>
                      <Button variant="contained" color="error" onClick={() => handleOpenDeleteModal(item.id)}>
                        Hapus
                      </Button>
                    </Stack>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Tambah Checklist</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="checklistName"
            label="Nama Checklist"
            type="text"
            fullWidth
            value={newChecklistName}
            onChange={(e) => setNewChecklistName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Batal</Button>
          <Button onClick={handleAddChecklist} variant="contained" color="primary">
            Tambah
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDelete} onClose={handleCloseDeleteModal}>
        <DialogTitle>Konfirmasi Hapus Checklist</DialogTitle>
        <DialogContent>
          <Typography>Apakah Anda yakin ingin menghapus checklist ini?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteModal}>Batal</Button>
          <Button onClick={handleDeleteChecklist} variant="contained" color="error">
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ChecklistPage;
