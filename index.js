const express = require('express');
const axios = require('axios');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: [ 'http://localhost:3000','https://pixel-ui-beta.vercel.app/']
}));


const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;

app.use(express.json());

// API endpoint to fetch images based on a predefined query
app.get('/api/images', async (req, res) => {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=yellow+flowers&image_type=photo`
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching images:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/images/:item', async (req, res) => {
  const { item } = req.params;

  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${item}&image_type=photo`
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching images:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
