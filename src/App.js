import React, {useEffect, useState} from 'react';
import './App.css';
import PostDashboard from './PostDashboard'
import Posts from './Posts'
import Paging from './Paging'
import Filtering from './Filtering'

const getQueryParamsFromFilters = filters => {
    let str = ''
    for (let key in filters) {
        if (filters.hasOwnProperty(key)) {
            str += `&${key}=${filters[key]}`
        }
    }
    return str
}

function App() {
    const [perPage, setPerPage] = useState(20)
    const [currentPage, setCurrentPage] = useState(1)
    const [filters, setFilters] = useState({})
    const [data, setData] = useState([])
    const [pageCount, setPageCount] = useState(1)
    const [postToShow, setPostToShow] = useState(null)
    const [postToShowUser, setPostToShowUser] = useState(null)

    useEffect(() => {
        fetchPosts()
    }, [])

    useEffect(() => {
        fetchPosts()
    }, [ perPage, currentPage, filters ])

    const fetchPosts = () => {
        fetch(`http://localhost:9000/api/posts/elena?page=${currentPage}&perPage=${perPage}${getQueryParamsFromFilters(filters)}`, {
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

    const showPost = (postId, userId) => {
        setPostToShow(postId)
        setPostToShowUser(userId)
    }

    const showHome = () => {
        setPostToShow(null)
        setPostToShowUser(null)
    }

    return (
        <div className="App">
            {postToShow ?
                <PostDashboard id={postToShow} user={postToShowUser} goBack={showHome}/>
                : <React.Fragment>
                    <Filtering perPage={perPage} changePerPage={changePerPage} changeFilters={setFilters}/>
                    <Paging changeCurrentPage={setCurrentPage} pageCount={pageCount} selectedPage={currentPage}/>
                    <Posts data={data} showPost={showPost}/>
                    <Paging changeCurrentPage={setCurrentPage} pageCount={pageCount} selectedPage={currentPage}/>
                </React.Fragment>
            }
        </div>
    );
}

export default App;
