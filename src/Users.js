import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import {Card, CardMedia, CardHeader, TextField} from '@material-ui/core'

class Users extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            searchQuery: '',
        }
    }

    componentDidMount() {
        this.getUsers()
    }

    getUsers = () => {
        fetch(`http://35.181.29.44:9000/api/users/search/${this.state.searchQuery}`, {
            method: 'GET',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJQbGFpeiIsInN1YiI6IjVjZmU0YzA2ZGU2OGJhNjg4MjY0NzVkMSIsImlhdCI6MTU5Mzg3MDIyNzUzMSwiZXhwIjoxNTkzOTU2NjI3NTMxfQ.T9I87aqed0Oy5ckgba0veV3NLnZeUzPpGAli_hqZW9k'
            }
        }).then(res => res.json()).then(users => {
            this.setState({ users })
        })
            .catch(error => {
                console.warn('There was an error while trying to get posts: ', error)
            })
    }

    onSearchChanged = ev => {
        const { value } = ev.target
        clearTimeout(this.searchTimeout)
        this.searchTimeout = setTimeout(this.getUsers, 500)
        this.setState({
            searchQuery: value,
        })
    }

    render() {
        return (
            <div style={styles.bigContainer}>
                <Link to={"/plaizadmin"}><button>Home</button></Link>
                <TextField label={'Search'} value={this.state.searchQuery} onChange={this.onSearchChanged}/>
                <div style={styles.container}>
                    {
                        this.state.users.map(user => <Link to={'/user/' + user.fb_id}>
                            <Card key={user.fb_id} style={styles.card} elevation={24}>
                                <CardMedia
                                    image={user.profile_pic}
                                    title={user.username || user.name}
                                    style={styles.media}
                                />
                                <CardHeader title={user.username || user.name}/>
                            </Card>
                        </Link>)
                    }
                </div>
            </div>
        );
    }
}

const styles = {
    bigContainer: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
    },
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

export default  withStyles(classStyles)(Users);
