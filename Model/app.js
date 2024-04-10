const express = require("express");
const multer = require("multer");
const axios = require("axios");
const path = require("path");
const FormData = require('form-data');

const app = express();
const port = 3000;

// Set up EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files from the public directory
app.use(express.static("public"));

// Set up Multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Render the index page
app.get("/", (req, res) => {
  res.render("index", { result: null, error: null });
});

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    // Create a FormData object and append the image file
    const formData = new FormData();
    formData.append('image', req.file.buffer, { filename: 'image.jpg' });

    // Send the FormData to the Flask server
    const response = await axios.post('http://127.0.0.1:5000/predict', formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    // Render the result in the EJS template
    res.render('index', { error: null, result: response.data.result ,accuracy: response.data.accuracy});
  } catch (error) {
    console.error(error);
    res.render('index', { error: 'Error processing the image', result: null });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
