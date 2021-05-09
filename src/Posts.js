import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import { Card, CardMedia, CardActions, Button } from '@material-ui/core'
import VisibilityOffTwoToneIcon from '@material-ui/icons/VisibilityOffTwoTone';
import ChildFriendlyIcon from '@material-ui/icons/ChildFriendly';
import BrushIcon from '@material-ui/icons/Brush';

class Posts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this.setState({ data: this.props.data })
    }

    componentDidUpdate = () => {
        if (this.props.data !== this.state.data) this.setState({data: this.props.data})
    }

    render() {
        return (
            <div style={styles.container}>
                {
                    this.state.data.map(post => <Card key={post.id || post._id} style={styles.card} elevation={24}>
                            <Link to={'/post/' + post.id || post._id}>
                                <CardMedia
                                    component={post.isVideo? 'video' : 'div'}
                                    autoPlay
                                    loop
                                    image={'http://35.181.29.44:9000/images/' + post.picture}
                                    title={post.description}
                                    style={styles.media}
                                >
                                    {post.isShadowban && <VisibilityOffTwoToneIcon fontSize={'large'} color={'error'}/>}
                                    {post.isJuvenile && <ChildFriendlyIcon fontSize={'large'} color={'error'}/>}
                                    {post.isMoodboard && <BrushIcon fontSize={'large'} color={'error'}/>}
                                </CardMedia>
                            </Link>
                            <CardActions>
                                {!post.isShadowban && <Button color={'secondary'} onClick={() => this.props.shadowban(post.id || post._id)}>Shadowban</Button>}
                            </CardActions>
                        </Card>)
                }
            </div>
        );
    }
}

const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    card: {
        width: 250,
        margin: 5,
        // flexBasis: '20%'
    },
    media: {
        height: 400,
        display: 'flex',
    },
}

const classStyles = () => ({
    colorPrimary: {
        backgroundColor: 'red',
    }
})

export default  withStyles(classStyles)(Posts);
