import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import {Card, CardMedia, FormControlLabel, FormLabel, Radio, RadioGroup} from '@material-ui/core'

const lastXDaysOptions = [ '3', '7', '30', '356' ]

class Top10 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            lastXDays: '3',
        }
    }

    componentDidMount() {
        this.fetchTopPosts()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.lastXDays !== this.state.lastXDays) this.fetchTopPosts()
    }

    fetchTopPosts = () => {
        fetch(`http://35.181.29.44:9000/api/posts/podium?lastXDays=${this.state.lastXDays}`, {
            method: 'GET',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJQbGFpeiIsInN1YiI6IjVjZmU0YzA2ZGU2OGJhNjg4MjY0NzVkMSIsImlhdCI6MTU5Mzg3MDIyNzUzMSwiZXhwIjoxNTkzOTU2NjI3NTMxfQ.T9I87aqed0Oy5ckgba0veV3NLnZeUzPpGAli_hqZW9k'
            }
        }).then(res => res.json()).then(result => {
            this.setState({ data: result.docs })
        })
        .catch(error => {
            console.warn('There was an error while trying to get podium posts: ', error)
        })
    }

    changeLastXDays = (ev) => {
        this.setState({ lastXDays: ev.target.value })
    }

    render() {
        return (
            <div>
                <RadioGroup row aria-label="Show top 10 from last x days: " name="Show top 10 from last x days: " value={this.state.lastXDays} onChange={this.changeLastXDays}>
                    <FormLabel component="legend">Show top 10 from last x days: </FormLabel>
                    { lastXDaysOptions.map(mode => <FormControlLabel value={mode} control={<Radio />} label={mode} />) }
                </RadioGroup>
                <div style={styles.container}>
                    {
                        this.state.data.map(post => <Link to={'/post/' + post.id || post._id}>
                            <Card key={post.id || post._id} style={styles.card} elevation={24}>
                                <CardMedia
                                    image={'http://35.181.29.44:9000/images/' + post.picture}
                                    title={post.description}
                                    style={styles.media}
                                />
                            </Card>
                        </Link>)
                    }
                </div>
            </div>

        );
    }
}

const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
    card: {
        width: 300,
        margin: 20,
        flexBasis: '20%'
    },
    media: {
        height: 400,
    },
}

const classStyles = () => ({
    colorPrimary: {
        backgroundColor: 'red',
    }
})

export default  withStyles(classStyles)(Top10);
