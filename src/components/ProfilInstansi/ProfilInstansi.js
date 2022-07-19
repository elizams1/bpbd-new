import React, {useState, useEffect} from 'react';
import { Spinner } from '@chakra-ui/react';
import axios from 'axios';
import './ProfileInstansi.css';

function ProfilInstansi() {
  const [loading, setloading] = useState(false);
  const [ProfilData, setProfilData] = useState([]);
  useEffect(() => {
      axios
        .get("http://adminmesuji.embuncode.com/api/instansi/detail/31")
        .then(function (profil) {
          setProfilData(profil.data.data);
          console.log("console header: " + profil.data.data);
          setloading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    }, []);

  return(
    <>
      <div className="profil-instansi">
        <div className="split-view-profil">
        {loading ?
          (
            <div className="loading">
              <Spinner size='lg' color="#075098" />
              <p>Loading</p>
            </div>
          )
          :
          <>
          <div className="profil-top">
            <p className="profil-title">PROFIL INSTANSI</p>
            <img className="img-profil" src={ProfilData.logo_instansi} alt="logo-instansi"/>
          </div>
          <div className="profil-middle">
            <p className="profil-name">{ProfilData.nama_instansi}</p>
            <p className="profil-about">{ProfilData.tentang}</p>
          </div>
          <div className="profil-structure">
            <p className="profil-title">STRUKTUR ORGANISASI</p>
            <div className="the-structure">
              <div className="photo-structure">
                <img src={ProfilData.foto_wakil_kepala} className="photo-profil" alt="foto-wakil-kepala" />
                <p className="structure-name">Wakil Kepala</p>
                <p className="structure-name1">{ProfilData.nama_wakil_kepala}</p>
              </div>
              
              <div className="photo-structure">
                <img src={ProfilData.foto_kepala} alt="foto-kepala" className="photo-profil"/>
                <p className="structure-name">Kepala Badan</p>
                <p className="structure-name1">{ProfilData.nama_kepala}</p>
              </div>
              
              <div className="photo-structure">
                <img src={ProfilData.foto_sekretaris} className="photo-profil" alt="foto-sekretaris"/>
                <p className="structure-name">Sekretaris</p>
                <p className="structure-name1">{ProfilData.nama_sekretaris}</p>
              </div>
            </div>
          </div>
          </>
        }
          
        </div>
      </div>
    </>
  );
}

export default ProfilInstansi;