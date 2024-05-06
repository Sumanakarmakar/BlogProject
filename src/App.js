import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Home from "./Pages/Home";
import Registration from "./Pages/Registration";
import Login from "./Pages/Login";
import Services from "./Pages/Services";
import Testimonial from "./Pages/Testimonial";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Team from "./Pages/Team";
import Contact from "./Pages/Contact";
import Courses from "./Pages/Courses";
import Blog from "./Pages/Blog";
import Category from "./Pages/Category";
import BlogDetails from "./Pages/BlogDetails";
import CategoryPost from "./Pages/CategoryPost";
import swal from "sweetalert";


function App() {
  const queryClient = new QueryClient()

  function PrivateRoute({ children }) {
    const token = localStorage.getItem("auth") || sessionStorage.getItem("auth")
    return token !== null && token !== undefined ? (
      children
    ) : (
      // alert("You have to sign in first"),
      swal({
        text: 'You have to Log In first to see this page',
        buttons: false,
        timer: 3000
      }),
      <Navigate to="/login" />
    )
  }

  const public_route = [
    {
      path: "/",
      component: <Home />
    },
    {
      path: "/registration",
      component: <Registration />
    },
    {
      path: "/login",
      component: <Login />
    },
    {
      path: "/services",
      component: <Services />
    },
    {
      path: "/testimonial",
      component: <Testimonial />
    },
    {
      path: "/team",
      component: <Team />
    },
    {
      path: "/contact",
      component: <Contact />
    }
  ]

  const private_route = [
    {
      path: "/courses",
      component: <Courses />
    },
    {
      path: "/blog",
      component: <Blog/>
    },
    {
      path: "/blogdetails/:id",
      component: <BlogDetails/>
    },
    {
      path: "/category",
      component: <Category/>
    },
    {
      path: "/category_post/:id",
      component: <CategoryPost/>
    }
  ]

  return (
    <>

      <ToastContainer />

      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            {
              public_route?.map((route) => {
                return (
                  <Route path={route.path} element={route.component} />
                )
              })
            }
            {
              private_route?.map((route) => {
                return (
                  <Route path={route.path} element={<PrivateRoute>{route.component}</PrivateRoute>} />
                )
              })
            }
          </Routes>
        </Router>
      </QueryClientProvider>

    </>
  );
}

export default App;
