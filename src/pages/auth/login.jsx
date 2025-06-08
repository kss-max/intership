import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Tabs,
  Tab,
  Container,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Login({ setIsAuthenticated, setUserType }) {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAuthenticated(true);
    let route = '/student';
    switch (activeTab) {
      case 0:
        setUserType('student');
        route = '/student';
        break;
      case 1:
        setUserType('company');
        route = '/company';
        break;
      case 2:
        setUserType('college');
        route = '/college';
        break;
      default:
        setUserType('student');
    }
    navigate(route);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #6B8DD6 100%)',
          padding: '20px',
          backgroundSize: '400% 400%',
          animation: 'gradient 15s ease infinite',
          '@keyframes gradient': {
            '0%': {
              backgroundPosition: '0% 50%',
            },
            '50%': {
              backgroundPosition: '100% 50%',
            },
            '100%': {
              backgroundPosition: '0% 50%',
            },
          },
        }}
      >
        <Card 
          sx={{ 
            width: '100%',
            maxWidth: '450px',
            borderRadius: '16px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
            overflow: 'hidden',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            backdropFilter: 'blur(8px)',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.25)'
            }
          }}
        >
          <CardContent sx={{ padding: { xs: '30px', sm: '40px' } }}>
            <Typography 
              variant="h4" 
              align="center" 
              gutterBottom
              sx={{
                fontWeight: '700',
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '30px',
                fontSize: { xs: '1.8rem', sm: '2.125rem' }
              }}
            >
              Welcome Back
            </Typography>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              centered
              sx={{ 
                mb: 4,
                '& .MuiTabs-indicator': {
                  height: '4px',
                  borderRadius: '2px',
                  background: 'linear-gradient(45deg, #667eea, #764ba2)',
                }
              }}
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab 
                label="Student Login" 
                sx={{ 
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: '600',
                  minWidth: 'unset',
                  padding: '12px 16px',
                  color: activeTab === 0 ? '#667eea' : 'text.secondary'
                }} 
              />
              <Tab 
                label="Company Login" 
                sx={{ 
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: '600',
                  minWidth: 'unset',
                  padding: '12px 16px',
                  color: activeTab === 1 ? '#667eea' : 'text.secondary'
                }} 
              />
              <Tab 
                label="College Login" 
                sx={{ 
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: '600',
                  minWidth: 'unset',
                  padding: '12px 16px',
                  color: activeTab === 2 ? '#667eea' : 'text.secondary'
                }} 
              />
            </Tabs>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                margin="normal"
                required
                sx={{
                  marginBottom: '20px',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                    '& fieldset': {
                      borderColor: 'rgba(0, 0, 0, 0.1)',
                    },
                    '&:hover fieldset': {
                      borderColor: '#667eea',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#667eea',
                      borderWidth: '2px',
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#667eea',
                  }
                }}
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                margin="normal"
                required
                sx={{
                  marginBottom: '10px',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                    '& fieldset': {
                      borderColor: 'rgba(0, 0, 0, 0.1)',
                    },
                    '&:hover fieldset': {
                      borderColor: '#667eea',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#667eea',
                      borderWidth: '2px',
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#667eea',
                  }
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ 
                  mt: 3,
                  mb: 2,
                  padding: '14px',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  textTransform: 'none',
                  background: 'linear-gradient(45deg, #667eea, #764ba2)',
                  boxShadow: '0 4px 10px rgba(102, 126, 234, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #5a6fd1, #6a4299)',
                    boxShadow: '0 6px 15px rgba(102, 126, 234, 0.4)',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                Login
              </Button>
            </form>
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Don't have an account?{' '}
                <Button
                  onClick={() => navigate('/register')}
                  sx={{ 
                    textTransform: 'none',
                    fontWeight: '600',
                    padding: '0 4px',
                    minWidth: 'unset',
                    color: '#667eea',
                    '&:hover': {
                      backgroundColor: 'transparent',
                      textDecoration: 'underline',
                      color: '#764ba2'
                    }
                  }}
                >
                  Register here
                </Button>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default Login;