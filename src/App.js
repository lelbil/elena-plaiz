import React, {useEffect, useState} from 'react';
import './App.css';
import PostDashboard from './PostDashboard'
import Posts from './Posts'
import Paging from './Paging'
import Filtering from './Filtering'

function App() {
    const [perPage, setPerPage] = useState(20)
    const [currentPage, setCurrentPage] = useState(1)
    const [data, setData] = useState([])
    const [pageCount, setPageCount] = useState(1)

    useEffect(() => {
        fetchPosts()
    }, [])

    useEffect(() => {
        fetchPosts()
    }, [ perPage, currentPage ])

    const fetchPosts = () => {
        console.log('Fetching')
        fetch(`http://35.181.29.44:9000/api/posts/all?page=${currentPage}&perPage=${perPage}`, {
            method: 'GET',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                // TODO: make sure the Authorization is for an admin to get juvenile and shadowbanned (ideally create a new admin)
                Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJQbGFpeiIsInN1YiI6IjVjZmU0YzA2ZGU2OGJhNjg4MjY0NzVkMSIsImlhdCI6MTU5Mzg3MDIyNzUzMSwiZXhwIjoxNTkzOTU2NjI3NTMxfQ.T9I87aqed0Oy5ckgba0veV3NLnZeUzPpGAli_hqZW9k'
            }
        }).then(res => res.json()).then(result => {
            console.log('Got results: ', result)
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
    return (
        <div className="App">
            <Filtering perPage={perPage} changePerPage={changePerPage}/>
            <Paging changeCurrentPage={setCurrentPage} pageCount={pageCount} selectedPage={currentPage}/>
            <Posts data={data}/>
            <Paging changeCurrentPage={setCurrentPage} pageCount={pageCount} selectedPage={currentPage}/>
        </div>
    );
}

export default App;
