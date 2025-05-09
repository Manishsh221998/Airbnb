import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Avatar, 
  Tabs, 
  Tab, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Chip, 
  Divider, 
  Button,
  IconButton,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Star,
  Favorite,
  Share,
  Message,
  Settings,
  Home,
  Apartment,
  Hotel,
  Houseboat
} from '@mui/icons-material';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import LogoutIcon from '@mui/icons-material/Logout';
import LockResetIcon from '@mui/icons-material/LockReset';
import { useProfile } from '../../hooks/useUser';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [value, setValue] = useState(0);
  const [favorite, setFavorite] = useState(false);
  const navigate=useNavigate()

   const userValue=JSON.parse(localStorage.getItem("userData"))
// console.log("userValue",userValue)
  const logout = () => {
  try {
     navigate('/');
    window.localStorage.clear();
  } catch (error) {
    console.error('Navigation error:', error);
  }
};

  const{isPending, isSuccess, isError, error,data}=useProfile()
  // console.log("Profile Data :",data)
  const userData=data?.data?.data
  console.log(userData)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleFavorite = () => {
    setFavorite(!favorite);
  };

  // Sample data
  const user = {
    name: 'Alex Johnson',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    location: 'San Francisco, CA',
    joined: 'Joined in 2018',
    description: 'Superhost with 5 years of experience hosting on Airbnb. I love traveling and meeting new people from around the world.',
    rating: 4.92,
    reviews: 128,
    verified: true,
  };

  const listings = [
    {
      id: 1,
      title: 'Modern Loft in Downtown',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      type: 'Entire apartment',
      location: 'San Francisco',
      price: '$120/night',
      rating: 4.89,
      reviews: 56
    },
    {
      id: 2,
      title: 'Cozy Beachfront Cottage',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      type: 'Entire house',
      location: 'Malibu',
      price: '$210/night',
      rating: 4.95,
      reviews: 34
    },
    {
      id: 3,
      title: 'Luxury Penthouse with View',
      image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      type: 'Entire apartment',
      location: 'New York',
      price: '$350/night',
      rating: 4.98,
      reviews: 72
    },
  ];

  const reviews = [
    {
      id: 1,
      author: 'Sarah Miller',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      date: 'March 2023',
      rating: 5,
      text: 'Alex was a wonderful host! The place was exactly as described and in a perfect location.'
    },
    {
      id: 2,
      author: 'Michael Chen',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      date: 'February 2023',
      rating: 4,
      text: 'Great experience overall. The apartment was clean and had everything we needed.'
    }
  ];

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', p: isMobile ? 1 : 3 }}>
      {/* Header Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
       <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Profile
        </Typography>
      
        <IconButton>
          <Settings />
        </IconButton>
      </Box>

      {/* User Info Section */}
      <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 3, mb: 4 }}>
        <Avatar 
          src={`http://localhost:6001/${userData?.image}`} 
          sx={{ 
            width: isMobile ? 100 : 150, 
            height: isMobile ? 100 : 150,
            border: '3px solid white',
            boxShadow: 2
          }} 
        />
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
              {userData?.name}
            </Typography>
            {userData?.isVerified && (
              <Chip 
                label="Verified" 
                size="small" 
                color="warning" 
                sx={{ fontSize: '0.7rem', height: 20, boxShadow:2 }} 
              />
            )}
          </Box>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
            <EmailIcon sx={{fontSize:'19px',marginRight:"3px",marginBottom:'1px'}}/> Email | {userData?.email}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
             <Typography variant="body1">
            <CallIcon sx={{fontSize:'18px',marginRight:"3px",marginBottom:'1px'}}/>
              Contact | {userData?.phone}  
             </Typography>
          </Box>
         
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              variant="contained" 
              startIcon={<LogoutIcon />}
              sx={{ borderRadius: 2 ,bgcolor:'black'}}
              onClick={logout}
            >
               Logout
            </Button>
            <Button 
              variant="outlined" 
              color='light'
              startIcon={<LockResetIcon />}
              sx={{ borderRadius: 2 }}
            >
              Update Password
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Tabs Section */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={value} sx={{
    '& .MuiTabs-indicator': {
      backgroundColor: 'red', // Changes the underline color
    },
    '& .MuiTab-root': {
      color: 'black', // Changes the text color of inactive tabs
    },
    '& .Mui-selected': {
      color:'crimson', // Changes the text color of the selected tab
    },
    color:'crimson'
  }} onChange={handleChange} variant={isMobile ? 'scrollable' : 'fullWidth'}>
          <Tab label="Wishlist"  icon={isMobile ? <Home /> : null} />
          <Tab label="Bookings" icon={isMobile ? <Star /> : null} />
          {/* <Tab label="About" icon={isMobile ? <Apartment /> : null} /> */}
        </Tabs>
      </Box>

      {/* Tab Content */}
      <Box sx={{ pt: 2 }}>
        {value === 0 && (
          <Grid container spacing={3}>
            {listings.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={item.image}
                      alt={item.title}
                    />
                    <IconButton
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        color: favorite ? 'red' : 'white',
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        }
                      }}
                      onClick={handleFavorite}
                    >
                      <Favorite />
                    </IconButton>
                  </Box>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {item.title}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Star color="primary" fontSize="small" />
                        <Typography variant="body2">
                          {item.rating}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {item.type} · {item.location}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      {item.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {value === 1 && (
          <Box>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
              {reviews.length} Reviews
            </Typography>
            {reviews.map((review) => (
              <Box key={review.id} sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
                  <Avatar src={review.avatar} />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {review.author}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {review.date}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                  <Star color="primary" fontSize="small" />
                  <Typography variant="body2">
                    {review.rating}
                  </Typography>
                </Box>
                <Typography variant="body1">
                  {review.text}
                </Typography>
                <Divider sx={{ mt: 2 }} />
              </Box>
            ))}
          </Box>
        )}

        {value === 2 && (
          <Box>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              About {user.name}
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              {user.description}
            </Typography>
            
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Home color="primary" />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      During your stay
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      I'm available 24/7 for any questions or concerns
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Hotel color="primary" />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      Response time
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Within an hour
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Houseboat color="primary" />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      Languages
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      English, Spanish
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Identity verification
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Chip 
                label="Email" 
                color="success" 
                size="small" 
                sx={{ fontSize: '0.7rem' }} 
              />
              <Chip 
                label="Phone" 
                color="success" 
                size="small" 
                sx={{ fontSize: '0.7rem' }} 
              />
              <Chip 
                label="ID" 
                color="success" 
                size="small" 
                sx={{ fontSize: '0.7rem' }} 
              />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default UserProfile;