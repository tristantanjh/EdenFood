import React, { Component } from "react";
import Button from "@mui/material/Button";
import UploadIcon from "@mui/icons-material/Upload";

class CloudinaryUploadWidget extends Component {
  componentDidMount() {
    const cloudName = "dhdnzfgm8";
    const uploadPreset = "eden_food";
    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
        cropping: true, //add a cropping step
        // multiple: true,
        showUploadMoreButton: false,
        maxFiles: 1,
        croppingAspectRatio: 1,
        // showAdvancedOptions: true,  //add advanced options (public_id and tag)
        // sources: [ "local", "url"], // restrict the upload sources to URL and local files
        multiple: false,  //restrict upload to a single file
        // folder: "user_images", //upload files to the specified folder
        // tags: ["users", "profile"], //add the given tags to the uploaded files
        // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
        // clientAllowedFormats: ["images"], //restrict uploading to image files only
        // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
        maxImageWidth: 150, //Scales the image before uploading
        minImageWidth: 150,
        maxImageHeight: 150,
        minImageHeight: 150,
        // theme: "purple", //change to a purple theme
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result);
          this.props.onUploadSuccess(result.info.secure_url);
        }
        
      }
    );
    document.getElementById("upload_widget").addEventListener(
      "click",
      (event) => {
        event.preventDefault();
        myWidget.open();
      },
      false
    );
  }

  render() {
    return (
      <Button
        id="upload_widget"
        className="cloudinary-button"
        variant="outlined"
        color="secondary"
        fullWidth
        endIcon={<UploadIcon />}
        size="large"
        sx={{
          textTransform: "none",
          "&:hover": {
            backgroundColor: "#FFFFFF", // Change background color on hover
          },
          fontFamily: "nunito, sans-serif"
        }}
        style={{
          color: "#181B13",
          borderColor: "#181B13",
          maxHeight: "40px",
          minWidth: "300px",
          minHeight: "35px",
          margin: "0.5rem 0rem",
          textTransform: "none",
        }}
      >
        Upload Profile Picture
      </Button>
    );
  }
}

export default CloudinaryUploadWidget;
