import React, { useRef } from 'react'
import './detail.scss'

import { useParams } from 'react-router'

import tmdbApi from '../../api/tmdbApi'
import apiConfig from '../../api/apiConfig'

const VideoList = (props) => {

    const { category } = useParams();

    const [videos, setVideos] = React.useState([])

    React.useEffect(() => {
        const getVideos = async () => {
           const response = await tmdbApi.getVideos(category, props.id)
           setVideos(response.results.slice(0,5))
        }
        getVideos()
    }, [category, props.id])

  return (
    <>
        {
            videos.map((item, i) => (
                <Video key={i} item={item} />
            ))
        }
    </>
  )
}

const Video = (props) => {

    const item = props.item
    const iframeRef = useRef(null)

    React.useEffect(() => {
        const height = iframeRef.current.offsetWidth * 9 / 16 + 'px';
        iframeRef.current.setAttribute('height', height)
    },[])

    return (
        <div className="video">
            <div className="video__title">
                <h2>{item.name}</h2>
            </div>
            <iframe 
            src={`https://www.youtube.com/embed/${item.key}`} 
            ref={iframeRef}
            width="100%"
            title="video"
            ></iframe>
        </div>
    )
}

export default VideoList