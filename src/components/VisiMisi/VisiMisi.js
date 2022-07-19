import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Spinner } from '@chakra-ui/react'; 
import './VisiMisi.css';

function VisiMisi() {
  const [loading, setloading] = useState(false);
  const [VisiMisiData, setVisiMisiData] =useState([]);
  useEffect(() => {
   setloading(true);
    axios
      .get("http://adminmesuji.embuncode.com/api/static-page/31_visiMisi")
      .then(function (visiMisi) {
        setVisiMisiData(visiMisi.data.data);
        console.log("console header: " + visiMisi.data.data);
        setloading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return(
    <>
      <div className="visiMisi-page">
      {loading ?
        (
          <div className="loading">
            <Spinner size='lg' color="#075098" />
            <p>Loading</p>
          </div>
        ) :
        <div className="split-view-visiMisi">
          <p className="visiMisi-title">VISI MISI</p>
          <div dangerouslySetInnerHTML={{
            __html: VisiMisiData.content,
            }} className="visiMisi-content"
          />
        </div>
      }
      </div>
    </>
  );
}

export default VisiMisi;