import React from 'react';
import { ColorModeSwitcher } from '../../../ColorModeSwitcher';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/actions/user';


const Header = ({isAuhthenticated=false,user}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isAuth = false
  const dispatch=useDispatch();
  const navigate=useNavigate();
  
  const logoutHandle=()=>{
    
    onClose();
    dispatch(logout());
    navigate("/login")
  }
  return (
    <>
      <ColorModeSwitcher />
      <Button
        onClick={onOpen}
        colorScheme={'yellow'}
        width="11"
        height={'12'}
        rounded="full"
        position={'fixed'}
        top="6"
        left="6"
      >
        <RiMenu5Fill />
      </Button>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay backdropFilter={'blur(1px)'} />
        <DrawerContent>
          <DrawerHeader  textColor="yellow.500"borderBottomWidth={'2px'}>LearnYard</DrawerHeader>

          <DrawerBody>
            <VStack spacing={'7'} alignItems={'center'}>
              <LinkButtons  onClose={onClose}url="/" title="Home" />
              <LinkButtons onClose={onClose} url="/courses" title="All Courses" />
              <LinkButtons onClose={onClose} url="/request" title="Request Course" />
              <LinkButtons onClose={onClose} url="/contact" title="Contact Us" />
              <LinkButtons onClose={onClose} url="/about" title="About" />
              <HStack
                justifyContent={'space-evenly'}
                position={'absolute'}
                bottom={'2rem'}
                width="80%"
              >
                {isAuhthenticated? (
                  <>
                    <VStack>
                      <HStack>
                        <Link onClick={onClose}to="/profile">
                          <Button variant="ghost" colorScheme="yellow">
                            Profile
                          </Button>
                        </Link>
                        <Button variant="ghost" onClick={logoutHandle}>
                          <RiLogoutBoxLine />
                          Logout
                        </Button>
                      </HStack>
                      {user && user.role === 'admin' ? (
                        <Link onClick={onClose}to="/admin/dashboard">
                          <Button  colorScheme={"purple"}variant='ghost'>
                            <RiDashboardFill style={{margin:'4px'}}/>
                            Dashboard
                          </Button>
                        </Link>
                      ) : null
                      }
                    </VStack>
                  </>
                ) : (
                  <>
                    <Link onClick={onClose} to="/login">
                      <Button colorScheme="yellow">Login</Button>
                    </Link>
                    <p>OR</p>
                    <Link  onClick={onClose} to="/SignUp">
                      <Button colorScheme="yellow">SignUp</Button>
                    </Link>
                  </>
                )}
              </HStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;

const LinkButtons = ({ url = '/', title = 'Home' ,onClose}) => (
  <Link onClick={onClose}to={url}>
    <Button textColor={"yellow.600"} variant={'ghost'}>{title}</Button>
  </Link>
);
