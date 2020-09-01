import React, {useEffect, useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PostDashboard from './PostDashboard'
import Posts from './Posts'
import Paging from './Paging'
import Filtering from './Filtering'
import { TextField } from "@material-ui/core"
import UserView from "./UserView";

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
            <TextField label={'Search in description'} value={search} onChange={onSearchChanged}/>
            <Paging changeCurrentPage={setCurrentPage} pageCount={pageCount} selectedPage={currentPage}/>
            <Posts data={data}/>
            <Paging changeCurrentPage={setCurrentPage} pageCount={pageCount} selectedPage={currentPage}/>
        </div>
    );
}

export default function App() {
    return (
        <Router>
            <Switch>
                <Route path="/user/:userId">
                    <UserView />
                </Route>
                <Route path="/post/:postId">
                    <PostDashboard />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}