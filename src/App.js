import React, { Suspense, useEffect } from 'react';
import Home from './compponents/Home/Home';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './compponents/Layout/Header/Header';
import { lazy } from 'react';

//import Cources from './compponents/courses/Cources';
import Footer from './compponents/Layout/footer/Footer';
import Login from './compponents/Login';
import Signup from './compponents/Signup';
import Forget from './compponents/Forget';
import ResetPaassword from './compponents/ResetPaassword';
import Contact from './compponents/Contact';
import Subscribe from './compponents/Subscribe';
import WatchCourse from './compponents/courses/WatchCourse';
import Profile from './compponents/Profile';
import Dashboard from './compponents/admin/Dashboard';
import CreateCourse from './compponents/admin/CreateCourse';
import AdminCourses from './compponents/admin/AdminCourses';
import Users from './compponents/admin/Users';
import { useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { clearError, clearMessage } from './redux/reducers/userReducer';
import { getMyProfile } from './redux/actions/user';
//import { ProtectedRoute } from 'protected-route-react';
import Loader from './compponents/Loader';
import UpdateProfile from './compponents/UpdateProfile';
import Reset from './compponents/Reset';
import PaymentSuccess from './compponents/PaymentSuccess';
import { Spinner, VStack } from '@chakra-ui/react';
import Courserequest from './compponents/admin/Request';
import Request from './compponents/admin/Request';
import About from './compponents/About';
const Cources=lazy(()=>import("./compponents/courses/Cources"))
function App() {
  const { isAuthenticated, user, error, message, loading } = useSelector(
    state => state.users
  );
  const course=new Map();
  const {courses,lectures}=useSelector(state=>state.courses);
  // window.addEventListener("contextmenu",(e)=>{
  //   e.preventDefault();
  // })

  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    } else if (isAuthenticated) {
      toast.success(message);
      dispatch(clearMessage());
      
    } else {
      toast.error(message);
    }
  }, [dispatch, error, message]);
  useEffect(() => {
    dispatch(getMyProfile());
  }, [dispatch,isAuthenticated]);
  return (
    <Router>
      {loading ? (
        <Loader />
      ) : (
        <>
        <VStack w={"full"} css={{
                '&::-webkit-scrollbar':{display:"none"}
        }}>
          <Header isAuhthenticated={isAuthenticated} user={user} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Suspense fallback={<Spinner/>}><Cources /></Suspense>} />
            <Route path="/login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/forgetPassword"
              element={isAuthenticated ? <Forget /> : null}
            />
            <Route
              path="/resetpassword/:token"
              element={isAuthenticated ? <Reset /> : null}
            />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/subscribe"
              element={isAuthenticated ? <Subscribe user={user} /> : null}
            />
            <Route path="/course/:index" element={<WatchCourse />} />
            <Route
              path="/profile"
              element={isAuthenticated ? <Profile user={user} course={course}/> : <Signup />}
            />
            <Route
              path="/admin/dashboard"
              element={user && user.role === 'admin' ? <Dashboard /> : <Profile />}
            />
            <Route
              path="/admin/createcourse"
              element={user && user.role === 'admin' ? <CreateCourse /> : null}
            />
            <Route
              path="/admin/courses"
              element={ user && user.role === 'admin' ? <AdminCourses  courses={courses}/> : null}
            />
            <Route
              path="/admin/users"
              element={user && user.role === 'admin' ? <Users /> : null}
            />
             <Route
              path="/updateProfile"
              element={isAuthenticated ? <UpdateProfile /> : null}
            />
             <Route
              path="/changePassword"
              element={isAuthenticated ? <ResetPaassword /> : null}
            />
            <Route
              path="/paymentsuccess"
              element={isAuthenticated ? <PaymentSuccess /> : null}
            />
            <Route
              path="/request"
              element={isAuthenticated ? < Request/> : null}
            />
          </Routes>
          <Footer />
          <Toaster />
          </VStack>
        </>
      )}
    </Router>
  );
}

export default App;
