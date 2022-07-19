import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { Spinner } from '@chakra-ui/react';
import './Carousel.css';

function TheCarousel() {
  const [loading, setloading] = useState(false);
  //Mencari data berita menggunakan id instansi
  const [CarouselData, setCarouselData] = useState([]);
  useEffect(() => {
      axios
        .get("http://adminmesuji.embuncode.com/api/news?instansi_id=31&sort_by=created_at&sort_type=desc")
        .then(function (thecarousel) {
          let temp =[]
          for (let i = 0; i < 3; i += 1) {
              if (i < thecarousel.data.data.data.length) {
                  temp.push(thecarousel.data.data.data[i])
              }
          }
          setCarouselData(temp);
          console.log("console header: " + thecarousel.data.data.data);
          setloading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    }, []);

  return (
    <>
      <Carousel>
        { loading ? 
          (
            <div className="loading">
              <Spinner size='lg' color="#075098" />
              <p>Loading</p>
            </div>
          ) :
           CarouselData.map(item => 
            <Carousel.Item className='theCarousel'>
              <Link to={{ 
                pathname:'/news/' + item.id
              }}> 
              <img
                  className="d-block w-100 theCarousel"
                  src={item.image_file_data}
                  alt="First slide"
                />
              </Link>
              <Carousel.Caption>
                <p className="carouselTittle">{item.title}</p>
              </Carousel.Caption>
            </Carousel.Item>
            )
          }
      </Carousel>
    </>
  );

}

export default TheCarousel;