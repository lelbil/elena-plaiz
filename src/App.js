import React, {useEffect, useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Users from "./Users";
import Sex from "./Sex";
import Posts from './Posts'
import PostDashboard from './PostDashboard'
import UserView from "./UserView";
import Paging from './Paging'
import Filtering from './Filtering'
import SearchBar from './SearchBar'
import {Card, CardMedia, TextField, Switch as MSwitch} from "@material-ui/core"
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import logo from './assets/logo-test.png';
import logoDcm from './assets/logo-dcm-alt.png';
import NellyRodi from './assets/NellyRodi.png';
import Peclers from './assets/Peclers.png';
import Promostyl from './assets/Promostyl.png';
import Launchmetrics from './assets/Launchmetrics.png';

import Tags from './components/Tags';
import { get, put, getUri } from './services/api';
import * as _ from "lodash";

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

    const fetchPosts = async () => {
      const result = await get(`/api/posts/elena?searchquery=${search}&page=${currentPage}&perPage=${perPage}${getQueryParamsFromFilters(filters)}`);
      if (result.data) {
        setData(result.data.docs)
        setCurrentPage(result.data.page)
        setPageCount(result.data.totalPages)
      } else {
        console.warn('There was an error while trying to get posts: ', result.err)
      }
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

    const shadowban = async (postId) => {
        const newPost = await put(`/api/posts/${postId}/shadowban`)

        const newStateData = [...data]
        const indexOfShadowbanned = _.findIndex(newStateData, {
            id: postId
        })
        newStateData[indexOfShadowbanned] = { ...newStateData[indexOfShadowbanned], isShadowban: true }

        setData(newStateData)
    }

    return (
        <div className="App">
            <Filtering perPage={perPage} changePerPage={changePerPage} changeFilters={setFilters}/>
            <Link to={"/users"}><h3>Users View</h3></Link>
            <TextField label={'Search in description'} value={search} onChange={onSearchChanged}/>
            <Paging changeCurrentPage={setCurrentPage} pageCount={pageCount} selectedPage={currentPage} className="Paging"/>
            <Posts data={data} shadowban={shadowban}/>
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
    const [sliderIndex, setSliderIndex] = useState(null)
    const [admin, setAdmin] = useState(false)

    useEffect(() => {
        fetchPosts()
    }, [])

    useEffect(() => {
        fetchPosts()
    }, [ currentPage, searchQuery ])

    const fetchPosts = async () => {
      const result = await get(`/api/posts/elena?searchquery=${search}&page=${currentPage}&perPage=100&shadowban=false&shadowbanF=true&moodboard=false&moodboardF=true&staffPick=${search === 'staffpick'}`);
      if (result.data) {
          setData(result.data.docs)
          setCurrentPage(result.data.page)
          setPageCount(result.data.totalPages)
      } else {
          console.warn('There was an error while trying to get posts: ', result.err)
      }
    }

    const onSearchChanged = ev => {
        const { value } = ev.target
        clearTimeout(searchTimeout)
        searchTimeout = setTimeout(() => { setCurrentPage(1); setSearchQuery(value) }, 500)
        setSearch(value)
    }

    const images = data.map(post => 'https://plaizoriginal.s3.eu-west-3.amazonaws.com/' + post.picture)
    return (
        <div className="App">
            <div className="LogosHeader">
                <img src={logo} alt="Logo" className="Logo"/>
                {/*<p className="X">x</p>
                <img src={Promostyl} alt="LogoDcm" className="LogoDcm"/>*/}
                {/* <img src={Launchmetrics} alt="LogoDcm" className="LogoDcm" style={{width:150, height:89, paddingTop:15}}/> */}
            </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: "space-between", alignItems: 'center'}}>
                <SearchBar label={'Search'} value={search} onChange={onSearchChanged}/>
                <MSwitch
                    checked={admin}
                    onChange={(e) => setAdmin(e.target.checked)}
                    name="admin"
                    style={{ color: '#632B63' }}
                />
                <Paging changeCurrentPage={setCurrentPage} pageCount={pageCount} selectedPage={currentPage}/>
            </div>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
                {data.length === 0 && <p style={{ color: 'white', fontSize: '1.5em', fontWeight: 'bold' }}>Aucun résultat</p>}
                {
                    data.map((post, index) => <Card onClick={() => setSliderIndex(index)} key={post.id || post._id} style={{width: 300, margin: 20,flexBasis: '20%', cursor:"pointer", backgroundColor:"transparent", backgroundImage: "url(https://i.ibb.co/PQdcWpc/lock4.png)", backgroundRepeat: 'no-repeat' }} elevation={24}>
                        <CardMedia
                            image={`${getUri()}/images/${post.picture}`}
                            title={post.description}
                            style={{ height: 400, backgroundColor:"transparent", display: 'flex', alignItems: 'flex-end' }}
                        >
                          {admin && <Tags id={post.id || post._id} data={post.labels || []}/>}
                        </CardMedia>
                    </Card>)
                }
            </div>
            { sliderIndex && <Lightbox
                mainSrc={images[sliderIndex]}
                nextSrc={images[(sliderIndex + 1) % images.length]}
                prevSrc={images[(sliderIndex + images.length - 1) % images.length]}
                onCloseRequest={() => setSliderIndex(null)}
                onMovePrevRequest={() => setSliderIndex((sliderIndex - 1) % images.length )}
                onMoveNextRequest={() => setSliderIndex((sliderIndex + 1) % images.length )}
            />}
            {data.length > 0 && <Paging changeCurrentPage={setCurrentPage} pageCount={pageCount} selectedPage={currentPage}/>}
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
                <Route path="/sex">
                    <Sex />
                </Route>
                <Route path="/">
                    <BrandHome />
                </Route>
            </Switch>
        </Router>
    );
}
