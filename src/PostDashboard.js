import React, {Component} from 'react'
import { withRouter, Link } from 'react-router-dom'
import {Button} from "@material-ui/core";
import {deletePost} from "./services/post";

class PostDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            post: null,
            user: null,
        }
    }

    componentDidMount = () => {
        this.fetchPost(this.fetchUser)
    }

    fetchPost = (cb) => {
        fetch(`http://35.181.29.44:9000/api/posts/${this.props.match.params.postId}`, {
            method: 'GET',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                // TODO: make sure the Authorization is for an admin to get juvenile and shadowbanned (ideally create a new admin)
                Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJQbGFpeiIsInN1YiI6IjVjZmU0YzA2ZGU2OGJhNjg4MjY0NzVkMSIsImlhdCI6MTU5Mzg3MDIyNzUzMSwiZXhwIjoxNTkzOTU2NjI3NTMxfQ.T9I87aqed0Oy5ckgba0veV3NLnZeUzPpGAli_hqZW9k'
            }
        }).then(res => res.json()).then(post => {
            this.setState({
                post
            }, cb)
        })
            .catch(error => {
                console.warn('There was an error while trying to get posts: ', error)
            })
    }
    fetchUser = () => {
        fetch(`http://35.181.29.44:9000/api/users/${this.state.post.user}`, {
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

    deleteAPost = async () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            const postId = this.state.post.id
            await deletePost(postId)
        }
    }

    render() {
        const { user, post } = this.state
        const postDate = post && new Date(post.created_at) || new Date()
        const originalQualityLink = 'https://plaizoriginal.s3.eu-west-3.amazonaws.com/' + (post && post.picture)
        return (
            <div style={{margin:10}}>
                {!post ? <span>Loading...</span> :
                    <div style={styles.container}>
                        <div>
                            <Link to={"/plaizadmin"}><button>Home</button></Link>
                        </div>
                        <div style={{marginLeft:10}}>
                            {post.isVideo ? <video width="500" height="750" controls>
                                    <source src={'http://35.181.29.44:9000/images/' + post.picture} type="video/mp4"/>
                                </video> :
                            <img
                                style={styles.picture}
                                src={'http://35.181.29.44:9000/images/' + post.picture}
                            />}
                            <div>
                                <a href={originalQualityLink} target={'_blank'}>{originalQualityLink}</a>
                            </div>
                            {/*<div>
                                <button> Précédent</button>
                                <button> Suivant</button>
                            </div>*/}
                        </div>
                        <div style={styles.actions}>
                            <div style={{...styles.userInfoText, margin:10}}>
                                Here we're going to put info about the post
                                <ul>
                                    <li  style={styles.userInfoText}>Superlikes : {post.user_superlike.length}</li>
                                    <li  style={styles.userInfoText}>Likes : {post.user_like.length}</li>
                                    <li  style={styles.userInfoText}>Dislikes : {post.user_dislike.length}</li>
                                    <li  style={styles.userInfoText}>Number of Comments : {post.comments.length}</li>
                                    <li  style={styles.userInfoText}>isMoodboard : {post.isMoodboard.toString()}</li>
                                    <li  style={styles.userInfoText}>isShadowban : {post.isShadowban.toString()}</li>
                                    <li  style={styles.userInfoText}>isJuvenile : {post.isJuvenile.toString()}</li>
                                    <li  style={styles.userInfoText}>Description : {post.description}</li>
                                    <li  style={styles.userInfoText}>Date : { postDate.toLocaleDateString() + ' at ' + postDate.toLocaleTimeString()}</li>
                                </ul>

                                <Button color={'secondary'} onClick={this.deleteAPost}>Delete</Button>

                            </div>

                            {/*<button> Mettre dans la Collection de l'utilisateur</button>
                            <button> Shadowban !</button>
                            <input/>
                            <button> Sauvegarder le commentaire</button>*/}
                        </div>
                        { !!user && <div style={styles.userInfo}>
                            <div>
                                <Link to={'/user/' + user.fb_id}><h1>{ user.username || user.name }</h1>
                                <img src={user.profile_pic} style={{height: 250}}/></Link>
                                <ul>
                                    {['id', 'fb_id', 'expoPushToken', 'username', 'name', 'bio', 'email', 'tel', 'register_date', 'yearOfBirth', 'origin'].map(info => (
                                        <li key={info} style={styles.userInfoText}>{info} : {user[info]}</li>
                                    ))}
                                    <li  style={styles.userInfoText}>City: {user.meta && user.meta.city}</li>
                                    <li  style={styles.userInfoText}>Country: {user.meta && user.meta.country}</li>
                                    <li  style={styles.userInfoText}>Fav Cats: {user.fav_cat.join(', ')}</li>
                                    <li  style={styles.userInfoText}>Number of Fav posts: {user.fav_posts.length}</li>
                                    <li  style={styles.userInfoText}>Number of Fav Users: {user.fav_users.length}</li>
                                    <li  style={styles.userInfoText}>Number of Users in squad: {user.squad.length}</li>
                                </ul>
                                <div>

                                </div>
                            </div>
                        </div>}
                    </div>
                }
            </div>
        )

    }
}

export default withRouter(PostDashboard)

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
    },
    userInfoText: {
        color:"white"
    }
}