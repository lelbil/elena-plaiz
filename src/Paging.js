import React, {Component} from 'react'

export default class Paging extends Component{
    constructor(props) {
        super(props)
        this.state = {
            selectedPage: 1
        }
    }

    componentDidUpdate = () => {
        if (this.props.selectedPage !== this.state.selectedPage) this.setState({selectedPage: this.props.selectedPage})
    }

    render() {
        return (
            <div style={styles.container}>
                <ul style={styles.ul}>
                    <li
                        style={{...styles.li, ...(this.state.selectedPage === 1 && styles.disabledLi)}}
                        onClick={() => {
                            if (this.state.selectedPage > 1) this.props.changeCurrentPage(this.state.selectedPage - 1)
                        }}
                    >Précédent</li>
                    <li
                        style={{...styles.li, ...(this.state.selectedPage === 1 && styles.selectedLi)}}
                        onClick={() => {
                            if (this.state.selectedPage > 1) this.props.changeCurrentPage(1)
                        }}
                    >1</li>
                    {
                        this.state.selectedPage !== 1 && this.state.selectedPage !== this.props.pageCount &&
                        <React.Fragment>
                                <li>...</li>
                                <li
                                style={{...styles.li, ...styles.selectedLi}}
                                onClick={() => {
                                    if (this.state.selectedPage < this.props.pageCount) this.props.changeCurrentPage(this.props.pageCount)
                                }}
                            >{this.props.selectedPage}</li>
                            <li>...</li>
                        </React.Fragment>
                        }
                    <li
                        style={{...styles.li, ...(this.state.selectedPage === this.props.pageCount && styles.selectedLi)}}
                        onClick={() => {
                            if (this.state.selectedPage < this.props.pageCount) this.props.changeCurrentPage(this.props.pageCount)
                        }}
                    >{this.props.pageCount}</li>
                    <li
                        style={{...styles.li, ...(this.state.selectedPage === this.props.pageCount && styles.disabledLi)}}
                        onClick={() => {
                            if (this.state.selectedPage < this.props.pageCount) this.props.changeCurrentPage(this.state.selectedPage + 1)
                        }}
                    >Suivant</li>
                </ul>
            </div>
        )
    }
}

const styles = {
    container: {
        textAlign: 'right',
    },
    ul: {
        display: 'flex',
        paddingLeft: 0,
        listStyle: 'none',
        borderRadius: '.25rem',
        justifyContent: 'flex-end',
    },
    li: {
        position: 'relative',
        display: 'block',
        padding: '.5rem .75rem',
        margin: '5px',
        lineHeight: '1.25',
        cursor: 'pointer',
        border: 'solid 1px #444565',
        backgroundColor: "#313456",
        color:"white",
        borderRadius: 5,
        minWidth: "15px",
        textAlign: "center"
    },
    selectedLi: {
        background: 'linear-gradient(120deg, #532453 30%, #894ECF 90%)',
        color:"white",
        fontWeight:"bold",
        border: 'solid 0px #733689'
    },
    disabledLi: {
        cursor: 'not-allowed',
        color: 'gray'
    }
}
