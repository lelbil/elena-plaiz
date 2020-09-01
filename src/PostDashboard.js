import React, {Component} from 'react'
import { withRouter, Link } from 'react-router-dom'

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

    render() {
        const { user, post } = this.state
        const originalQualityLink = 'https://plaizoriginal.s3.eu-west-3.amazonaws.com/' + (post && post.picture)
        return (
            <div>
                {!post ? <span>Loading...</span> :
                    <div style={styles.container}>
                        <div>
                            <Link to={"/"}><button>Home</button></Link>
                            <img
                                style={styles.picture}
                                src={'http://35.181.29.44:9000/images/' + post.picture}
                            />
                            <div>
                                <a href={originalQualityLink} target={'_blank'}>{originalQualityLink}</a>
                            </div>
                            {/*<div>
                                <button> Précédent</button>
                                <button> Suivant</button>
                            </div>*/}
                        </div>
                        <div style={styles.actions}>
                            <div>
                                Here we're going to put info about the post
                                <ul>
                                    <li>Superlikes : {post.user_superlike.length}</li>
                                    <li>Likes : {post.user_like.length}</li>
                                    <li>Dislikes : {post.user_dislike.length}</li>
                                    <li>Number of Comments : {post.comments.length}</li>
                                    <li>isMoodboard : {post.isMoodboard.toString()}</li>
                                    <li>isShadowban : {post.isShadowban.toString()}</li>
                                    <li>isJuvenile : {post.isJuvenile.toString()}</li>
                                    <li>Description : {post.description}</li>
                                </ul>

                            </div>

                            {/*<button> Mettre dans la Collection de l'utilisateur</button>
                            <button> Shadowban !</button>
                            <input/>
                            <button> Sauvegarder le commentaire</button>*/}
                        </div>
                        { !!user && <div style={styles.userInfo}>
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
        width: '100vh',
    },
}