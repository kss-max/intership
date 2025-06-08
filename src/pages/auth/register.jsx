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
  Grid,
  Fade,
  Zoom,
  Divider,
  InputAdornment,
  IconButton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { 
  Person as PersonIcon, 
  Business as BusinessIcon,
  Visibility,
  VisibilityOff,
  School as SchoolIcon,
  Work as WorkIcon,
  Email as EmailIcon,
  Lock as LockIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  width: '100%',
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)'
  },
  background: 'linear-gradient(to bottom right, #ffffff, #f5f7fa)',
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #3f51b5 30%, #2196f3 90%)',
  border: 0,
  borderRadius: '8px',
  color: 'white',
  height: 48,
  padding: '0 30px',
  boxShadow: '0 3px 5px 2px rgba(33, 150, 243, .2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 5px 10px 2px rgba(33, 150, 243, .3)',
  },
}));

const StyledTabs = styled(Tabs)({
  '& .MuiTabs-indicator': {
    height: 4,
    borderRadius: '2px 2px 0 0',
    background: 'linear-gradient(45deg, #3f51b5 30%, #2196f3 90%)',
  },
});

const StyledTab = styled(Tab)({
  fontSize: '0.875rem',
  fontWeight: 600,
  minWidth: 0,
  padding: '12px 16px',
  '&.Mui-selected': {
    color: '#3f51b5',
  },
});

function Register({ setIsAuthenticated, setUserType }) {
  const [activeTab, setActiveTab] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    education: '',
    major: '',
    companyName: '',
    industry: '',
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
    setUserType(activeTab === 0 ? 'student' : 'company');
    navigate(activeTab === 0 ? '/student' : '/company');
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
          background: 'radial-gradient(circle at 10% 20%, rgba(234, 249, 251, 0.5) 0%, rgba(239, 249, 251, 0.5) 90%)',
        }}
      >
        <Zoom in={true} style={{ transitionDelay: '100ms' }}>
          <StyledCard>
            <CardContent>
              <Typography 
                variant="h4" 
                align="center" 
                gutterBottom
                sx={{ 
                  fontWeight: 700,
                  color: 'primary.main',
                  mb: 3,
                  background: 'linear-gradient(45deg, #3f51b5 30%, #2196f3 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Create Your Account
              </Typography>
              
              <StyledTabs
                value={activeTab}
                onChange={handleTabChange}
                centered
                sx={{ mb: 3 }}
              >
                <StyledTab 
                  icon={<PersonIcon fontSize="small" />} 
                  iconPosition="start" 
                  label="Student" 
                />
                <StyledTab 
                  icon={<BusinessIcon fontSize="small" />} 
                  iconPosition="start" 
                  label="Company" 
                />
              </StyledTabs>
              
              <form onSubmit={handleSubmit}>
                <Fade in={true} timeout={500}>
                  <Grid container spacing={2}>
                    {activeTab === 0 ? (
                      <>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Full Name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            margin="normal"
                            required
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <PersonIcon color="action" />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            margin="normal"
                            required
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <EmailIcon color="action" />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Education Level"
                            name="education"
                            value={formData.education}
                            onChange={handleInputChange}
                            margin="normal"
                            required
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <SchoolIcon color="action" />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Major"
                            name="major"
                            value={formData.major}
                            onChange={handleInputChange}
                            margin="normal"
                            required
                          />
                        </Grid>
                      </>
                    ) : (
                      <>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Company Name"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            margin="normal"
                            required
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <BusinessIcon color="action" />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            margin="normal"
                            required
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <EmailIcon color="action" />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Industry"
                            name="industry"
                            value={formData.industry}
                            onChange={handleInputChange}
                            margin="normal"
                            required
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <WorkIcon color="action" />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                      </>
                    )}
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleInputChange}
                        margin="normal"
                        required
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockIcon color="action" />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                edge="end"
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Confirm Password"
                        name="confirmPassword"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        margin="normal"
                        required
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockIcon color="action" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                </Fade>

                <GradientButton
                  type="submit"
                  fullWidth
                  size="large"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Register Now
                </GradientButton>
              </form>

              <Divider sx={{ my: 2 }}>OR</Divider>

              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Already have an account?{' '}
                  <Button
                    color="primary"
                    onClick={() => navigate('/login')}
                    sx={{ 
                      textTransform: 'none',
                      fontWeight: 600,
                      '&:hover': {
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    Sign in here
                  </Button>
                </Typography>
              </Box>
            </CardContent>
          </StyledCard>
        </Zoom>
      </Box>
    </Container>
  );
}

export default Register;