import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './ListArticle.css';
import { Pagination } from 'react-bootstrap';
import { Spinner, 
  Menu,
  MenuButton,
  MenuList,
  MenuItem, 
  Button,
  Input } from '@chakra-ui/react';
import { Link } from "react-router-dom";
import {BsFillCaretDownFill, BsSearch} from 'react-icons/bs';

function ListArticle() {
  const [Items, setItems] = useState([]);
  const [ArticleData, setArticleData] = useState([]);
  const [CategoryArticleData, setCategoryArticleData] = useState([]);
  const [selectedCategoryArticle, setSelectedCategoryArticle] = useState();
  const [loading, setloading] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
      setloading(true);
      getArticleList(1);
      axios
        .get("http://adminmesuji.embuncode.com/api/article/categories/31")
        .then(function (catArticle) {
          setCategoryArticleData(catArticle.data.data);
          console.log("console header: " + catArticle.data.data);
          setloading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    }, [selectedCategoryArticle]);

  function getArticleList(page, title) {
    let urlPage = '';
    if(page==null){
      urlPage='&page=1';
    }else{
      urlPage='&page='+page;
    }

    let slug = '';
    if(selectedCategoryArticle!=null){
      slug='&slug='+selectedCategoryArticle;
    }else{
      slug='';
    }

    let urlTitle = '';
    if(title!=null){
      urlTitle="&title="+title;
    }else{
      urlTitle='';
    }

    setArticleData(null);

    axios
      .get("http://adminmesuji.embuncode.com/api/article?instansi_id=31&sort_type=desc&sort_by=created_at&per_page=4"  + slug + urlTitle + urlPage)
      .then(function (article) {
        setArticleData(article.data.data.data);
        console.log("console header: " + article.data.data.data);
        setloading(false);
        let items = []; 
        for (let number = 1; number<=article.data.data.last_page; number++){
          items.push(
            <Pagination.Item onClick={()=>getArticleList(number)} key={number} active={number === article.data.data.current_page}>
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

  return (
    <div className="listArticle">
      <div>
        <p className="articleTitle">ARTIKEL</p>
      </div>
      <div className="the-tools-article">
        <div className="the-category-article">
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
              {selectedCategoryArticle!=null ? selectedCategoryArticle : 'Kategori Artikel'}
            </MenuButton>
            <MenuList>
              <MenuItem fontSize="xl"
                color='#075098'
                _hover={{ bg: 'aliceblue', color:'#075098' }}
                onClick={()=> setSelectedCategoryArticle(null)}>
                Kategori Artikel
              </MenuItem>
            {CategoryArticleData.map(item => 
              <MenuItem
              fontSize="xl"
              color='#075098'
              _hover={{ bg: 'aliceblue', color:'#075098' }}
              onClick={() => setSelectedCategoryArticle(item.nama_kategori) }>
              {item.nama_kategori}
              </MenuItem>                   
            )}
            </MenuList>
          </Menu>
        </>
        }
        </div>
        <div className="the-search-article">
          <Input fontSize="xl" placeholder="Cari Berita" value={value} onChange={handleSearch} />
          <Button size='md' color='#075098' onClick={()=> getArticleList(null,value)}><BsSearch/></Button>
        </div>
      </div>
      <div className="split-view-list-article">
        <div className='the-article'>
          { ArticleData!=null ? 
            ArticleData.map(item => 
            <Link to={{ 
              pathname:'/article/' + item.id
              }} className="detailNews">
              <div>
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
          )
          :
            <div className="loading">
              <Spinner size='lg' color="#075098" />
              <p>Loading</p>
            </div>
          }
        </div>
        <div className="pagination">
          <Pagination>{Items}</Pagination>
        </div>
      </div>
    </div>
  );
}

export default ListArticle;