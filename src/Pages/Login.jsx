import React, { useState } from 'react'
import Layout from '../Common/Layout'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/Auth'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import ButtonLoader from '../Components/ButtonLoader';
import swal from 'sweetalert';

const defaultTheme = createTheme();

const Login = () => {
    const [auth, setAuth] = useAuth()
    const [isLoading, setIsLoading] = useState(false)
    const navigate=useNavigate()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm()

    const onSubmitLogin = async (data) => {
        setIsLoading(true)
        try {
            const loginData = {
                email: data.email,
                password: data.password
            }
            const response = await axios.post('https://studentblogapi.onrender.com/api/login', loginData)
            setAuth({
                ...auth,
                user: response?.data?.user,
                token: response?.data?.token
            })
            console.log(response?.data);
            toast.success(response?.data?.message);
            swal({
                icon: 'success',
                text: "You are successfully Logged in",
                buttons: false,
                timer: 5000
            })
            navigate ("/")
            localStorage.setItem("auth", JSON.stringify(response?.data));
            setIsLoading(false);
            
        } catch (error) {
            setIsLoading(false)
            console.log(error);
            toast.error(error?.message)
        }
    }

    // console.log(watch(["email", "password"]));

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
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit(onSubmitLogin)} noValidate sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    type='email'
                                    {...register("email", {
                                        required: true
                                    })}
                                />
                                {errors?.email?.type === "required" && <p>This field is required</p>}
                                
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    {...register("password", {
                                        required: true
                                    })}
                                />
                                {errors?.email?.type === "required" && <p>This field is required</p>}
                                
                                {/* <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                /> */}
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
                                            Sign In
                                        </Button>
                                }

                                <Grid container>
                                    <Grid item xs>
                                        {/* <Link to="" variant="body2">
                                            Forgot password?
                                        </Link> */}
                                    </Grid>
                                    <Grid item>
                                        <Link to="/registration" variant="body2">
                                            {"Don't have an account? Sign Up"}
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

export default Login