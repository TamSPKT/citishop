import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { ExpandLessOutlined } from "@material-ui/icons";
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  toTop: {
    zIndex: 2,
    position: 'fixed',
    bottom: '20vh',
    backgroundColor: '#dcdcdc',
    color: 'black',
    "&:hover, &.Mui-focusVisible": {
      transition: '0.3s',
      color: '#397ba6',
      backgroundColor: '#dcdcdc'
    },
    right: '2%',
  }
}))

const Scroll = ({showBelow}) => {

  const classes = useStyles();
  const [show, setShow] = useState(showBelow? false : true);

  const handleScroll = () => {
    if (window.pageYOffset > showBelow) {
      if(!show) setShow(true);
    } else {
      if(show) setShow(false);
    }
  }

  const handleClick = () => {
    window[`scrollTo`]({ top: 0, behavior: `smooth` })
  }

  useEffect(() => {
    if (showBelow) {
      window.addEventListener(`scroll`, handleScroll)
      return () => window.removeEventListener(`scroll`, handleScroll)
    }
  })

  return (
    <div>
      {show &&
        <IconButton onClick={handleClick} className={classes.toTop}>
          <ExpandLessOutlined />
        </IconButton>
      }
    </div>
  )
}

export default Scroll

