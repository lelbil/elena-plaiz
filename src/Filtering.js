import React, {Component} from 'react';
import {FormControlLabel, FormControl, FormLabel, RadioGroup, Radio, Checkbox} from "@material-ui/core"

export default class Filtering extends Component {
    constructor(props) {
        super(props)
        this.state = {
            perPage: 20,
            shadowban: true,
            shadowbanF: true,
            juvenile: true,
            juvenileF: true,
            moodboard: false,
            moodboardF: true,
        }
    }

    componentDidUpdate = () => {
        if (this.props.perPage !== this.state.perPage) this.setState({perPage: this.props.perPage})
    }

    onChange = ev => {
        this.setState({ ...this.state, [ev.target.name]: ev.target.checked}, () => {
            this.props.changeFilters({
                shadowban: this.state.shadowban,
                shadowbanF: this.state.shadowbanF,
                juvenile: this.state.juvenile,
                juvenileF: this.state.juvenileF,
                moodboard: this.state.moodboard,
                moodboardF: this.state.moodboardF,
            })
        })
    }

    render() {
        return (
            <div style={styles.container}>
                <FormControl component="fieldset" row style={styles.group}>
                    <RadioGroup row
                                aria-label="Number of items per page"
                                name="perPage"
                                value={this.state.perPage}
                                onChange={this.props.changePerPage}
                    >
                        <FormLabel style={styles.filterLabel} component="legend">Items per page: </FormLabel>
                        <FormControlLabel value={20} control={<Radio />} label="20" />
                        <FormControlLabel value={50} control={<Radio />} label="50" />
                        <FormControlLabel value={100} control={<Radio />} label="100" />
                    </RadioGroup>
                    <FormControlLabel control={<Checkbox onChange={this.onChange} checked={this.state.shadowban} name={'shadowban'}/>} label="Shadowbanned" />
                    <FormControlLabel control={<Checkbox onChange={this.onChange} checked={this.state.shadowbanF} name={'shadowbanF'}/>} label="Not shadowbanned" />
                    <FormControlLabel control={<Checkbox onChange={this.onChange} checked={this.state.juvenile} name={'juvenile'}/>} label="Juvenile" />
                    <FormControlLabel control={<Checkbox onChange={this.onChange} checked={this.state.juvenileF} name={'juvenileF'}/>} label="Not Juvenile" />
                    <FormControlLabel control={<Checkbox onChange={this.onChange} checked={this.state.moodboardF} name={'moodboardF'}/>} label="Not Moodboard" />
                    <FormControlLabel control={<Checkbox onChange={this.onChange} checked={this.state.moodboard} name={'moodboard'}/>} label="Moodboard" />
                </FormControl>

            </div>
        );
    }
}

const styles = {
    container: {
        margin: 30,
        display: 'flex',
        justifyContent: 'space-between',
    },
    filterLabel: {
        marginTop: 'auto',
        marginBottom: 'auto',
        marginRight: 15,
    },
    group: {
        border: 'solid 1px brown',
        borderRadius: 10,
        padding: 3,
        backgroundColor: 'beige',
    }
}
