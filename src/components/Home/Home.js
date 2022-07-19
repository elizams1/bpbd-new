import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Home.css';
import { BsEnvelope, BsGeo } from "react-icons/bs";
import Carousel from '../Carousel/Carousel.js';
import { Spinner } from '@chakra-ui/react';
import { Link } from "react-router-dom";


function Home() {
  const [loading, setloading] = useState(false);
  const [HomeData, setHomeData] = useState([]);
  const [NewsData, setNewsData] = useState([]);
  const [ArticleData, setArticleData] = useState([]);
  const [PhotoData, setPhotoData] = useState([]);
  const [VideoData, setVideoData] = useState([]);
  // Mengambil data instansi menggunakan id instansi
  
  useEffect(() => {
    setloading(true);  
      axios
        .get("http://adminmesuji.embuncode.com/api/instansi/detail/31")
        .then(function (home) {
          setHomeData(home.data.data);
          console.log("console header: " + home.data.data);
          setloading(false);
        })
        .catch(function (error) {
          console.log(error);        
        });
      axios
        .get("http://adminmesuji.embuncode.com/api/image-gallery?instansi_id=31&per_page=3")
        .then(function (photo) {
          let theImage = [];
          for (let i = 0; i < photo.data.data.data.length; i++) {
            for (let j = 0; j < photo.data.data.data[i].image_gallery_item.length; j++) {
              theImage.push(photo.data.data.data[i].image_gallery_item[j])
            }
          }
          let theImageView = [];
          for (let i = 0; i < 3; i++) {
            theImageView.push(theImage[i])
          }
          setPhotoData(theImageView);
          console.log("console header: " + photo.data.data.data);
          setloading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
      axios
        .get("http://adminmesuji.embuncode.com/api/news?instansi_id=31&sort_by=created_at&sort_type=desc")
        .then(function (news) {
          let temp =[]
          for (let i = 0; i < 4; i += 1) {
              if (i < news.data.data.data.length) {
                  temp.push(news.data.data.data[i])
              }
          }
          setNewsData(temp);
          console.log("console header: " + news.data.data.data);
          setloading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
      axios
        .get("http://adminmesuji.embuncode.com/api/article?instansi_id=31&sort_type=desc&sort_by=created_at")
        .then(function (article) {
          let temp =[]
          for (let i = 0; i < 4; i += 1) {
              if (i < article.data.data.data.length) {
                  temp.push(article.data.data.data[i])
              }
          }
          setArticleData(temp);
          console.log("console header: " + article.data.data.data);
          setloading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
      axios
        .get("http://adminmesuji.embuncode.com/api/video-gallery?instansi_id=31")
        .then(function (video) {
          let theVideo = [];
          for (let i = 0; i < video.data.data.data.length; i++) {
            for (let j = 0; j < video.data.data.data[i].image_gallery_item.length; j++) {
              theVideo.push(video.data.data.data[i].image_gallery_item[j])
            }
          }
          let theView = [];
          for (let i = 0; i < 3; i++) {
            theView.push(theVideo[i])
          }
          setVideoData(theView);
          console.log("console header: " + video.data.data.data);
          setloading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    
    }, []);

  return (
    <>
      <div className="home">
        <div className="columnHome">
          {  loading ? (
            <div className="loading">
              <Spinner size='lg' color="#075098" />
              <p>Loading</p>
            </div>
          ) : 
            <>
            <div className="logo">
              <img className="logoImg" src={HomeData.logo_instansi} alt="thelogo"></img>
            </div>
            <div> 
              <p  className="name">{HomeData.nama_instansi}</p>
            </div>
            <div className="description">
              <div className="email">
                <div className="icon">
                  <BsEnvelope size={35} className="icon"/>
                </div>
                <div>
                  <p className="details1">Email</p>
                  <p className="details">{HomeData.email}</p>
                </div>
              </div>
              <div className="location">
                <div className="icon">
                  <BsGeo size={35} className="icon"/>
                </div>
                <div>
                  <p className="details1">Alamat</p>
                  <p className="details">{HomeData.alamat}</p>
                </div>
              </div>
            </div>
            </>
          }
        </div>
        <div className="carousel">
          <Carousel />
        </div>
        <div className="theInstansi">
          {  loading ? (
            <div className="loading">
              <Spinner size='lg' color="#075098" />
              <p>Loading</p>
            </div>
          ) :
            <>
            <div>
              <p className="nameTitle">{HomeData.nama_instansi}</p>
              <Link to="/profil-instansi" >
                <div className="buttonDetails">
                  <p className="nameButton">Lihat Selengkapnya</p>
                </div>
              </Link>
            </div>
            <div className="lg-style">
              <img className="logoImg2" src={HomeData.logo_instansi} alt="thelogo"></img>
            </div>
            </>
          }
        </div>
        <div className="split-view-home">
          <div className="galleryFoto">
            <Link to="/image-gallery">
              <p  className="subMenuName">Galeri Foto</p>
            </Link>
            <div className='theGallery'>
            { loading ?
              <div className="loading">
                <Spinner size='lg' color="#075098" />
                <p>Loading</p>
              </div>
              :
              PhotoData.map(item => 
                <div className="the-photo2">
                  <img
                    className="the-picture"
                    src={item.image_file_data}
                    alt="First slide"
                  />
                  <p className="the-description-image">
                    {item.description}
                  </p>
                </div> 
            )
            }
            </div>
          </div>
          <div className="galleryVideo">
            <Link to="/video-gallery">
              <p  className="subMenuName">Galeri Video</p>
            </Link>
            <div className="the-vidio">
            { loading ?
              <div className="loading">
                <Spinner size='lg' color="#075098" />
                <p>Loading</p>
              </div> 
              :
              VideoData.map(item => 
                <div className="the-yutub">
                  <iframe
                    className="the-vidio2"
                    src={'https://www.youtube.com/embed/'+item.video_url} 
                    title="thevideo"
                    allowFullScreen
                  />
                  <p className="text-description-video">
                    {item.description}
                  </p>
                </div>
            )
            }
            </div>
          </div>
          <div className="news">
            <Link to="/news">
              <p className="subMenuName">Berita</p>
            </Link>
            <div className='theNews'>
              {loading ? 
              <div className="loading">
                <Spinner size='lg' color="#075098" />
                <p>Loading</p>
              </div> :
              NewsData.map(item => 
                <Link to={{ pathname: '/news/' + item.id }} className="the-detail-news-home">
                  <div className="the-detail-news-home-2">
                      <img
                        className="the-picture2"
                        src={item.image_file_data}
                        alt="the-detail-news"
                      />
                      <div>
                        <p className="textDetails3">{item.title}</p>
                        <p className="textIntro3">{item.intro}</p>
                      </div>
                  </div>
                </Link>            
              )
              }
            </div>
          </div>
          <div className="article">
            <Link to="/article">
              <p className="subMenuName">Artikel</p>
            </Link>
            <div className='theArticle'>
              { loading ?
              <div className="loading">
                <Spinner size='lg' color="#075098" />
                <p>Loading</p>
              </div>  :
                ArticleData.map(item => 
                <Link to={{ pathname:'/article/' + item.id}} className="the-detail-article">
                  <div className="the-detail-article-2" >
                    <div>
                      <p className="textDetails2">{item.title}</p>
                      <p className="textIntro2">{item.intro}</p>
                    </div>
                    <img
                      className="the-picture2"
                      src={item.image_file_data}
                      alt="the-detail-article"
                    />
                  </div>
                </Link>               
              )
              }
            </div>
          </div>
        </div>
      </div>
     </> 
  );
}

export default Home;
