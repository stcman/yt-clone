import { useState, useEffect } from 'react';
import { Box, Stack, Typography } from '@mui/material'
import { Sidebar, Videos } from './';
import { fetchFromApi } from '../utils/fetchFromApi';

const Feed = () => {

  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);

  useEffect(()=> {
    fetchFromApi(`search?part=snippet&q=${selectedCategory}`)
      .then((data) => setVideos(data.items || []))
  }, [selectedCategory]);

  return (
    <Stack sx={{flexDirection: { sx: "column", md: "row" }}}>
      <Box sx={{height: { sx: 'auto', md: '92vh' }, borderRight: '1px solid #3d3d3d', px: {sx: 0, md: 2}}}>
        <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}></Sidebar>
        <Typography className="copyright" variant="body2" sx={{mt: 1.5, color: '#FFF'}}>
          Copyright 2024 SoleNucleus
        </Typography>
      </Box>

      <Box p={2} sx={{ overflow: 'auto', height: '90vh', flex: 2}}>
        <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: 'white' }}>
          {selectedCategory} Videos<span style={{color: '#F31503'}}>
          </span>

          <Videos videos={videos}/>
        </Typography>
      </Box>
    </Stack>
  )
}

export default Feed