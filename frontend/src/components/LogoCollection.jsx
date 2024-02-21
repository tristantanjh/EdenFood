import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/system';

const darkLogos = [
  'https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708499988/nus_logo_full-vertical-removebg-preview_tjcseg.png',
  'https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708500846/icon512-180x180_p9hqd5.png',
  'https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708500266/refund-removebg-preview_qaln0z.png',
  'https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708500549/beans-removebg-preview_ydshkq.png',
  'https://res.cloudinary.com/dhdnzfgm8/image/upload/v1708501388/istockphoto-691338444-612x612-removebg-preview_ffo3vb.png',
];

const logoStyle = {
  width: '80px',
  height: '80px',
  margin: '0 32px',
};

export default function LogoCollection() {
  const theme = useTheme();
  const logos = darkLogos;

  return (
    <Box id="logoCollection" sx={{ py: 4, backgroundColor: "#FAFFF4" }}>
      <Typography
        component="p"
        variant="subtitle2"
        align="center"
        color="text.secondary"
        sx={{ mb: 3, opacity: 0.9, fontFamily: 'nunito, sans-serif' }}
      >
        Trusted by the best companies
      </Typography>
      <Grid container justifyContent="center" sx={{ mt: 0.5, opacity: 0.7 }}>
        {logos.map((logo, index) => (
          <Grid item key={index}>
            <img
              src={logo}
              alt={`Fake company number ${index + 1}`}
              style={index === 0 ? { ...logoStyle, width: '70px', height: '80px' } : logoStyle}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
