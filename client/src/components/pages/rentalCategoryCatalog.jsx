import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardMedia, CardContent, Rating, CircularProgress, Alert, Chip } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import axios from 'axios';

const RentalCategoryCatalog = () => {
  const { slug } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const condition = searchParams.get('condition') || 'new';
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryData, setCategoryData] = useState({
    category: {},
    products: [],
    condition: ''
  });

  useEffect(() => {
    const fetchRentalProducts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await axios.get(`http://localhost:3000/api/categories/getCategory/${slug}/rental?condition=${condition}`);
        setCategoryData(response.data.data);
      } catch (err) {
        console.error('Error fetching rental category products:', err);
        setError(err.response?.data?.message || 'Failed to fetch rental products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRentalProducts();
  }, [slug, condition]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {categoryData.category?.category_name || 'Category'} - {condition === 'new' ? 'New Rental Products' : 'Second Hand Rental Products'}
      </Typography>
      
      {categoryData.products?.length === 0 ? (
        <Alert severity="info">No rental products found in this category.</Alert>
      ) : (
        <Grid container spacing={3}>
          {categoryData.products?.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image || '/placeholder-image.jpg'}
                  alt={product.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h2" noWrap>
                    {product.title}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body1" color="text.primary">
                      ${product.price}
                    </Typography>
                    <Chip 
                      icon={<AccessTimeIcon />} 
                      label={product.rental_period || 'Per day'} 
                      size="small" 
                      color="primary" 
                      variant="outlined" 
                    />
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Rating value={parseFloat(product.avg_rating) || 0} precision={0.5} readOnly size="small" />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      ({product.review_count})
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default RentalCategoryCatalog;