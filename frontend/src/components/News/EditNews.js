import React, { useState, useEffect } from 'react';
import './AddNews.css';
import { makeStyles } from '@material-ui/core/styles';
import {
    TextField,
    Button,
    IconButton,
    Tooltip
} from '@material-ui/core'
import { PhotoCamera } from "@material-ui/icons";
import axios from 'axios';
require('dotenv').config();

const useStyles = makeStyles((theme) => ({

    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(3),
            width: '50vw',
            minWidth: 'max-content'
        },
    },
    imageUpload: {
        paddingLeft: '26px'
    },
    input: {
        display: 'none'
    }
}));

export default function EditNews(props) {
    const classes = useStyles();
    const { history } = props;
  
    const [news, setNews] = useState({
        title: '',
        content: '',
    });
    const [titleError, setTitleError] = useState({});
    const [contentError, setContentError] = useState({});
    const [selectedImage, setSelectedImage] = useState(null);
    const url = process.env.REACT_APP_SERVER_API;

    const handleChange = (event) => {
        setNews({ ...news, [event.target.name]: event.target.value });

    };
    const handleCapture = (event) => {
        setSelectedImage(event.target.files[0]);
    };
     
      const fetchSingleNews = async (id) => {
          if(id){
        const response=  await axios.get(`${url}${id}`);
        const data= response.data;
        setNews(data);
      }
    }
    useEffect (()=>{
        fetchSingleNews(props.location.state.targetedNews._id)
    },[])
    /*  useEffect(() => {
         setNews({ ...news, image: selectedImage });
     }, [selectedImage]) */

    const backToHomePage = () => {
        history.push('/home');
    }
    const validateInputs = () => {
        const titleError = {};
        const contentError = {};
        let isValid = true;
        if (news.title.trim().length === 0) {
            titleError.input = 'Please enter title';
            titleError.notValid = true;
            isValid = false;
        }
        if (news.content.trim().length === 0) {
            contentError.input = 'Please enter content';
            contentError.notValid = true;
            isValid = false;
        }
        setTitleError(titleError);
        setContentError(contentError);
        return isValid;
    };
    const edit_News = async (news) => {
           await axios.put(`${url}${news._id}`,news)
           backToHomePage();
    }
  
    const submitNews =  (e) => {
        e.preventDefault();
        const validate = validateInputs();
        if (validate) {
           edit_News(news) ;
        }

    }
    const cancelNews = () => {
        backToHomePage();
    }

    return (
        <div className='addNews-body' >
            <form className={classes.root} onSubmit={submitNews}  >
                <div className='addNews-inputs'>
                    <TextField id="filled-basic"
                        name='title'
                        label="Title"
                        value={news.title}
                        onChange={handleChange}
                        helperText={titleError.input}
                        error={titleError.notValid}
                        variant="filled" />

                    <TextField
                        name="content"
                        label="Content"
                        value={news.content}
                        onChange={handleChange}
                        helperText={contentError.input}
                        error={contentError.notValid}
                        multiline
                        rows={4}
                        variant="filled"
                    />
                    <  input
                        accept="image/jpeg"
                        id="faceImage"
                        type="file"
                        name='image'
                        onChange={handleCapture}
                        className={classes.input}
                    />
                    <Tooltip title="Select Image">
                        <label htmlFor="faceImage">
                            <IconButton
                                color="primary"
                                aria-label="upload picture"
                                component="span"
                                className={classes.imageUpload}
                            >
                                <PhotoCamera fontSize="large" />
                            </IconButton>
                        </label>
                    </Tooltip>
                    <label>{news.image ? news.image.name : "Select Image"}</label>
                    <div className='addNews-btns'>
                        <Button type='submit' variant="contained" color="primary" >
                            Add News
                  </Button>
                        <Button variant="contained" color="secondary" onClick={cancelNews}>
                            Cancel
                  </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

