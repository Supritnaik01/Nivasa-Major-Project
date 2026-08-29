const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name:process.env.key_name,
    api_key:process.env.api_key,
    api_secret:process.env.api_secrete
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Nivasa',
    allowedFormats:["jpg","jpeg","png"] // supports promises as well
  },
});
module.exports={cloudinary,storage};