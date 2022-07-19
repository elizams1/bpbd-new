import React from "react";
import './App.css';
import Menu from './components/Menu/Menu.js';
import Footer from './components/Footer/Footer.js';
import Home from './components/Home/Home.js';
import ListNews from './components/ListNews/ListNews.js';
import ListArticle from './components/ListArticle/ListArticle.js';
import DetailArticle from './components/DetailArticle/DetailArticle.js';
import DetailNews from './components/DetailNews/DetailNews.js';
import ProfilInstansi from './components/ProfilInstansi/ProfilInstansi.js';
import Video from './components/Video/Video.js';
import Photo from './components/Photo/Photo.js';
import Document from './components/Document/Document.js';
import VisiMisi from './components/VisiMisi/VisiMisi.js';
import DetailDocument from './components/DetailDocument/DetailDocument.js';
import { ChakraProvider } from '@chakra-ui/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route} from "react-router-dom";

function App() {
  return (
    <ChakraProvider>
      <Menu/>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/article" element={<ListArticle/>} />
        <Route path="/news" element={<ListNews/>} />
        <Route path="/profil-instansi" element={<ProfilInstansi/>}/>
        <Route path="/video-gallery" element={<Video/>}/> 
        <Route path="/image-gallery" element={<Photo/>}/>
        <Route path="/document" element={<Document/>}/>
        <Route path="/document/:slug" element={<DetailDocument/>}/>
        <Route path="/article/:id" element={<DetailArticle/>}/>
        <Route path="/news/:id" element={<DetailNews/>}/>
        <Route path="/static/:static_page" element={<VisiMisi/>}/>
      </Routes>
      <Footer/>
    </ChakraProvider>
      
      
    
  );
}

export default App;
