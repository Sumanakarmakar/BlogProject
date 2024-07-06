import React, { useState } from 'react'
import Layout from '../Common/Layout'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import ButtonLoader from '../Components/ButtonLoader';
import swal from 'sweetalert';


const defaultTheme = createTheme();

const Registration = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()

  const onSubmitRegister = async (data) => {
    setIsLoading(true)
    try {

      const regData = new FormData()
      regData.append("name", data.name)
      regData.append("email", data.email)
      regData.append("mobile", data.mobile)
      regData.append("password", data.password)
      regData.append("photo", document.getElementById('image').files[0])

      const resp = await axios.post('https://studentblogapi.onrender.com/api/register', regData)
      console.log(resp?.data);
      toast.success(resp?.data?.message)
      swal({
        icon: 'success',
        text: "User Registration Successful",
        buttons: false,
        timer: 4000
      })
      navigate('/login')
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error);
      toast.error(error?.message)
    }
  }

  console.log(watch(["name", "email", "mobile", "password", "photo"]));


  return (
    <>

      <Layout>
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: 8
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5"
                sx={{ color: '#4C0099', fontWeight: "bold" }}
                className='text-uppercase'
              >
                Sign up here
              </Typography>
              <Box component="form" onSubmit={handleSubmit(onSubmitRegister)} noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Name"

                      {...register("name", {
                        required: true
                      })}

                    />
                    {errors?.name?.type === "required" && <p>This field is Required</p>}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      type="email"
                      label="Email Address"

                      {...register("email", {
                        required: true,
                        pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                      })}

                    />
                    {errors?.email?.type === "required" && <p>This field is Required</p>}
                    {errors?.email?.type === "pattern" && <p>Invalid email format</p>}

                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Mobile No."

                      {...register("mobile", {
                        required: true,
                        maxLength: 10
                      })}


                    />
                    {errors?.mobile?.type === "required" && <p>This field is Required</p>}
                    {errors?.mobile?.type === "maxLength" && <p>Mobile no can't be exceeded 10 digits</p>}

                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Password"
                      type="password"

                      {...register("password", {
                        required: true,
                        minLength: 6
                      })}

                    />
                    {errors?.password?.type === "required" && <p>This field is Required</p>}
                    {errors?.password?.type === "minLength" && <p>Minimum password length is 6 characters</p>}

                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      type="file"
                      id='image'
                      name='image'
                      accept="image/*"
                      // onChange={e => setImage(e.target.files[0])}

                      {...register("photo", {
                        required: true
                      })}


                    />
                    {errors?.photo?.type === "required" && <p>This field is Required</p>}
                    {image != "" && image != undefined && image != null ? (
                      <img
                        src={URL.createObjectURL(image)}
                        alt=''
                        className='upload-img'
                        style={{ height: "180px" }}
                      />) :
                      (<>{image === "" && <p>Drag or drop content here</p>}</>)}
                  </Grid>
                </Grid>
                {
                  isLoading ?
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      <ButtonLoader />
                    </Button>
                    :
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign Up
                    </Button>
                }

                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link to="/login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>

          </Container>
        </ThemeProvider>
      </Layout>

    </>
  )
}

export default Registration