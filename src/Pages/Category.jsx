import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Divider, List, ListItem, ListItemButton, ListItemText, Skeleton } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../Context/Auth';
import { useQuery } from '@tanstack/react-query';
import RecentPost from './RecentPost';
import { Link } from 'react-router-dom';

const Category = () => {
    const [auth] = useAuth()
    const [category, setCategory] = useState([])
    const token = auth?.token || JSON.parse(localStorage.getItem('auth')).token

    const getCategory = async () => {
        const response = await axios.get('https://studentblogapi.onrender.com/api/showallcategory', {
            headers: {
                'x-access-token': token
            }
        })
        setCategory(response?.data?.data)
    }

    useEffect(() => {
        getCategory()
    }, [])

    console.log(category)

    return (
        <>

            <Card sx={{ maxWidth: 345, marginLeft: "30px" }} className='mt-4'>
                <CardActionArea>
                    <CardContent sx={{
                        backgroundColor: "#000099", color: "white", textAlign: "center",
                    }}      >
                        <Typography gutterBottom variant="h4" component="div">
                            Category
                        </Typography>

                    </CardContent>
                </CardActionArea>
                {
                    category?.map((cat) => {
                        return (
                            <>
                                    <List>

                                        <ListItem>
                                            <Link to={`/category_post/${cat._id}`}><ListItemText primary={cat.category} /></Link>
                                        </ListItem>
                                        <Divider variant="middle" component="li" />


                                    </List>

                            </>
                        )
                    })
                }


            </Card>
        </>
    )
}

export default Category