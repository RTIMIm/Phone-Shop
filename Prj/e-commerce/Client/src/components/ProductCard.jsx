import React from 'react';
import { Card, CardContent, CardActions, Button, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useCart } from '../components/CartContext';
import Swal from 'sweetalert2';
import {useNavigate} from 'react-router-dom';

const StyledCard = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '12px',
  border: '1px solid #e0e0e0',
  boxShadow: 'none',
  '&:hover': {
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
});

const StyledButton = styled(Button)({
  backgroundColor: '#1976d2',
  color: 'white',
  width: '100%',
  '&:hover': {
    backgroundColor: '#1565c0',
  },
});

function ProductCard({ product, fetchProducts }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    addToCart(product);
    await fetchProducts();
    Swal.fire({
      title: 'Success!',
      text: `${product.name} has been added to your cart`,
      icon: 'success',
      showConfirmButton: false,
      timer: 1500
    });
  };

  return (
    <StyledCard>
      <Box sx={{ p: 2, flex: 1 }}>
        <img
          src={product.image || 'default-phone-image.jpg'}
          alt={product.name}
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'contain',
            marginBottom: '1rem',
          }}
        />
        <CardContent sx={{ p: 0 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'medium' }}>
            {product.name}
          </Typography>
          <Typography variant="h6" color="primary" sx={{ mt: 1, fontWeight: 'bold' }}>
            ${product.price}
          </Typography>
        </CardContent>
      </Box>
      <CardActions sx={{ p: 2, pt: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <StyledButton onClick={handleAddToCart}>
          Add to Cart
        </StyledButton>
        <StyledButton 
          onClick={() => navigate(`/product/${product.id}`)}
          variant="outlined"
          sx={{
            backgroundColor: 'transparent',
            color: '#1976d2',
            '&:hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.04)',
            },
          }}
        >
          View Details
        </StyledButton>
      </CardActions>
    </StyledCard>
  );
}

export default ProductCard; 