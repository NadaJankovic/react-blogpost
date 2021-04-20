import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Link } from 'react-router-dom';
require('dotenv').config();

const options = [
  'Edit News',
  'Delete News'
]
const useStyles = makeStyles({
  link: {
    textDecoration: 'none',
    color: '#000'
  }
})
export default function ThreeDotMenu(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const onDeleteClick = () => {
    props.deleteNews(props.news._id)
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: '20ch',
          },
        }}
      >
        <div >
          <Link className={classes.link} to={{
            pathname: `${props.news._id}`,
            state: {
              targetedNews: props.news
            }
          }
          }  > <MenuItem>
              {options[0]}
            </MenuItem>
          </Link>
          <MenuItem onClick={() => onDeleteClick()}>
            {options[1]}
          </MenuItem>
        </div>
      </Menu>
    </div>
  );
}

