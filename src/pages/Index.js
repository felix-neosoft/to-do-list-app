import React, {useState} from 'react'
import { Grid, Typography, Fade, Paper, Button, Box } from '@mui/material'
import Login from '../components/Login'
import Register from '../components/Register'

export default function Index() {
  const [checked, setChecked] = useState(true)

  const handleChange = () => {
    setChecked((prev) => !prev)
  }
  const login = (
    <Paper elevation={6}>
      <Login change={handleChange}/>
    </Paper>
  )

  const register = (
    <Paper elevation={6}>
      <Register/>
    </Paper>
  )
  return (
    <div>
      <div className="index-heading">
        <Typography variant="h4" sx={{color:"white", pt:2, pl:5}}>To-Do App</Typography>
      </div>
      <div>
      <Grid container>
        <Grid sx={{mt:30}} item xs={6}>
          <div className="index-register-text">
          <Fade sx={{position:"absolute", width:500, ml:10}} in={!checked}>
            <Box>
              <Typography variant="h2">Already a User? Sign In</Typography>
              <Button onClick={handleChange} sx={{mt:2}} variant="outlined">Sign In</Button>
            </Box>
          </Fade>
          </div>
          <Fade sx={{position:"absolute", left:100}} in={checked}>{login}</Fade>
        </Grid>
        <Grid item xs={6}>
          <div className="index-register-text">
            <Fade sx={{position:"absolute", width:500, mt:35, ml:20}} in={checked}>
              <Box>
                <Typography variant="h2">Not a User? Sign Up</Typography>
                <Button onClick={handleChange} sx={{mt:2}} variant="outlined">Register</Button>
              </Box>
            </Fade>
            </div>
            <Fade sx={{position:"absolute", mt:10, width:900}} in={!checked}>{register}</Fade>`
        </Grid>
      </Grid>
      </div>
    </div>
  )
}

