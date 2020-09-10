import React, { Component } from 'react';
import {
  fade,
  ThemeProvider,
  withStyles,
  makeStyles,
  createMuiTheme,
} from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { green, purple, pink } from '@material-ui/core/colors';

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: '#733689',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#733689',
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: '#535274',
        },
    },
  })(TextField);
  
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    input: {
        color: 'white',
        width: '40vw',
    },
    inputLabel:{
        color:'#535274',
    }
  }));
  
  export default function SearchBar(props) {
    const classes = useStyles();
  
    return (
        <CssTextField
            id="custom-css-standard-input"
            label={props.label || "Search"}
            value={props.value}
            onChange={props.onChange}
            InputProps={{className:classes.input}}
            InputLabelProps={{className:classes.inputLabel}}
        />
    );
  }