import React, { useState, useEffect } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Avatar,
  Chip,
  useTheme,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Grid,
  Slider,
  Stack,
  Collapse,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Person as PersonIcon,
  Work as WorkIcon,
  School as SchoolIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Business as BusinessIcon,
  AccessTime as TimeIcon,
  Verified as VerifiedIcon,
  MoreHoriz as MoreHorizIcon,
  BookmarkBorder as BookmarkIcon,
  Share as ShareIcon,
  FilterList as FilterIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';

function Dashboard() {
  const theme = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [filters, setFilters] = useState({
    skills: [],
    company: '',
    location: '',
    verificationType: '',
    duration: '',
    jobType: '',
    workMode: '',
    postingDays: 7,
    minApplicants: 0,
  });

  const [filteredJobs, setFilteredJobs] = useState([]);

  const [userInfo] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    education: 'Computer Science',
    avatar: 'https://via.placeholder.com/150',
  });

  const verificationTypes = {
    red: { label: 'Basic', color: '#ff4444' },
    silver: { label: 'Silver', color: '#C0C0C0' },
    blue: { label: 'Premium', color: '#0a66c2' },
    gold: { label: 'Elite', color: '#FFD700' },
  };

  const jobPostings = [
    {
      id: 1,
      company: 'Tech Corp',
      companyLogo: 'https://via.placeholder.com/40',
      position: 'Software Developer Intern',
      location: 'New York, NY',
      description: 'Looking for a motivated intern to join our development team. You will work on cutting-edge projects and learn from industry experts.',
      postedDate: '2 days ago',
      salary: '$25-30/hr',
      requirements: ['React', 'Node.js', 'JavaScript'],
      type: 'Full-time',
      verificationType: 'gold',
      applicants: 245,
      duration: '6 months',
      workMode: 'Hybrid',
    },
    {
      id: 2,
      company: 'Data Systems',
      companyLogo: 'https://via.placeholder.com/40',
      position: 'Data Science Intern',
      location: 'San Francisco, CA',
      description: 'Join our data science team to work on exciting projects involving machine learning and big data analytics.',
      postedDate: '1 day ago',
      salary: '$28-35/hr',
      requirements: ['Python', 'Machine Learning', 'SQL'],
      type: 'Part-time',
      verificationType: 'blue',
      applicants: 189,
      duration: '3 months',
      workMode: 'Remote',
    },
    {
      id: 3,
      company: 'Cloud Solutions',
      companyLogo: 'https://via.placeholder.com/40',
      position: 'Cloud Engineering Intern',
      location: 'Remote',
      description: 'Work with our cloud infrastructure team to help build and maintain scalable cloud solutions.',
      postedDate: '3 days ago',
      salary: '$30-35/hr',
      requirements: ['AWS', 'Docker', 'Kubernetes'],
      type: 'Full-time',
      verificationType: 'silver',
      applicants: 156,
      duration: '4 months',
      workMode: 'On-site',
    },
  ];

  useEffect(() => {
    const filtered = jobPostings.filter(job => {
      if (filters.skills.length > 0) {
        const hasRequiredSkills = filters.skills.every(skill =>
          job.requirements.some(req => req.toLowerCase().includes(skill.toLowerCase()))
        );
        if (!hasRequiredSkills) return false;
      }

      if (filters.company && !job.company.toLowerCase().includes(filters.company.toLowerCase())) {
        return false;
      }

      if (filters.location && !job.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }

      if (filters.verificationType && job.verificationType !== filters.verificationType) {
        return false;
      }

      if (filters.duration) {
        const jobDuration = parseInt(job.duration);
        if (jobDuration !== parseInt(filters.duration)) {
          return false;
        }
      }

      if (filters.jobType && job.type !== filters.jobType) {
        return false;
      }

      if (filters.workMode && job.workMode !== filters.workMode) {
        return false;
      }

      const postedDays = parseInt(job.postedDate);
      if (postedDays > filters.postingDays) {
        return false;
      }

      if (job.applicants < filters.minApplicants) {
        return false;
      }

      return true;
    });

    setFilteredJobs(filtered);
  }, [filters]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleApply = (jobId) => {
    console.log(`Applied to job ${jobId}`);
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getVerificationBadge = (type) => {
    const { color, label } = verificationTypes[type];
    return (
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 0.5,
        bgcolor: `${color}20`,
        px: 1,
        py: 0.5,
        borderRadius: 1
      }}>
        <VerifiedIcon sx={{ color, fontSize: 16 }} />
        <Typography variant="caption" sx={{ color, fontWeight: 600 }}>
          {label}
        </Typography>
      </Box>
    );
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      bgcolor: '#f8fafc', 
      minHeight: '100vh',
      backgroundImage: 'radial-gradient(at top right, #f0f4ff 0%, #ffffff 70%)'
    }}>
      {/* App Bar */}
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: 'white',
          color: 'text.primary',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          borderBottom: '1px solid rgba(0,0,0,0.08)'
        }}
      >
        <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleSidebar}
            sx={{ mr: 2, color: 'text.primary' }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ 
            fontWeight: 700,
            background: 'linear-gradient(90deg, #3f51b5 0%, #2196f3 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Student Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Mobile Sidebar */}
      <Drawer
        variant="temporary"
        open={sidebarOpen}
        onClose={toggleSidebar}
        sx={{
          width: 280,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 280,
            boxSizing: 'border-box',
            bgcolor: 'background.paper',
            boxShadow: '2px 0 20px rgba(0,0,0,0.05)'
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', p: 2 }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            mb: 2,
            p: 2,
            bgcolor: 'rgba(63, 81, 181, 0.05)',
            borderRadius: 2
          }}>
            <Avatar
              src={userInfo.avatar}
              sx={{ 
                width: 80, 
                height: 80, 
                mb: 1,
                border: '3px solid #e3f2fd'
              }}
            />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>{userInfo.name}</Typography>
          </Box>
          <Divider sx={{ my: 1 }} />
          <List>
            <ListItem sx={{ borderRadius: 1, '&:hover': { bgcolor: 'rgba(63, 81, 181, 0.05)' } }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <PersonIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary="Profile" 
                primaryTypographyProps={{ fontWeight: 500 }}
              />
            </ListItem>
            <ListItem sx={{ borderRadius: 1, '&:hover': { bgcolor: 'rgba(63, 81, 181, 0.05)' } }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <EmailIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary={userInfo.email} 
                primaryTypographyProps={{ 
                  variant: 'body2',
                  color: 'text.secondary'
                }}
              />
            </ListItem>
            <ListItem sx={{ borderRadius: 1, '&:hover': { bgcolor: 'rgba(63, 81, 181, 0.05)' } }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <SchoolIcon color="primary" />
              </ListItemIcon>
              <ListItemText 
                primary={userInfo.education} 
                primaryTypographyProps={{ 
                  variant: 'body2',
                  color: 'text.secondary'
                }}
              />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Filters Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: 320,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 320,
            boxSizing: 'border-box',
            borderRight: '1px solid rgba(0, 0, 0, 0.08)',
            bgcolor: 'background.paper',
            boxShadow: '2px 0 20px rgba(0,0,0,0.03)'
          },
        }}
      >
        <Toolbar />
        <Box sx={{ 
          overflow: 'auto', 
          p: 3,
          height: '100%',
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,0.1)',
            borderRadius: '3px',
          }
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 2,
            p: 1,
            bgcolor: 'rgba(63, 81, 181, 0.05)',
            borderRadius: 1
          }}>
            <FilterIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>Filters</Typography>
            <IconButton 
              onClick={() => setFiltersOpen(!filtersOpen)}
              sx={{ ml: 'auto' }}
              size="small"
            >
              <ExpandMoreIcon sx={{ 
                transform: filtersOpen ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.3s',
                color: 'text.secondary'
              }} />
            </IconButton>
          </Box>
          
          <Collapse in={filtersOpen}>
            <Stack spacing={2}>
              {/* Skills Filter */}
              <TextField
                fullWidth
                label="Skills"
                placeholder="React, Python, etc."
                value={filters.skills.join(', ')}
                onChange={(e) => handleFilterChange('skills', e.target.value.split(',').map(s => s.trim()))}
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    '&.Mui-focused fieldset': {
                      borderWidth: '1px'
                    },
                  },
                }}
              />

              {/* Company Filter */}
              <TextField
                fullWidth
                label="Company"
                value={filters.company}
                onChange={(e) => handleFilterChange('company', e.target.value)}
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    '&.Mui-focused fieldset': {
                      borderWidth: '1px'
                    },
                  },
                }}
              />

              {/* Location Filter */}
              <TextField
                fullWidth
                label="Location"
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    '&.Mui-focused fieldset': {
                      borderWidth: '1px'
                    },
                  },
                }}
              />

              {/* Verification Type Filter */}
              <FormControl fullWidth size="small">
                <InputLabel>Verification Type</InputLabel>
                <Select
                  value={filters.verificationType}
                  label="Verification Type"
                  onChange={(e) => handleFilterChange('verificationType', e.target.value)}
                  sx={{
                    borderRadius: '8px',
                  }}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="red">Basic</MenuItem>
                  <MenuItem value="silver">Silver</MenuItem>
                  <MenuItem value="blue">Premium</MenuItem>
                  <MenuItem value="gold">Elite</MenuItem>
                </Select>
              </FormControl>

              {/* Duration Filter */}
              <FormControl fullWidth size="small">
                <InputLabel>Duration</InputLabel>
                <Select
                  value={filters.duration}
                  label="Duration"
                  onChange={(e) => handleFilterChange('duration', e.target.value)}
                  sx={{
                    borderRadius: '8px',
                  }}
                >
                  <MenuItem value="">Any</MenuItem>
                  <MenuItem value="1">1 month</MenuItem>
                  <MenuItem value="2">2 months</MenuItem>
                  <MenuItem value="3">3 months</MenuItem>
                  <MenuItem value="6">6 months</MenuItem>
                </Select>
              </FormControl>

              {/* Job Type Filter */}
              <FormControl fullWidth size="small">
                <InputLabel>Job Type</InputLabel>
                <Select
                  value={filters.jobType}
                  label="Job Type"
                  onChange={(e) => handleFilterChange('jobType', e.target.value)}
                  sx={{
                    borderRadius: '8px',
                  }}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="Full-time">Full-time</MenuItem>
                  <MenuItem value="Part-time">Part-time</MenuItem>
                </Select>
              </FormControl>

              {/* Work Mode Filter */}
              <FormControl fullWidth size="small">
                <InputLabel>Work Mode</InputLabel>
                <Select
                  value={filters.workMode}
                  label="Work Mode"
                  onChange={(e) => handleFilterChange('workMode', e.target.value)}
                  sx={{
                    borderRadius: '8px',
                  }}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="Remote">Remote</MenuItem>
                  <MenuItem value="On-site">On-site</MenuItem>
                  <MenuItem value="Hybrid">Hybrid</MenuItem>
                </Select>
              </FormControl>

              {/* Posting Days Filter */}
              <Box sx={{ px: 1 }}>
                <Typography variant="body2" gutterBottom sx={{ fontWeight: 500 }}>
                  Posted within (days)
                </Typography>
                <Slider
                  value={filters.postingDays}
                  onChange={(e, value) => handleFilterChange('postingDays', value)}
                  min={1}
                  max={30}
                  valueLabelDisplay="auto"
                  sx={{
                    color: '#3f51b5',
                    '& .MuiSlider-valueLabel': {
                      backgroundColor: '#3f51b5',
                      borderRadius: 1,
                      fontSize: 12,
                    }
                  }}
                />
              </Box>

              {/* Min Applicants Filter */}
              <Box sx={{ px: 1 }}>
                <Typography variant="body2" gutterBottom sx={{ fontWeight: 500 }}>
                  Minimum Applicants
                </Typography>
                <Slider
                  value={filters.minApplicants}
                  onChange={(e, value) => handleFilterChange('minApplicants', value)}
                  min={0}
                  max={500}
                  step={10}
                  valueLabelDisplay="auto"
                  sx={{
                    color: '#3f51b5',
                    '& .MuiSlider-valueLabel': {
                      backgroundColor: '#3f51b5',
                      borderRadius: 1,
                      fontSize: 12,
                    }
                  }}
                />
              </Box>

              {/* Clear Filters Button */}
              <Button
                variant="outlined"
                onClick={() => setFilters({
                  skills: [],
                  company: '',
                  location: '',
                  verificationType: '',
                  duration: '',
                  jobType: '',
                  workMode: '',
                  postingDays: 7,
                  minApplicants: 0,
                })}
                sx={{ 
                  mt: 1,
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontWeight: 500,
                  borderWidth: '1.5px',
                  '&:hover': {
                    borderWidth: '1.5px'
                  }
                }}
              >
                Clear All Filters
              </Button>
            </Stack>
          </Collapse>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ 
        flexGrow: 1, 
        p: 3,
        bgcolor: '#f8fafc',
      }}>
        <Toolbar />
        <Box sx={{ 
          maxWidth: 800, 
          mx: 'auto',
          '&::-webkit-scrollbar': {
            height: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,0.1)',
            borderRadius: '3px',
          }
        }}>
          {filteredJobs.length === 0 ? (
            <Paper sx={{ 
              p: 4, 
              textAlign: 'center',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              bgcolor: 'background.paper'
            }}>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                No jobs match your current filters
              </Typography>
              <Button
                variant="outlined"
                onClick={() => setFilters({
                  skills: [],
                  company: '',
                  location: '',
                  verificationType: '',
                  duration: '',
                  jobType: '',
                  workMode: '',
                  postingDays: 7,
                  minApplicants: 0,
                })}
                sx={{ 
                  mt: 1,
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontWeight: 500
                }}
              >
                Clear Filters
              </Button>
            </Paper>
          ) : (
            filteredJobs.map((job) => (
              <Paper
                key={job.id}
                elevation={0}
                sx={{
                  mb: 3,
                  borderRadius: '12px',
                  overflow: 'hidden',
                  bgcolor: 'background.paper',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
                    transform: 'translateY(-2px)',
                    borderColor: 'rgba(63, 81, 181, 0.3)'
                  },
                }}
              >
                {/* Post Header */}
                <Box sx={{ 
                  p: 2, 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1.5,
                  borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
                }}>
                  <Avatar 
                    src={job.companyLogo} 
                    sx={{ 
                      width: 48, 
                      height: 48,
                      border: '1px solid rgba(0,0,0,0.08)'
                    }} 
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {job.company}
                      </Typography>
                      {getVerificationBadge(job.verificationType)}
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <TimeIcon fontSize="inherit" />
                      {job.postedDate} • {job.applicants} applicants
                    </Typography>
                  </Box>
                  <IconButton size="small" sx={{ color: 'text.secondary' }}>
                    <MoreHorizIcon />
                  </IconButton>
                </Box>

                {/* Post Content */}
                <Box sx={{ px: 2, pb: 2 }}>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 700,
                    mt: 1,
                    mb: 1.5,
                    background: 'linear-gradient(90deg, #3f51b5 0%, #2196f3 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    {job.position}
                  </Typography>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1, 
                    mb: 1.5,
                    flexWrap: 'wrap'
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <LocationIcon color="action" fontSize="small" />
                      <Typography variant="body2">{job.location}</Typography>
                    </Box>
                    <Chip
                      label={job.type}
                      size="small"
                      color="primary"
                      variant="outlined"
                      sx={{ 
                        fontWeight: 500,
                        borderWidth: '1.5px'
                      }}
                    />
                    <Chip
                      label={job.workMode}
                      size="small"
                      color="secondary"
                      variant="outlined"
                      sx={{ 
                        fontWeight: 500,
                        borderWidth: '1.5px'
                      }}
                    />
                    <Chip
                      label={job.duration}
                      size="small"
                      color="info"
                      variant="outlined"
                      sx={{ 
                        fontWeight: 500,
                        borderWidth: '1.5px'
                      }}
                    />
                  </Box>
                  <Typography variant="body1" sx={{ 
                    mb: 2,
                    color: 'text.secondary',
                    lineHeight: 1.6
                  }}>
                    {job.description}
                  </Typography>
                  <Box sx={{ 
                    display: 'flex', 
                    gap: 0.5, 
                    flexWrap: 'wrap', 
                    mb: 2 
                  }}>
                    {job.requirements.map((req, idx) => (
                      <Chip
                        key={idx}
                        label={req}
                        size="small"
                        sx={{
                          bgcolor: '#e3f2fd',
                          color: '#1565c0',
                          fontSize: '0.75rem',
                          fontWeight: 500,
                          height: '24px'
                        }}
                      />
                    ))}
                  </Box>
                  <Typography variant="subtitle2" sx={{ 
                    mb: 2,
                    fontWeight: 600,
                    color: '#2e7d32',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5
                  }}>
                    <BusinessIcon fontSize="small" />
                    {job.salary}
                  </Typography>

                  {/* Post Actions */}
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    pt: 2,
                    mt: 2,
                  }}>
                    <Button
                      variant="contained"
                      startIcon={<WorkIcon />}
                      onClick={() => handleApply(job.id)}
                      sx={{
                        flexGrow: 1,
                        textTransform: 'none',
                        borderRadius: '8px',
                        mr: 1,
                        fontWeight: 600,
                        py: 1,
                        background: 'linear-gradient(90deg, #3f51b5 0%, #2196f3 100%)',
                        boxShadow: 'none',
                        '&:hover': {
                          boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)',
                          background: 'linear-gradient(90deg, #3949ab 0%, #1e88e5 100%)'
                        }
                      }}
                    >
                      Apply Now
                    </Button>
                    <IconButton sx={{ 
                      color: 'text.secondary',
                      '&:hover': {
                        color: '#3f51b5',
                        bgcolor: 'rgba(63, 81, 181, 0.08)'
                      }
                    }}>
                      <BookmarkIcon />
                    </IconButton>
                    <IconButton sx={{ 
                      color: 'text.secondary',
                      '&:hover': {
                        color: '#3f51b5',
                        bgcolor: 'rgba(63, 81, 181, 0.08)'
                      }
                    }}>
                      <ShareIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Paper>
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;