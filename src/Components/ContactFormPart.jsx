import React, { useState } from 'react'
import { Box, Typography, TextField, Button, Grid } from '@mui/material'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify'
import ButtonLoader from './ButtonLoader'

const ContactFormPart = () => {
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm()

    const onSubmitContactForm = async (data) => {
        setIsLoading(true)
        try {

            const upData = {
                name: data.name,
                email: data.email,
                phone: data.phone,
                message: data.message
            }
            const resp = await axios.post('https://restapinodejs.onrender.com/api/contact/create', upData)
            console.log(resp?.data);
            toast.success(resp?.data?.message)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.log(error);
            toast.error(error.message)
        }
    }

    // console.log(watch(["name","email","phone", "message"]));

    return (
        <>

            <div className='rounded contact-form p-5'>
                <Box component="form" onSubmit={handleSubmit(onSubmitContactForm)}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        className='bg-white rounded'
                        margin="normal"
                        required
                        fullWidth
                        label="Your Name"
                        type='text'
                        {...register("name", {
                            required: true
                        })}

                    />
                    {errors?.name?.type === "required" && <p>This field is required</p>}

                    <TextField
                        className='bg-white rounded'
                        margin="normal"
                        required
                        fullWidth
                        label="Your Email"
                        type='email'
                        {...register("email", {
                            required: true
                        })}

                    />
                    {errors?.email?.type === "required" && <p>This field is required</p>}

                    <TextField
                        className='bg-white rounded'
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Your Contact No"
                        type='text'
                        {...register("phone", {
                            required: true,
                            maxLength: 10
                        })}
                    />
                    {errors?.phone?.type === "required" && <p>This field is required</p>}
                    {errors?.phone?.type === "maxLength" && <p>Phone no cannot exceed 10 digits</p>}

                    <TextField
                        className='bg-white rounded'
                        margin="normal"
                        required
                        fullWidth
                        label="Your Message"
                        multiline
                        rows={6}
                        type='text'
                        {...register("message", {
                            required: true,
                            minLength: "15"
                        })}

                    />
                    {errors?.message?.type === "required" && <p>This field is required</p>}
                    {errors?.message?.type === "minLength" && <p>You have to write more than 15 words</p>}

                    {isLoading ?
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            <ButtonLoader />
                        </Button>
                        :
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            SEND MESSAGE
                        </Button>

                    }

                    {/* <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="#" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid> */}
                </Box>
            </div>

        </>
    )
}

export default ContactFormPart