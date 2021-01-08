import React, { Component } from 'react';
import * as _ from 'lodash'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

class Chats extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chats: [],
            selectedConvo: null,
        }
    }

    componentDidMount() {
        this.getConvos()
    }

    getConvos = () => {
        fetch(`http://35.181.29.44:9000/api/elena/chats`, {
            method: 'GET',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJQbGFpeiIsInN1YiI6IjVjZmU0YzA2ZGU2OGJhNjg4MjY0NzVkMSIsImlhdCI6MTU5Mzg3MDIyNzUzMSwiZXhwIjoxNTkzOTU2NjI3NTMxfQ.T9I87aqed0Oy5ckgba0veV3NLnZeUzPpGAli_hqZW9k'
            }
        }).then(res => res.json()).then(chats => {
            const chatId = window.location.href.split('/plaizadmin/chats/')[1]

            this.setState({
                chats: chats.filter(({ messages }) => messages.length > 0 ),
                selectedConvo: chatId ? _.find(chats, { _id: chatId }) : null
            })
        })
            .catch(error => {
                console.warn('There was an error while trying to get chats: ', error)
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

    goToChat = (chat) => {
        const path = window.location.protocol + "//" + window.location.host + '/plaizadmin/chats/' + chat._id
        window.history.pushState({ path },'', path);

        this.setState({ selectedConvo: chat })
    }

    render() {
        const { chats, selectedConvo } = this.state

        return (
            <div style={styles.bigContainer}>
                <div style={{ display: 'flex' }}>
                    <div style={{ height: '100vh', overflow: 'scroll', paddingTop:16 }}>
                        {_.orderBy(chats, 'messages[0].createdAt', 'desc').map(chat => {
                            //_.orderBy(chats, 'messages.length', 'desc').map(chat => {
                            const particpant1 = _.get(chat, 'userContent[0]', {})
                            const name1 = particpant1.username || particpant1.name
                            const particpant2 = _.get(chat, 'userContent[1]', {})
                            const name2 = particpant2.username || particpant2.name
                            const numberOfMessages = chat.messages.length

                            return (<div key={chat._id} onClick={() => this.goToChat(chat)} style={{
                                border: '1px rgb(68, 69, 101) solid',
                                borderRadius: '10px',
                                marginBottom: '5px',
                                padding: '5px',
                                width: '33vw',
                                display: 'flex',
                                justifyContent: 'space-around',
                                backgroundColor: selectedConvo && chat._id === selectedConvo._id ? 'rgb(49, 52, 86)' : undefined,
                            }}>
                                <img src={particpant1.profile_pic} style={{ width: '50px', height: '50px', borderRadius: '50%' }}/>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <h4 style={{ marginBottom: 0, marginTop: 0}}>{ `${name1}    <->    ${name2}` }</h4>
                                    <br/>
                                    <h5 style={{ margin: 0 }}>{ `${numberOfMessages} messages` }</h5>
                                </div>
                                <img src={particpant2.profile_pic} style={{ width: '50px', height: '50px', borderRadius: '50%' }}/>
                            </div>)
                        })
                        }
                    </div>
                    <div style={{ height: '100vh', overflow: 'scroll' }}>
                        {!!selectedConvo && <ul>
                            {selectedConvo.messages.reverse().map(message => {
                                const senderContent = selectedConvo.userContent.find(user => user.fb_id === message.sender)
                                const senderName = senderContent.username || senderContent.name

                                return (<div key={message._id} style={{
                                    border: '1px rgb(68, 69, 101) solid',
                                    borderRadius: '10px',
                                    marginBottom: '5px',
                                    padding: '5px',
                                    width: '62vw',
                                    display: 'flex',
                                    justifyContent: 'space-around',
                                    alignItems: "center"
                                }}>
                                    <Link to={"/user/" + senderContent.fb_id}>
                                        <img src={senderContent.profile_pic} style={{ width: '50px', height: '50px', borderRadius: '50%' }}/>
                                    </Link>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <h3 style={{ marginBottom: 0, marginTop: 0 }}>{ senderName }</h3>
                                        <br/>
                                        <h5 style={{ marginTop: 0, marginBottom: 0 }}>{ message.text }</h5>
                                        <br/>
                                        <h6 style={{ marginTop: 0, marginBottom: 0, color: 'grey' }}>{ message.createdAt }</h6>

                                    </div>
                                </div>)
                            })}
                        </ul>}
                    </div>
                </div>
            </div>
        );
    }
}

const styles = {
    bigContainer: {
        color: 'white',
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

export default  withStyles(classStyles)(Chats);
