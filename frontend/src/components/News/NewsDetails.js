import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CardContent, CardActions, CardMedia, Card, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './NewsDetails.css'
import axios from 'axios';
import waves from '../images/waves.jpg';
require('dotenv').config();

const useStyles = makeStyles({
    container: {
        marginTop: '50px',
        minHeight: '60vh',
        height: ' fit-content',
        width: '50vw',
        margin: 'auto',
    },
    media: {
        height:'30vh'
    },
    link: {
        textDecoration: 'none',
    }
})

export default function NewsDetails(props) {
    const classes = useStyles();
    const { history } = props;
    const [singleNews, setSingleNews] = useState([]);
    const url = process.env.REACT_APP_SERVER_API;

    const fetchSingleNews = async () => {
        const { match: { params } } = props;
        const response = await axios.get(`${url}${params.newsId}`);
        const data = response.data;
        setSingleNews([...singleNews,data])
    }
   
    useEffect(() => {
        fetchSingleNews();
    }, [])

    return (
        <>
            {singleNews.map(el =>
                <Card key={el._id} className={classes.container}>
                       <CardMedia className={classes.media}
                            component='img'
                            src={waves}
                        />
                    <CardContent >
                        <Typography gutterBottom variant="h5" align='center' color='primary'>
                            {el.title}
                        </Typography>
                        <Typography variant="body2" align='center' color='textSecondary'>
                            {el.content}
                        </Typography>
                    </CardContent>
                    <CardActions >
                        <Link to='/home' className={classes.link} >
                            <Button size="small" variant='outlined'>
                                Go Back
                            </Button>
                        </Link>
                    </CardActions>
                </Card>
            )}
        </>
    )
}


