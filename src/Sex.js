import React, {Component} from 'react'
import * as _ from 'lodash'
import Posts from './Posts'
import {shadowbanPost} from "./services/post";

export default  class Sex extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allUsers: [],
            currentIndex: 0,
            user: {},
            posts: []
        }
    }

    componentDidMount() {
        fetch('http://35.181.29.44:9000/api/users/getAllUsersElena', {
            method: 'GET',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                // TODO: make sure the Authorization is for an admin to get juvenile and shadowbanned (ideally create a new admin)
                Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJQbGFpeiIsInN1YiI6IjVjZmU0YzA2ZGU2OGJhNjg4MjY0NzVkMSIsImlhdCI6MTU5Mzg3MDIyNzUzMSwiZXhwIjoxNTkzOTU2NjI3NTMxfQ.T9I87aqed0Oy5ckgba0veV3NLnZeUzPpGAli_hqZW9k'
            }
        }).then(res => res.json()).then(allUsers => {
            this.fetchUserByFbId(allUsers[0].fb_id)
            this.setState({
                allUsers
            })
        })
            .catch(error => {
                console.warn('There was an error while trying to get all users: ', error)
            })
    }

    fetchUserByFbId = userId => {
        this.fetchUserProfile(userId)
        this.fetchUserPosts(userId)
    }

    fetchCurrentUserAndPosts = () => this.fetchUserByFbId(this.state.allUsers[this.state.currentIndex].fb_id)

    goToNext = () => {
        this.setState({
            currentIndex: this.state.currentIndex + 1,
        }, this.fetchCurrentUserAndPosts)
    }

    fetchUserProfile = (userId) => {
        fetch(`http://35.181.29.44:9000/api/users/${userId}`, {
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
    fetchUserPosts = (userId) => {
        fetch(`http://35.181.29.44:9000/api/posts/user/${userId}`, {
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

    updateUserGender = (gender) => {
        fetch('http://35.181.29.44:9000/api/users/gender', {
            method: 'PUT',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                // TODO: make sure the Authorization is for an admin to get juvenile and shadowbanned (ideally create a new admin)
                Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJQbGFpeiIsInN1YiI6IjVjZmU0YzA2ZGU2OGJhNjg4MjY0NzVkMSIsImlhdCI6MTU5Mzg3MDIyNzUzMSwiZXhwIjoxNTkzOTU2NjI3NTMxfQ.T9I87aqed0Oy5ckgba0veV3NLnZeUzPpGAli_hqZW9k'
            },
            body: JSON.stringify({
                gender,
                id: this.state.user.id,
            })
        }).then(res => res.json()).then(user => {
            const newUsersShallowCopy = _.clone(this.state.allUsers)
            const currentUser = newUsersShallowCopy[this.state.currentIndex]
            newUsersShallowCopy[this.state.currentIndex] = {...currentUser, gender: user.gender} //execute the manipulations
            this.setState({
                allUsers: newUsersShallowCopy
            }, this.goToNext)
        })
            .catch(error => {
                console.warn('There was an error while trying to update gender: ', error)
            })
    }

    getBackgroundColor = (gender) => {
        if (gender === 'male') return 'deepskyblue'
        if (gender === 'female') return 'hotpink'
        else return null
    }

    goToIndex = (index) => {console.log('Index', index)
        this.setState({
            currentIndex: index,
        }, this.fetchCurrentUserAndPosts)
    }

    shadowban = async postId => {
        await shadowbanPost(postId)

        const newStatePosts = [...this.state.posts]
        const indexOfShadowbanned = _.findIndex(newStatePosts, {
            id: postId
        })
        newStatePosts[indexOfShadowbanned] = { ...newStatePosts[indexOfShadowbanned], isShadowban: true }

        this.setState({
            posts: newStatePosts
        })
    }

    render() {
        const { user, posts } = this.state
        return (
            <div style={styles.bigContainer}>
                <div style={styles.userList}>
                    {this.state.allUsers.map((user, index) => (
                        <li
                            key={index}
                            style={{ ...styles.userItem, backgroundColor: this.getBackgroundColor(user.gender) }}
                            onClick={()=> this.goToIndex(index)}
                        >{user.username || user.name}</li>
                    ))}
                </div>
                <div style={styles.container}>
                    <div style={styles.userView}>
                        {!user ? <span>Loading...</span> :
                            <div style={styles.userContainer}>
                                { !!posts && <div style={{ flexDirection: 'row' }}>
                                    <Posts data={posts} shadowban={this.shadowban}/>
                                </div>}
                                <div style={styles.userInfo}>
                                    <div>
                                        <h1>{ (user.username || user.name) + (posts ? `( ${posts.length} posts )` : '') }</h1>
                                        <img src={user.profile_pic} style={{height: 250}}/>
                                        <ul>
                                            {['id', 'fb_id', 'expoPushToken', 'username', 'name', 'bio', 'email', 'tel', 'register_date', 'yearOfBirth', 'origin'].map(info => (
                                                <li key={info}>{info} : {user[info]}</li>
                                            ))}
                                            <li>City: {user.meta && user.meta.city}</li>
                                            <li>Country: {user.meta && user.meta.country}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    <div style={styles.sexDeterminationButton}>
                        <div style={{ backgroundColor: 'deepskyblue', flex: 1,}} onClick={() => this.updateUserGender('male')}>
                            <span>Male</span>
                        </div>
                        <div style={{ backgroundColor: 'pink', flex: 1}} onClick={() => this.updateUserGender('female')}>
                            <span>Female</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const styles = {
    bigContainer: {
        display: 'flex',
        height: '100vh',
        backgroundColor: 'gold',
    },
    container: {
        flex: 4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'red'
    },
    userList: {
        flex: 1,
        flexDirection: 'column',
        overflow: 'scroll',
    },
    userItem: {
        listStyleType: 'none',
        height: '30px',
        borderTop: '1px black solid',
        textAlign: 'center',
    },
    userView: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'scroll',
    },
    sexDeterminationButton: {
        display: 'flex',
        flexDirection: 'row',
        height: '20vh',
        backgroundColor: 'green'
    },
    userContainer: {
        display: 'flex',
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