import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import CloudinaryUploadWidget from "../CloudinaryUploadWidget";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

export default function UploadImage({ onImageChange }) {
  const [imageURLs, setImageURLs] = useState([]);
  const isMobile = useMediaQuery("(max-width:600px)");

  function handleOnUpload(error, result, widget) {
    if (error) {
      console.log(error);
      widget.close({ quiet: true });
      return;
    }
    swal("Success", "Media uploaded", "success");

    if (result.event === "success") {
      console.log("Uploaded to: ", result.info.secure_url);
      setImageURLs((prevURLs) => {
        const updatedURLs = [...prevURLs, result?.info?.secure_url];
        onImageChange(updatedURLs);
        return updatedURLs;
      });
    }
  }

  const handleRemoveImage = (urlToRemove) => {
    setImageURLs((currentImages) => {
      const updatedURLs = currentImages.filter((url) => url !== urlToRemove);
      onImageChange(updatedURLs);
      return updatedURLs;
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 2,
        mt: 3,
        width: "100%",
      }}
    >
      {imageURLs.map((url, index) => (
        <Box
          key={index}
          sx={{
            width: 164,
            height: 164,
            position: "relative",
            "&:hover": {
              "& .deleteIcon": {
                display: "flex",
              },
            },
          }}
        >
          <img
            src={`${url}?w=164&h=164&fit=crop&auto=format`}
            alt={`Uploaded image ${index + 1}`}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <Box
            className="deleteIcon"
            sx={{
              display: "none",
              position: "absolute",
              top: 0,
              right: 0,
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              borderRadius: "50%",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "rgba(200, 200, 200, 0.8)",
              },
            }}
            onClick={() => handleRemoveImage(url)}
          >
            <CloseIcon color="action" />
          </Box>
        </Box>
      ))}
      {imageURLs.length < 5 && (
        <CloudinaryUploadWidget
          onUpload={handleOnUpload}
          multiple={true}
          sources={["local", "camera"]}
          maxFiles={5 - imageURLs.length}
        >
          {({ open }) => (
            <Button
              variant="outlined"
              onClick={() => open()}
              sx={{
                height: 164,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#FAFFF4",
                border: "1px dashed #181B13",
                borderRadius: "10px",
                cursor: "pointer",
                "&:hover": {
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "#f0f0f0",
                },
                fontSize: "large", // for the text in the button, if any
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  color: "#767676",
                }}
              >
                <Typography variant="body2">
                  Insert Images here <br />
                  (max 5)
                </Typography>
                <AddIcon />
              </Box>
            </Button>
          )}
        </CloudinaryUploadWidget>
      )}
    </Box>
  );
}
