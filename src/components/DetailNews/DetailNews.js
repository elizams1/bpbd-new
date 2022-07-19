import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from "react-router";
import { Spinner } from '@chakra-ui/react';
import './DetailNews.css';

function DetailNews() {
  const {id} = useParams()
  const [loading, setloading] = useState(false);
  //Mendapatkan detail news dari id news
  const [NewsDetail, setNewsDetail] = useState([]);

  useEffect(() => {
    getData();
    setloading(true);
    axios
        .get("http://adminmesuji.embuncode.com/api/news/" + id)
        .then(function (news) {
          setNewsDetail(news.data.data);
          console.log("console header: " + news.data.data);
          setloading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    }, []);
  
  //Fungsi untuk mendapatkan IP dan nama device
  const getData = async () => {
    const res = await axios.get('https://geolocation-db.com/json/')
    
    var userAgent = window.navigator.userAgent,
        platform = window.navigator.platform,
        macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
        windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
        iosPlatforms = ['iPhone', 'iPad', 'iPod'],
        os = null;

    if (macosPlatforms.indexOf(platform) !== -1) {
      os = 'Mac OS';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
      os = 'iOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      os = 'Windows';
    } else if (/Android/.test(userAgent)) {
      os = 'Android';
    } else if (!os && /Linux/.test(platform)) {
      os = 'Linux';
    }

    console.log(res.data.IPv4);
    let ip = res.data.IPv4;
    console.log(os);
    let device = os;
    console.log(id);
    let news_id = id;

    postData(ip, device, news_id);

  }
   
  function postData(ip, device, news_id) {
    axios
      .post("http://adminmesuji.embuncode.com/api/news/hit?news_id=" + news_id + "&ip=" + ip + "&device=" + device)
      .then(function (response) {
          console.log(response);
      })
      .catch(function (error) {
          console.log(error);
      });
  }

  return (
    <>
      <div className="detail-news">
        <div className="split-view-detail">
          {loading ?
            (
              <div className="loading">
                <Spinner size='lg' color="#075098" />
                <p>Loading</p>
              </div>
            ) :
            <div>
              <p className="detail-news-title">{NewsDetail.title}</p>
              <img 
              class="thePicture" 
              src={NewsDetail.image_file_data}
              alt="NewsPhoto"/>
              <div dangerouslySetInnerHTML={{
                __html: NewsDetail.content,
                }} className="detail-content"
              />
            </div>
          }
        </div>
      </div>
    </>
  );
}

export default DetailNews;