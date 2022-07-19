import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Document.css';
import {BsFillFileEarmarkArrowDownFill} from 'react-icons/bs';
import { Link } from "react-router-dom";
import { Spinner } from '@chakra-ui/react';

function Document(){
  const [loading, setloading] = useState(false);
  const [DocumentData, setDocumentData] = useState([]);
  useEffect(() => {
    setloading(true);
    axios
      .get("http://adminmesuji.embuncode.com/api/dokumen?instansi_id=15")
      .then(function (doc) {
        setDocumentData(doc.data.data.data);
        console.log("console header: " + doc.data.data.data);
        setloading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return(
    <>
      <div className="document-page">
        <div className="split-view-document">
          <p className="document-title">DOKUMEN</p>
          <div className="the-document">
            { loading ?
              (
                <div className="loading">
                  <Spinner size='lg' color="#075098" />
                  <p>Loading</p>
                </div>
              )
              :
              <>
                {DocumentData.map(item=>
                  <Link className="the-sub-document" to={{ 
                  pathname:'/document/' + item.slug
                  }}>
                    <div >
                      <p className="document-name">{item.name}</p>
                      <div className="document-file ">
                        <BsFillFileEarmarkArrowDownFill size={15} color="#075098" className="icons"/>
                        <p className="document-file-name">{item.dokumen_item[0].dokumen_file_name}</p>
                      </div>
                    </div>
                  </Link>
                )}
              </>
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default Document;