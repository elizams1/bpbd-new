import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Photo.css';
import { Spinner } from '@chakra-ui/react';

function Photo(){
  const [loading, setloading] = useState(false);
  const [PhotoData, setPhotoData] = useState([]);
  useEffect(() => {
    setloading(true);
    axios
      .get("http://adminmesuji.embuncode.com/api/image-gallery?instansi_id=31")
      .then(function (photo) {
        let theImage = [];
        for (let i = 0; i < photo.data.data.data.length; i++) {
          for (let j = 0; j < photo.data.data.data[i].image_gallery_item.length; j++) {
            theImage.push(photo.data.data.data[i].image_gallery_item[j])
          }
        }
        setPhotoData(theImage);
        console.log("console header: " + photo.data.data.data);
        setloading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
    }, []);
  
  return( 
    <> 
      <div className="photo-page">
        <div className="photo-list">
          <p className="photo-title">GALERI FOTO</p>
          <div className="the-gallery">
          { loading ? 
            <>
              <Spinner size='xl' />
              <p>Loading</p>
            </>
            :
            <>
              {/* <div className="the-sub-gallery"> */}
              {PhotoData.map(item =>
                <div className="the-photo">
                  <img src={item.image_file_data} alt="galeri" className="the-img"/>
                  <p className="the-desc">{item.description}</p>
                </div>
                )}
              {/* </div> */}
              
            </>
          } 
          </div>
        </div>
      </div>
    </>
  );
}

export default Photo;
