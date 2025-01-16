import React, { useState } from 'react';
import { 
  Container, 
  Paper, 
  TextField, 
  Button, 
  Typography, 
  Box 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import Swal from 'sweetalert2';

const StyledPaper = styled(Paper)({
  padding: '2rem',
  maxWidth: '400px',
  margin: '2rem auto',
  borderRadius: '12px',
  boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
});

const ScrollableContainer = styled(Container)({
  maxWidth: '450px',
  height: '100vh',
  overflowY: 'auto',
  paddingTop: '20px',
  paddingBottom: '20px',
  scrollBehavior: 'smooth',
  '-ms-overflow-style': 'none',
  'scrollbar-width': 'none',
  '&::-webkit-scrollbar': {
    display: 'none'
    
  },
  marginTop:"65px"
});

const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
});

const SubmitButton = styled(Button)({
  padding: '0.8rem',
  fontSize: '1.1rem',
  fontWeight: 'bold',
});

function CreateProduct({ triggerRefresh }) {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    image: ''
  }); 

  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0])
  };

  const uploadImage = async () => {
    const data = new FormData();
    data.append("file", imageFile);
    data.append("upload_preset", "ml_default");
    data.append("cloud_name", "dcogh4ngq");

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dcogh4ngq/image/upload", {
        method: "post",
        body: data
      });
      const imageData = await response.json();
      return imageData.url;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = product.image;
      if (imageFile) {
        imageUrl = await uploadImage()
        console.log('Image uploaded:', imageUrl)
      }

      const response = await axios.post('http://localhost:3000/products/post', {
        ...product,
        image: imageUrl
      });

      if (response.status === 201) {
        Swal.fire({
          title: 'Success!',
          text: 'Product created successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        setProduct({
          name: '',
          description: '',
          price: '',
          stock: '',
          image: ''
        });
        setImageFile(null);
        triggerRefresh();
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.error || 'Something went wrong',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <ScrollableContainer>
      <StyledPaper elevation={3}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          Add New Phone
        </Typography>
        <StyledForm onSubmit={handleSubmit}>
          <TextField
            label="Phone Name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Description"
            name="description"
            value={product.description}
            onChange={handleChange}
            multiline
            rows={4}
            required
            fullWidth
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={product.price}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Stock"
            name="stock"
            type="number"
            value={product.stock}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Image URL"
            name="image"
            value={product.image}
            onChange={handleChange}
            fullWidth
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginBottom: '1rem' }}
          />
          {imageFile && (
            <Box mb={2}>
              <Typography variant="body2">Selected file: {imageFile.name}</Typography>
            </Box>
          )}
          <SubmitButton 
            type="submit" 
            variant="contained" 
            color="primary"
          >
            Create Product
          </SubmitButton>
        </StyledForm>
      </StyledPaper>
    </ScrollableContainer>
  );
}

export default CreateProduct; 