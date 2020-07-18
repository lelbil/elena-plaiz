import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Card,
    CardHeader,
    CardMedia,
} from '@material-ui/core'

class Posts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }

    componentDidUpdate = () => {
        if (this.props.data !== this.state.data) this.setState({data: this.props.data})
    }

    render() {
        return (
            <div style={styles.container}>
                {
                    this.state.data.map(post =>
                        <Card key={post.id || post._id} style={styles.card} elevation={24}>
                            <CardMedia
                                image={'http://35.181.29.44:9000/images/' + post.picture}
                                title={post.description}
                                style={styles.media}
                            />
                        </Card>
                    )
                }
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

export default  withStyles(classStyles)(Posts);
