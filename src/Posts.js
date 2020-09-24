import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import { Card, CardMedia } from '@material-ui/core'

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

export default  withStyles(classStyles)(Posts);
