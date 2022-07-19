import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Menu.css';
import { BsList } from "react-icons/bs";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { Link } from "react-router-dom";

function TheMenu(){
  // Mengambil data menu berdasarkan id instansi
  const [MenuData, setMenuData] = useState([]);
  useEffect(() => {
      axios
        .get("http://adminmesuji.embuncode.com/api/menus?instansi_id=31")
        .then(function (menu) {
          setMenuData(menu.data);
          console.log("console header: " + menu.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }, []);

  // Mengambil data detail instansi menggunakan id instansi
  const [LogoData, setLogoData] = useState([]);
  useEffect(() => {
      axios
        .get("http://adminmesuji.embuncode.com/api/instansi/detail/31")
        .then(function (logo) {
          setLogoData(logo.data.data);
          console.log("console header: " + logo.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }, []);

  // membuat drawer
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef()
  

  return(
    <>
      <div className="theMenu">
        <div className="the-menu-1">
          <Link to="/home">
            <div className="theName1">
              <img className="logoMenu" src={LogoData.logo_instansi} alt="thelogo" ></img>
              <p className="nameInstansi">{LogoData.nama_instansi}</p>
            </div>
          </Link>
          <div className="the-list-menu">
            {MenuData.map(item=>
            <Menu>
              {({isOpen})=>(
                <>
                  {
                    item.url != null ?
                    <Link to={""+item.url}>
                      <MenuButton 
                      px={2}
                      py={2}
                      transition='all 0.2s'
                      color='white'
                      fontSize="xl"
                      
                      _hover={{ bg: 'white', borderRadius:'10px', color:'#075098' }}
                      _expanded={{ bg: 'white', color:'#075098',  borderRadius:'10px' }}
                      // _focus={{ boxShadow: 'outline', borderRadius:'10px' }}
                    isActive={isOpen}
                    > 
                      {isOpen ? item.name : item.name}
                    </MenuButton>
                  </Link> : 
                  <>
                    <MenuButton 
                      px={2}
                      py={2}
                      transition='all 0.2s'
                      color='white'
                      fontSize="xl"
                      
                      _hover={{ bg: 'white', borderRadius:'10px', color:'#075098' }}
                      _expanded={{ bg: 'white', color:'#075098',  borderRadius:'10px' }}
                      // _focus={{ boxShadow: 'outline', borderRadius:'10px' }}
                    isActive={isOpen}
                    > 
                      {isOpen ? item.name : item.name}
                    </MenuButton>
                  </>
                  }
                  { item.children.length > 0 ? 
                    <MenuList>
                      {item.children.map(child =>
                      <>
                        {child.static_page != null ? 
                          <Link to={"/static/"+child.static_page}>
                            <MenuItem 
                              fontSize="xl"
                              color='#075098'
                              _hover={{ bg: 'aliceblue', color:'#075098' }}
                            >{child.name}</MenuItem>
                          </Link>
                          : 
                          <Link to={""+child.url}>
                            <MenuItem 
                              fontSize="xl"
                              color='#075098'
                              _hover={{ bg: 'aliceblue', color:'#075098' }}
                            >{child.name}</MenuItem>
                          </Link>
                        }
                      </>
                      )}
                    </MenuList>
                     : null
                  }
                </>
              )}
            </Menu>        
          )}
          </div>
        </div>
        <div className="the-menu-2">
          <div className="drawer">
            <Link to="/home">
              <div className="theName">
                <img className="logoMenu" src={LogoData.logo_instansi} alt="thelogo" ></img>
                <p className="nameInstansi">{LogoData.nama_instansi}</p>
              </div>
            </Link>
            
            <div className="theDrawer">
              <div className="buttonDrawer" onClick={onOpen}>
                <BsList size={35} color="#fff" className="icon"/>
              </div>
              <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
              >
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerHeader borderBottomWidth='1px' color= "#075098">Menu</DrawerHeader>              
                  <DrawerBody>
                    {MenuData.map(item=>
                      <Menu>
                        {({isOpen})=>(
                          <>
                          {item.url !=null ?  
                            <Link to={""+item.url}>
                              <MenuButton 
                                px={2}
                                py={2}
                                transition='all 0.2s'
                                display='flex'
                                marginBottom="10px"
                                fontSize="xl"
                                textTransform='uppercase'
                                width= '100%'
                                textAlign="center"
                                _hover={{ bg: '#075098', borderRadius:'10px', color:'white' }}
                                _expanded={{boxShadow: 'outline', borderRadius:'10px' }}
                                // _focus={{ boxShadow: 'outline', borderRadius:'10px' }}
                              isActive={isOpen}
                              > 
                                {isOpen ? item.name : item.name}
                              </MenuButton>
                              { item.children.length > 0 ? 
                                <MenuList  
                                >
                                  {item.children.map(child =>
                                    <MenuItem 
                                      color='#075098'
                                      fontSize="xl"
                                    >{child.name}</MenuItem>
                                  )}
                                </MenuList> : null
                              }
                            </Link>
                            : 
                            <>
                              <MenuButton 
                                px={2}
                                py={2}
                                transition='all 0.2s'
                                display='flex'
                                marginBottom="10px"
                                fontSize="xl"
                                textTransform='uppercase'
                                width= '100%'
                                textAlign="center"
                                _hover={{ bg: '#075098', borderRadius:'10px', color:'white' }}
                                _expanded={{boxShadow: 'outline', borderRadius:'10px' }}
                                // _focus={{ boxShadow: 'outline', borderRadius:'10px' }}
                              isActive={isOpen}
                              > 
                                {isOpen ? item.name : item.name}
                              </MenuButton>
                            </>
                          }
                          { item.children.length > 0 ? 
                            <MenuList>
                              {item.children.map(child =>
                              <>
                                {child.static_page != null ? 
                                  <Link to={"/static/"+child.static_page}>
                                    <MenuItem 
                                      fontSize="xl"
                                      color='#075098'
                                      _hover={{ bg: 'aliceblue', color:'#075098' }}
                                    >{child.name}</MenuItem>
                                  </Link>
                                  : 
                                  <Link to={""+child.url}>
                                    <MenuItem 
                                      fontSize="xl"
                                      color='#075098'
                                      _hover={{ bg: 'aliceblue', color:'#075098' }}
                                    >{child.name}</MenuItem>
                                  </Link>
                                }
                              </>
                              )}
                            </MenuList>
                            : null
                          }
                          </>
                        )}
                      </Menu>        
                    )}
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
        </div>
        
      </div>
    </>
  );
}

export default TheMenu;
