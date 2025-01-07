import validator from 'validator';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import jwt from 'jsonwebtoken'

const addDoctor = async (req, res) => {
  try {
    const { name, email, password, speciality, degree, experience, about, fee, address } = req.body;
    const imageFile =  req.file;

    // console.log(imageFile)

      // console.log({ name, email, password, speciality, degree, experience, about, fee, address })
    // Check if all required fields are provided
    if (!name || !email || !password || !speciality || !degree || !experience || !about || !fee || !address) {
      // console.log({ name, email, password, speciality, degree, experience, about, fee, address })
      return res.status(400).json({
        message: 'Details missing ',
        success: false,
      });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: 'Please enter a valid email',
        success: false,
      });
    }

    // Validate password length
    if (password.length < 8) {
      return res.status(400).json({
        message: 'Password must be at least 8 characters long',
        success: false,
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Validate and upload image

    if (!imageFile || !imageFile.path) {
      return res.status(400).json({
        message: 'Image file is required',
        success: false,
      });
    }

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: 'image',
    });

    const imageUrl = imageUpload.secure_url;

    // Parse address
    let parsedAddress;
    try {
      parsedAddress = JSON.parse(address);
    } catch {
      return res.status(400).json({
        message: 'Invalid address format',
        success: false,
      });
    }

    // Prepare doctor data
    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fee,
      address: parsedAddress,
      date: Date.now(),
    };

    // Save new doctor to database
    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.status(200).json({
      message: 'Doctor added successfully',
      success: true,
    });

    console.log(newDoctor);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};


// admin login

const loginAdmin = async (req, res)=>{
  try {
    const {email, password} = req.body
    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
      const token = jwt.sign(email+password, process.env.JWT_SECRET)
      res.json({
        token,
        succes : true
      })
    }
    else {
      res.json({
        message: 'enter the correct email or password',
        succes: false
      })
    }

    
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
}

export { addDoctor, loginAdmin };
