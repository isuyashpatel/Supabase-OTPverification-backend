const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");
const validator = require('validator');
const app = express();
const PORT = process.env.PORT || 5000;

const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
  ],

  allowedHeaders: [
    'Content-Type',
  ],
};

app.use(cors(corsOpts));
const supabase = createClient(process.env.SUPABASE_URL, process.env.KEY);

// const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;

app.use(express.json());


app.get("/login-otp", async (req, res) => {
  console.log('called',req.body);
  const {email}=req.body.body
  
  if (validator.isEmail(email)) {
    try {
      await supabase.auth.signInWithOtp({
        email: email,
        options: {
          shouldCreateUser: true,
        },
      });
      res.status(200).json({status:9999})
    } catch (error) {
      res.status(500).json({ status:500 });
    }
  } else {
    res.status(400).json({status:400});
  }
 
});

app.get("/verify-login-otp", async (req, res) => {
  console.log('called');
  const {email,token}=req.body.body
  if (validator.isEmail(email)) {
    try {
    const {error}= await supabase.auth.verifyOtp({
        email,
        token: token,
        type: "email",
      });
      res.status(200).json(error===null)
    } catch (error) {
      console.log(error);
      res.status(500).json({ status:500 });
    }
  } else {
    res.status(400).json({status:400});
  }
});

// app.get("/logout", async (req, res) => {
//   const { error } = await supabase.auth.signOut();
// });

// // API endpoint to fetch images based on a predefined query
// app.get("/api/images", async (req, res) => {
//   try {
//     const response = await axios.get(
//       `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=yellow+flowers&image_type=photo`
//     );
//     res.json(response.data);
//   } catch (error) {
//     console.error("Error fetching images:", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.get("/api/images/:item", async (req, res) => {
//   const { item } = req.params;

//   try {
//     const response = await axios.get(
//       `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${item}&image_type=photo`
//     );
//     res.json(response.data);
//   } catch (error) {
//     console.error("Error fetching images:", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
