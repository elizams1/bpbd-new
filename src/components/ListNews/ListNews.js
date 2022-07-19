import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './ListNews.css';
import { Pagination } from 'react-bootstrap';
import { 
  Spinner, 
  Menu,
  MenuButton,
  MenuList,
  MenuItem, 
  Button,
  Input } from '@chakra-ui/react';
import { Link } from "react-router-dom";
import {BsFillCaretDownFill, BsSearch} from 'react-icons/bs';

function ListNews(){

  const [Items, setItems] = useState([]);
  const [NewsList, setNewsList] = useState([]);
  const [CategoryNewsData, setCategoryNewsData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [loading, setloading] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
      setloading(true);
      getNewsList(1);
      axios
        .get("http://adminmesuji.embuncode.com/api/news/categories/31")
        .then(function (catNews) {
          setCategoryNewsData(catNews.data.data);
          console.log("console header: " + catNews.data.data);
          setloading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    }, [selectedCategory]);

  
  function getNewsList(page, title) {
    let urlPage = '';
    if(page==null){
      urlPage='&page=1';
    }else{
      urlPage='&page='+page;
    }

    let slug = '';
    if(selectedCategory!=null){
      slug='&slug='+selectedCategory;
    }else{
      slug='';
    }

    let urlTitle = '';
    if(title!=null){
      urlTitle="&title="+title;
    }else{
      urlTitle='';
    }

    setNewsList(null);
    
    axios
      .get("http://adminmesuji.embuncode.com/api/news?instansi_id=31&sort_by=created_at&sort_type=desc&per_page=4"  + slug + urlTitle + urlPage)
      .then(function (news) {
        setNewsList(news.data.data.data);
        console.log("console header: " + news.data.data.data);
        setloading(false);
        let items = []; 
        for (let number = 1; number<=news.data.data.last_page; number++){
          items.push(
            <Pagination.Item onClick={()=>getNewsList(number)} key={number} active={number === news.data.data.current_page}>
            {number}
          </Pagination.Item>,
          );
          setItems(items);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    
  }
  
  function handleSearch(event) {
   setValue(event.target.value);
  }

  return(
    <div  className="listNews">
      <div className="top">
        <p className="newsTitle">BERITA</p>
      </div>
      <div className="the-tools">
        <div className="the-category">
          { loading ?
          (
            <div className="loading">
              <Spinner size='lg' color="#075098" />
              <p>Loading</p>
            </div>
          ) :
          <>
            <Menu>
              <MenuButton 
                px={2}
                py={2}
                transition='all 0.2s'
                color='white'
                fontSize="xl"
                backgroundColor='#075098'
                borderRadius='10px'
                _hover={{ bg: 'white', borderRadius:'10px', color:'#075098' }}
                _expanded={{ bg: 'white', color:'#075098',  borderRadius:'10px' }}  
                as={Button}
                rightIcon={<BsFillCaretDownFill />}>
                {selectedCategory!=null ? selectedCategory : 'Kategori Berita'}
              </MenuButton>
              <MenuList>
                <MenuItem fontSize="xl"
                  color='#075098'
                  _hover={{ bg: 'aliceblue', color:'#075098' }}
                  onClick={()=> setSelectedCategory(null)}>
                  Kategori Berita
                </MenuItem>
              {CategoryNewsData.map(item => 
                <MenuItem
                fontSize="xl"
                color='#075098'
                _hover={{ bg: 'aliceblue', color:'#075098' }}
                onClick={() => setSelectedCategory(item.nama_kategori) }>
                {item.nama_kategori}
                </MenuItem>                   
              )}
              </MenuList>
            </Menu>
          </>
          }
        </div>
        <div className="the-search">
          <Input fontSize="xl" placeholder="Cari Berita" value={value} onChange={handleSearch} />
          <Button size='md' color='#075098' onClick={()=> getNewsList(null,value)}><BsSearch/></Button>
        </div>
      </div>
      <div className="split-view-list-news">
        <div className='the-news'>
          { loading ?
            <div className="loading">
              <Spinner size='lg' color="#075098" />
              <p>Loading</p>
            </div>
            :(
            <>
            {NewsList != null ?
                NewsList.map(item =>
                <Link to={{ 
                  pathname:'/news/' + item.id
                }} className="detailNews">
                  <div >
                    <img
                      className="thePicture"
                      src={item.image_file_data}
                      alt="First slide"
                    />
                    <div className="detail">
                      <p className="textDetails">{item.title}</p>
                      <p className="textIntro">{item.intro}</p>
                    </div>
                  </div>  
                </Link>               
              ) :
              (
                <div className="loading">
                  <Spinner size='lg' color="#075098" />
                  <p>Loading</p>
                </div>
              )
            }
            </>
            )
          }
          
        </div>
        <div className="pagination">
          <Pagination>{Items}</Pagination>
        </div>
      </div>
      
    </div>
  );
}
export default ListNews;