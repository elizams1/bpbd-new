import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from "react-router";
import { Spinner } from '@chakra-ui/react';
import './DetailArticle.css';

function DetailArticle(){
  const { id } = useParams();
  const [loading, setloading] = useState(false);
  //Mendapatkan detail article dari id artikel
  const [ArticleDetail, setArticleDetail] = useState([]);

  useEffect(() => {
    
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
    let article_id = id;

    postData(ip, device, article_id);

    }
    getData();
   
  function postData(ip, device, article_id) {
    axios
      .post("http://adminmesuji.embuncode.com/api/article/hit?artikel_id=" + article_id + "&ip=" + ip + "&device=" + device)
      .then(function (response) {
          console.log(response);
      })
      .catch(function (error) {
          console.log(error);
      });
  }
    const getArtikel = async () => {
      setloading(true);
      axios
          .get("http://adminmesuji.embuncode.com/api/article/" + id)
          .then(function (article) {
            setArticleDetail(article.data.data);
            console.log("console header: " + article.data.data);
            setloading(false);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    getArtikel();
  }, [id]);

  return(
    <>
      <div className="detailArtikel">
        <div className="split-view-detail">
            {loading ?
              <div className="loading">
                <Spinner size='lg' color="#075098" />
                <p>Loading</p>
              </div>
              :
              <div>
                <p className="detail-article-title">{ArticleDetail.title}</p>
                <img 
                class="thePicture" 
                src={ArticleDetail.image_file_data}
                alt="ArticlePhoto"/>
                <div dangerouslySetInnerHTML={{
                  __html: ArticleDetail.content,
                  }} className="detail-content"
                />
              </div>
              
            }
        </div>
      </div>
    </>
  );
}

export default DetailArticle;