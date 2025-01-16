import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Paper, 
  TextField, 
  Button, 
  Typography, 
  Box,
  Grid,
  Dialog,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import Swal from 'sweetalert2';

const StyledPaper = styled(Paper)({
  padding: '2rem',
  margin: '2rem 0',
  borderRadius: '12px',
  boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-2px)',
  }
});

const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
});

const ActionButton = styled(Button)({
  margin: '0.5rem',
  textTransform: 'none',
  fontWeight: 'bold',
});

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: '#1976d2',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#1976d2',
    },
  },
});

const ScrollableContainer = styled('div')({
  height: 'calc(100vh - 70px)',
  overflowY: 'auto',
  marginTop: '70px',
  padding: '20px',
  scrollBehavior: 'smooth',
  '-ms-overflow-style': 'none',
  'scrollbar-width': 'none',
  '&::-webkit-scrollbar': {
    display: 'none'
  }
});

function ManageProducts({ triggerRefresh }) {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [localRefresh, setLocalRefresh] = useState(false);

  useEffect(() => {
    fetchProducts()
  }, [localRefresh])

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/products/getAll')
      setProducts(response.data);
    } catch (error){
      Swal.fire('Error', 'Failed to fetch products', 'error')
    }
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setDialogOpen(true)
  }

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:3000/products/${id}`)
        setLocalRefresh(prev => !prev)
        triggerRefresh()
        Swal.fire('Deleted!', 'Product has been deleted.', 'success')
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to delete product', 'error')
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/products/${editingProduct.id}`, editingProduct);
      setDialogOpen(false);
      setLocalRefresh(prev => !prev);
      triggerRefresh();
      Swal.fire('Success', 'Product updated successfully', 'success')
    } catch (error) {
      Swal.fire('Error', 'Failed to update product', 'error')
    }
  };

  return (
    <ScrollableContainer>
      <Container>
        <Typography variant="h4" sx={{ my: 4, fontWeight: 'bold', textAlign: 'center' }}>
          Manage Products
        </Typography>

        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} md={6} key={product.id}>
              <StyledPaper>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6">{product.name}</Typography>
                  <Box>
                    <IconButton color="primary" onClick={() => handleEdit(product)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(product.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Typography color="textSecondary">Price: ${product.price}</Typography>
                <Typography color="textSecondary">Stock: {product.stock}</Typography>
              </StyledPaper>
            </Grid>
          ))}
        </Grid>

        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
          <StyledPaper>
            <Typography variant="h5" gutterBottom>Edit Product</Typography>
            <StyledForm onSubmit={handleUpdate}>
              <StyledTextField
                label="Name"
                value={editingProduct?.name || ''}
                onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                fullWidth
                required
              />
              <StyledTextField
                label="Description"
                value={editingProduct?.description || ''}
                onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                multiline
                rows={4}
                fullWidth
              />
              <StyledTextField
                label="Price"
                type="number"
                value={editingProduct?.price || ''}
                onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})}
                fullWidth
                required
              />
              <StyledTextField
                label="Stock"
                type="number"
                value={editingProduct?.stock || ''}
                onChange={(e) => setEditingProduct({...editingProduct, stock: e.target.value})}
                fullWidth
                required
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                <ActionButton variant="outlined" onClick={() => setDialogOpen(false)}>
                  Cancel
                </ActionButton>
                <ActionButton variant="contained" type="submit">
                  Save Changes
                </ActionButton>
              </Box>
            </StyledForm>
          </StyledPaper>
        </Dialog>
      </Container>
    </ScrollableContainer>
  );
}

export default ManageProducts; 