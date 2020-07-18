import React, {Component} from 'react';
import {FormControlLabel, FormControl, FormLabel, RadioGroup, Radio} from "@material-ui/core"

export default class Filtering extends Component {
    constructor(props) {
        super(props)
        this.state = {
            perPage: 8,
        }
    }

    componentDidUpdate = () => {
        if (this.props.perPage !== this.state.perPage) this.setState({perPage: this.props.perPage})
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
