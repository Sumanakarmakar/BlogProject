import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/Auth'
import { toast } from 'react-toastify'
import { Avatar, Box, Grid, Modal, TextField, Typography } from '@mui/material'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useForm } from 'react-hook-form'
import axios from 'axios'
import ButtonLoader from '../Components/ButtonLoader'
import { deepPurple } from '@mui/material/colors';

const Navbar = () => {
    const [auth, setAuth] = useAuth()
    const [btnLoader, setBtnLoader] = useState(false)
    const nameIcon = auth?.user?.name.split("")
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm()

    const onSubmitPassword = async (data) => {
        setBtnLoader(true)
        try {
            const upData = {
                user_id: auth?.user?._id,
                password: data.password
            }
            const res = await axios.post('https://student-blog.onrender.com/api/update-password', upData, {
                headers: {
                    'x-access-token': auth?.token
                }
            })
            if (res?.data?.success) {
                toast.success(res?.data?.msg)
                setBtnLoader(false)
                navigate("/login")
            }

        } catch (error) {
            setBtnLoader(false)
            console.log(error);
            toast.error(error?.message)
        }
    }

    //for dashboard menu
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    //for update password modal
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [modalopen, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handlemodalClose = () => setOpen(false);

    //to handle log out button
    const handleLogOut = () => {
        setAuth({
            ...auth,
            user: null,
            token: ""
        })
        localStorage.removeItem('auth')
        toast.success("Successfully Logged Out")
    }
    return (
        <>

            {/* <!-- Topbar Start --> */}
            <div class="container-fluid bg-dark py-2 d-none d-md-flex">
                <div class="container">
                    <div class="d-flex justify-content-between topbar">
                        <div class="top-info">
                            <small class="me-3 text-white-50"><a href="#"><i class="fas fa-map-marker-alt me-2 text-secondary"></i></a>23 Ranking Street, New York</small>
                            <small class="me-3 text-white-50"><a href="#"><i class="fas fa-envelope me-2 text-secondary"></i></a>Email@Example.com</small>
                        </div>
                        <div id="note" class="text-secondary d-none d-xl-flex"><small>Note : We help you to Grow your Business</small></div>
                        <div class="top-link">
                            <a href="" class="bg-light nav-fill btn btn-sm-square rounded-circle"><i class="fab fa-facebook-f text-primary"></i></a>
                            <a href="" class="bg-light nav-fill btn btn-sm-square rounded-circle"><i class="fab fa-twitter text-primary"></i></a>
                            <a href="" class="bg-light nav-fill btn btn-sm-square rounded-circle"><i class="fab fa-instagram text-primary"></i></a>
                            <a href="" class="bg-light nav-fill btn btn-sm-square rounded-circle me-0"><i class="fab fa-linkedin-in text-primary"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Topbar End --> */}

            {/* <!-- Navbar Start --> */}
            <div class="container-fluid bg-primary">
                <div class="container">
                    <nav class="navbar navbar-dark navbar-expand-lg py-0">
                        <Link to="/" class="navbar-brand">
                            <h1 class="text-white fw-bold d-block">High<span class="text-secondary">Tech</span> </h1>
                        </Link>
                        <button type="button" class="navbar-toggler me-0" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse bg-transparent" id="navbarCollapse">
                            <div class="navbar-nav ms-auto mx-xl-auto p-0">
                                <Link to="/" class="nav-item nav-link active text-secondary">Home</Link>
                                {/* <Link to="/" class="nav-item nav-link">About</Link> */}
                                <Link to="/services" class="nav-item nav-link">Services</Link>
                                <Link to="/courses" class="nav-item nav-link">Courses</Link>
                                <Link to="/blog" class="nav-item nav-link">Our Blog</Link>
                                <div class="nav-item dropdown">
                                    <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
                                    <div class="dropdown-menu rounded">

                                        <Link to="/team" class="dropdown-item">Our Team</Link>
                                        <Link to="/testimonial" class="dropdown-item">Testimonial</Link>

                                    </div>
                                </div>
                                <Link to="/contact" class="nav-item nav-link">Contact</Link>
                                <Link to="/login"><button className='btn btn-success d-md-none d-sm-flex mb-3'>LOG IN</button> </Link>
                            </div>
                        </div>
                        <div class="d-none d-xl-flex flex-shirink-0">
                            <div id="phone-tada" class="d-flex align-items-center justify-content-center me-4">
                                <a href="" class="position-relative animated tada infinite">
                                    <i class="fa fa-phone-alt text-white fa-2x"></i>
                                    <div class="position-absolute" style={{ top: "-7px", left: "20px" }}>
                                        <span><i class="fa fa-comment-dots text-secondary"></i></span>
                                    </div>
                                </a>
                            </div>
                            <div class="d-flex flex-column pe-4 border-end">
                                <span class="text-white-50">Have any questions?</span>
                                <span class="text-secondary">Call: + 0123 456 7890</span>
                            </div>
                            <div class="d-flex align-items-center justify-content-center ms-4 ">
                                {/* <a href="#"><button className='btn btn-success'>REGISTER NOW</button> </a> */}
                                {!auth.user ?
                                    <Link to="/login"><button className='btn btn-success'>LOG IN</button> </Link>
                                    :
                                    (
                                        <>
                                            <Button
                                                id="basic-button"
                                                aria-controls={open ? 'basic-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                                onClick={handleClick}
                                            >
                                                <Avatar sx={{ bgcolor: deepPurple[300] }}>{nameIcon[0]}</Avatar>
                                            </Button>
                                            <Menu
                                                id="basic-menu"
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={handleClose}
                                                MenuListProps={{
                                                    'aria-labelledby': 'basic-button',
                                                }}
                                            >
                                                <MenuItem className='text-uppercase' onClick={handleClose}>{auth?.user?.name}</MenuItem>
                                                <MenuItem onClick={handleOpen}>Update Password</MenuItem>
                                                <Modal
                                                    open={modalopen}
                                                    onClose={handlemodalClose}
                                                    aria-labelledby="modal-modal-title"
                                                    aria-describedby="modal-modal-description"
                                                >
                                                    <Box sx={style}>
                                                        <Typography id="modal-modal-title" variant="h6" component="h2">
                                                            Update your Password
                                                        </Typography>
                                                        {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                                                        </Typography> */}
                                                        <Box id="modal-modal-description" component="form"
                                                            onSubmit={handleSubmit(onSubmitPassword)}
                                                            noValidate sx={{ mt: 1 }}>

                                                            <TextField
                                                                margin="normal"
                                                                required
                                                                fullWidth
                                                                label="New Password"
                                                                type="password"
                                                                {...register("password", {
                                                                    required: true
                                                                })}

                                                            />
                                                            {errors?.password?.type === "required" && <p>This field is Required</p>}
                                                            {
                                                                btnLoader ?
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
                                                                        Update Password
                                                                    </Button>
                                                            }

                                                            <Grid container>

                                                                <Grid item>
                                                                    <Link to="/login" variant="body2">
                                                                        {"Go back to Log In page"}
                                                                    </Link>
                                                                </Grid>
                                                            </Grid>
                                                        </Box>

                                                    </Box>
                                                </Modal>

                                            </Menu>
                                            <button className='btn btn-success' onClick={handleLogOut}><Link className='text-white' to="/login">LOG OUT</Link></button>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
            {/* <!-- Navbar End --> */}

        </>
    )
}

export default Navbar