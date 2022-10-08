import * as React from 'react';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import { cyan, red } from '@mui/material/colors';

const Home = () => {

  const backgroundImage = "https://www.atptour.com/-/media/images/news/2022/09/23/01/05/big-four-laver-cup-2022-preview-practice.jpg";

  return (

    <div className="bg-image" style={{backgroundImage: `url(${backgroundImage})`, height: '100vh', width: '100vw', backgroundPosition: 'center', backgroundSize: 'cover'}} >

    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
      >

      <Grid item xs={6} sx={{pb: 2}}>
        <Typography variant="h4" color={cyan[200]} align="center">
          Click to Browse some of the
        </Typography>
        <Typography variant="h2" color={red[400]} align="center">
          <b>GREATEST</b>
        </Typography>
        <Typography variant="h4" color={cyan[200]} align="center">
          Tennis Matches!
        </Typography>
      </Grid>

      <Grid item xs={3}>
       <Button variant="contained" size="large" href='/home'>Enter Website</Button>
      </Grid>

    </Grid>
    </div>

  );
};


export default Home;
