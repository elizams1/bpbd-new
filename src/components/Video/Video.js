import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Spinner } from '@chakra-ui/react';
import './Video.css';

function Video(){
  const [loading, setloading] = useState(false);
  const [VideoData, setVideoData] = useState([]);
  useEffect(() => {
      setloading(true);
      axios
        .get("http://adminmesuji.embuncode.com/api/video-gallery?instansi_id=31")
        .then(function (video) {
          let theVideo = [];
          for (let i = 0; i < video.data.data.data.length; i++) {
            for (let j = 0; j < video.data.data.data[i].image_gallery_item.length; j++){
              theVideo.push(video.data.data.data[i].image_gallery_item[j])
            }
          }
          setVideoData(theVideo);
          console.log("console header: " + video.data.data.data);
          setloading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    }, []);

  console.log(VideoData);
  return( 
    <>
      <div className="video-page">
        <div className="video-list">
          <p className="video-title">GALERI VIDEO</p>
          <div className="the-gallery-video">
          { loading ?
          <>
            <Spinner size='xl' />
            <p>Loading</p>
          </>
          :
          <>
            { VideoData.map(item =>
            <div className="the-sub-gallery-video">
              <div className="the-video-loc">
                <iframe src={'https://www.youtube.com/embed/'+item.video_url} title="thevideo" className="the-img" allowFullScreen/>
                <p className="the-desc">{item.description}</p>
              </div>
            </div>
            )} 
          </> 
          } 
          </div>
        </div>
      </div>
    </>
  );
}

export default Video;