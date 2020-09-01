import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Posts from './Posts'
import {FormControlLabel, FormLabel, Radio, RadioGroup} from "@material-ui/core";

const showPostsModes = [ 'all', 'moodboard', 'notMoodboard' ]

class UserView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: null,
            showPostsMode: 'all',
            user: null,
        }
    }

    componentDidMount = () => {
        this.fetchUserProfile()
        this.fetchUserPosts()
    }

    fetchUserProfile = () => {
        fetch(`http://35.181.29.44:9000/api/users/${this.props.match.params.userId}`, {
            method: 'GET',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                // TODO: make sure the Authorization is for an admin to get juvenile and shadowbanned (ideally create a new admin)
                Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJQbGFpeiIsInN1YiI6IjVjZmU0YzA2ZGU2OGJhNjg4MjY0NzVkMSIsImlhdCI6MTU5Mzg3MDIyNzUzMSwiZXhwIjoxNTkzOTU2NjI3NTMxfQ.T9I87aqed0Oy5ckgba0veV3NLnZeUzPpGAli_hqZW9k'
            }
        }).then(res => res.json()).then(user => {
            this.setState({
                user
            })
        })
            .catch(error => {
                console.warn('There was an error while trying to get posts: ', error)
            })
    }
    fetchUserPosts = () => {
        fetch(`http://35.181.29.44:9000/api/posts/user/${this.props.match.params.userId}`, {
            method: 'GET',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                // TODO: make sure the Authorization is for an admin to get juvenile and shadowbanned (ideally create a new admin)
                Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJQbGFpeiIsInN1YiI6IjVjZmU0YzA2ZGU2OGJhNjg4MjY0NzVkMSIsImlhdCI6MTU5Mzg3MDIyNzUzMSwiZXhwIjoxNTkzOTU2NjI3NTMxfQ.T9I87aqed0Oy5ckgba0veV3NLnZeUzPpGAli_hqZW9k'
            }
        }).then(res => res.json()).then(posts => {
            this.setState({
                posts,
            })
        })
            .catch(error => {
                console.warn('There was an error while trying to get posts: ', error)
            })
    }

    changeMode = (ev) => {
        this.setState({ showPostsMode: ev.target.value })
    }

    render() {
        const { user, posts, showPostsMode } = this.state
        let postsToShow = posts
        if (showPostsMode === 'moodboard') postsToShow = posts.filter(post => post.isMoodboard)
        if (showPostsMode === 'notMoodboard') postsToShow = posts.filter(post => !post.isMoodboard)

        return (
            <div>
                {!user ? <span>Loading...</span> :
                    <div style={styles.container}>
                        <Link to={"/"}><button>Home</button></Link>
                        <Link to={"/users"}><button>Users</button></Link>
                        { !!posts && <div style={{ flexDirection: 'row' }}>
                            <RadioGroup row aria-label="Show" name="mode" value={this.state.showPostsMode} onChange={this.changeMode}>
                                <FormLabel component="legend">Show: </FormLabel>
                                { showPostsModes.map(mode => <FormControlLabel value={mode} control={<Radio />} label={mode} />) }
                            </RadioGroup>
                            <Posts data={postsToShow}/>
                        </div>}
                        <div style={styles.userInfo}>
                            <div>
                                <h1>{ user.username || user.name }</h1>
                                <img src={user.profile_pic} style={{height: 250}}/>
                                <ul>
                                    {['id', 'fb_id', 'expoPushToken', 'username', 'name', 'bio', 'email', 'tel', 'register_date', 'yearOfBirth', 'origin'].map(info => (
                                        <li key={info}>{info} : {user[info]}</li>
                                    ))}
                                    <li>City: {user.meta && user.meta.city}</li>
                                    <li>Country: {user.meta && user.meta.country}</li>
                                    <li>Fav Cats: {user.fav_cat.join(', ')}</li>
                                    <li>Number of Fav posts: {user.fav_posts.length}</li>
                                    <li>Number of Fav Users: {user.fav_users.length}</li>
                                    <li>Number of Users in squad: {user.squad.length}</li>
                                </ul>
                                <div>

                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )

    }
}

export default withRouter(UserView)

const styles = {
    container: {
        display: 'flex',
    },
    actions: {
        display: 'flex',
        flexDirection: 'column',
    },
    userInfo: {
        display: 'flex',
        flexDirection: 'column',
    },
    picture: {
        height: '80vh',
        width: '100vh',
    },
}