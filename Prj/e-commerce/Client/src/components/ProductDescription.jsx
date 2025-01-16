import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Paper, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useCart } from './CartContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const StyledPaper = styled(Paper)({
  padding: '2rem',
  margin: '2rem 0',
  borderRadius: '12px',
  boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
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

function ProductDescription() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {addToCart} = useCart();
  const [product, setProduct] = useState(null);

  useEffect(()=>{
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error)
      }
    }
    fetchProduct()
  }, [id])

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <ScrollableContainer>
      <Container>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{ mb: 2 }}
        >
          Back to Products
        </Button>
        
        <StyledPaper>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
            <Box sx={{ flex: 1 }}>
              <img
                src={product.image || 'default-phone-image.jpg'}
                alt={product.name}
                style={{
                  width: '100%',
                  maxHeight: '400px',
                  objectFit: 'contain',
                }}
              />
            </Box>
            
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" gutterBottom>
                {product.name}
              </Typography>
              
              <Typography variant="h5" color="primary" gutterBottom>
                ${product.price}
              </Typography>
              
              <Typography variant="body1" paragraph>
                {product.description}
              </Typography>
              
              <Typography variant="subtitle1" gutterBottom>
                Stock: {product.stock} units
              </Typography>
              
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={()=> addToCart(product)}
                sx={{ mt: 2 }}
              >
                Add to Cart
              </Button>
            </Box>
          </Box>
        </StyledPaper>
      </Container>
    </ScrollableContainer>
  );
}

export default ProductDescription; 