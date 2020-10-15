import React from 'react';
import {
  withStyles,
  makeStyles,
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: '#ffffff90',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#ffffff90',
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: '#535274',
        },
        '& .MuiInput-underline:hover:before': {
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
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', position: 'relative' }}>
        <CssTextField
            id="custom-css-standard-input"
            label={props.label || "Search"}
            value={props.value}
            onChange={props.onChange}
            InputProps={{className:classes.input}}
            InputLabelProps={{className:classes.inputLabel}}
        />
        <SearchIcon className='pointerHover' style={{ color: '#ffffff90', position: 'absolute', right: '10px', fontSize: '1.5em' }}/>
      </div>
    );
  }
