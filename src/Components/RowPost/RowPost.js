import React, { useEffect, useState } from 'react'
import "./RowPost.css"
import axios from '../../axios'
import { API_KEY,imageUrl} from "../../constants/constants"
import YouTube from 'react-youtube'

function RowPost(props) {
    const [movies, setMovie] = useState([])
    const [urlId,setUrlId]=useState('')
   




    useEffect(() => {
        axios.get(props.url).then((response )=> {
            console.log(response.data);
            setMovie(response.data.results)
        })
        // .catch(err=>{
        //     // alert("network error")
        // })
    }, [])


    const opts ={
        height:'390',
        width:'100%',
        playerVars:{
            autoplay:1,

        },
    };
    const handleMovie=(id)=>{
        console.log(id);
        axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response=>{
            if(response.data.results.length!==0){
                 setUrlId(response.data.results[0])
                 console.log(response.data.results[0]);
            }else{
                console.log('not availabl');
            }
        })
    }

    return(
        <div className='row'>
            <h2>{props.title}</h2>
            <div className='posters'>

                {movies.map((obj) => 

                    <img onClick={()=>handleMovie(obj.id)} className={props.isSmall ? 'smallposter':'poster'} src={`${imageUrl + obj.backdrop_path}`} alt="Card" />

                
                )}



            </div>
         {urlId &&  <YouTube opts={opts} videoId={urlId.key} />} 

        </div>
    )
}

export default RowPost
