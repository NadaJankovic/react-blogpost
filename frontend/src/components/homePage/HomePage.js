import React, { useEffect, useState } from 'react';
import './HomePage.css';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card, CardActions, CardContent,
    CardMedia, Grid, Typography, Button
} from '@material-ui/core';
import axios from 'axios';
import waves from '../images/waves.jpg'
import ThreeDotMenu from '../News/ThreeDotMenu';
require('dotenv').config();


const useStyles = makeStyles({
    container: {
        marginTop: '50px',
        width: '80%',
        margin: 'auto'
    },
    media: {
        height: '20%'
    },
    link: {
        textDecoration: 'none'
    }
});


export default function HomePage(props) {

    const classes = useStyles();
    const url = process.env.REACT_APP_SERVER_API;
    const { history } = props;

    const [allNews, setAllNews] = useState([]);
    console.log(allNews)

    useEffect(() => {
        fetchAllNews();
    }, [])

    // fetch data from API
    const fetchAllNews = async () => {
        const response = await axios.get(url)
        const data = response.data;
        setAllNews(data.news)
    }
    const displaySingleNews = async (news) => {
        history.push( news._id);
    }
    const deleteNews= async (id) => {
        const response= await axios.delete(`${url}${id}`);
         const deletedNews= allNews.filter(el=>el._id !== id);
      setAllNews(deletedNews)
     }
    return (
        <>
            <Grid container spacing={2} className={classes.container} >
                {allNews.map(el =>
                    <Grid key={el._id} item xs={12} sm={6} md={4}  >
                        <Card >
                        <ThreeDotMenu  news= {el} allNews={allNews} deleteNews={deleteNews}></ThreeDotMenu>
                            <CardMedia className={classes.media}
                                component='img'
                                src={waves}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" color='primary'>
                                    {el.title}
                                </Typography>
                                <Typography variant='caption' color='textSecondary'>
                                    {el.content.slice(0, 160)}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary" variant='outlined' onClick={() => displaySingleNews(el)}>
                                    Learn More
                            </Button>
                            </CardActions>
                        </Card>
                    </Grid >
                )}
            </Grid>
        </>
    )
}



