import React, {useEffect, useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Users from "./Users";
import Posts from './Posts'
import PostDashboard from './PostDashboard'
import UserView from "./UserView";
import Paging from './Paging'
import Filtering from './Filtering'
import {Card, CardMedia, TextField} from "@material-ui/core"

const getQueryParamsFromFilters = filters => {
    let str = ''
    for (let key in filters) {
        if (filters.hasOwnProperty(key)) {
            str += `&${key}=${filters[key]}`
        }
    }
    return str
}

let searchTimeout
function Home() {
    const [perPage, setPerPage] = useState(20)
    const [currentPage, setCurrentPage] = useState(1)
    const [filters, setFilters] = useState({})
    const [search, setSearch] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const [data, setData] = useState([])
    const [pageCount, setPageCount] = useState(1)

    useEffect(() => {
        fetchPosts()
    }, [])

    useEffect(() => {
        fetchPosts()
    }, [ perPage, currentPage, filters, searchQuery ])

    const fetchPosts = () => {
        fetch(`http://35.181.29.44:9000/api/posts/elena?searchquery=${search}&page=${currentPage}&perPage=${perPage}${getQueryParamsFromFilters(filters)}`, {
            method: 'GET',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJQbGFpeiIsInN1YiI6IjVjZmU0YzA2ZGU2OGJhNjg4MjY0NzVkMSIsImlhdCI6MTU5Mzg3MDIyNzUzMSwiZXhwIjoxNTkzOTU2NjI3NTMxfQ.T9I87aqed0Oy5ckgba0veV3NLnZeUzPpGAli_hqZW9k'
            }
        }).then(res => res.json()).then(result => {
            setData(result.docs)
            setCurrentPage(result.page)
            setPageCount(result.totalPages)
        })
        .catch(error => {
            console.warn('There was an error while trying to get posts: ', error)
        })
    }
    const changePerPage = event => {
        setPerPage(parseInt(event.target.value))
        setCurrentPage(1)
    }

    const onSearchChanged = ev => {
        const { value } = ev.target
        clearTimeout(searchTimeout)
        searchTimeout = setTimeout(() => { setCurrentPage(1); setSearchQuery(value) }, 500)
        setSearch(value)
    }

    return (
        <div className="App">
            <Filtering perPage={perPage} changePerPage={changePerPage} changeFilters={setFilters}/>
            <Link to={"/users"}><h3>Users View</h3></Link>
            <TextField label={'Search in description'} value={search} onChange={onSearchChanged}/>
            <Paging changeCurrentPage={setCurrentPage} pageCount={pageCount} selectedPage={currentPage}/>
            <Posts data={data}/>
            <Paging changeCurrentPage={setCurrentPage} pageCount={pageCount} selectedPage={currentPage}/>
        </div>
    );
}

function BrandHome() {
    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const [data, setData] = useState([])
    const [pageCount, setPageCount] = useState(1)

    useEffect(() => {
        fetchPosts()
    }, [])

    useEffect(() => {
        fetchPosts()
    }, [ currentPage, searchQuery ])

    const fetchPosts = () => {
        fetch(`http://35.181.29.44:9000/api/posts/elena?searchquery=${search}&page=${currentPage}&perPage=100&shadowban=false&shadowbanF=true&moodboard=false&moodboardF=true`, {
            method: 'GET',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJQbGFpeiIsInN1YiI6IjVjZmU0YzA2ZGU2OGJhNjg4MjY0NzVkMSIsImlhdCI6MTU5Mzg3MDIyNzUzMSwiZXhwIjoxNTkzOTU2NjI3NTMxfQ.T9I87aqed0Oy5ckgba0veV3NLnZeUzPpGAli_hqZW9k'
            }
        }).then(res => res.json()).then(result => {
            setData(result.docs)
            setCurrentPage(result.page)
            setPageCount(result.totalPages)
        })
        .catch(error => {
            console.warn('There was an error while trying to get posts: ', error)
        })
    }

    const onSearchChanged = ev => {
        const { value } = ev.target
        clearTimeout(searchTimeout)
        searchTimeout = setTimeout(() => { setCurrentPage(1); setSearchQuery(value) }, 500)
        setSearch(value)
    }

    return (
        <div className="App">
            <TextField label={'Search in description'} value={search} onChange={onSearchChanged}/>
            <Paging changeCurrentPage={setCurrentPage} pageCount={pageCount} selectedPage={currentPage}/>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start'}}>
                {
                    data.map(post => <Card key={post.id || post._id} style={{width: 300, margin: 20,flexBasis: '20%'}} elevation={24}>
                        <CardMedia
                            image={'http://35.181.29.44:9000/images/' + post.picture}
                            title={post.description}
                            style={{ height: 400 }}
                        />
                    </Card>)
                }
            </div>
            <Paging changeCurrentPage={setCurrentPage} pageCount={pageCount} selectedPage={currentPage}/>
        </div>
    );
}

export default function App() {
    return (
        <Router>
            <Switch>
                <Route path="/users">
                    <Users />
                </Route>
                <Route path="/user/:userId">
                    <UserView />
                </Route>
                <Route path="/post/:postId">
                    <PostDashboard />
                </Route>
                <Route path="/plaizadmin">
                    <Home />
                </Route>
                <Route path="/">
                    <BrandHome />
                </Route>
            </Switch>
        </Router>
    );
}