import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Booksapi from './components/Booksapi.jsx'
import Home from './components/Home.jsx'
import Bookspage from './Pages/Bookspage.jsx'
import Description from './components/Description.jsx'
import Allcart from './components/Allcart.jsx'
import Testcard from './components/Testcard.jsx'
import Proceed from './components/proceed/Proceedd.jsx'
import Main from './components/proceed/Main.jsx'
import Address from './components/proceed/Address.jsx'
import Ordersumary from './components/proceed/Ordersumary.jsx'
import OutOfStock from './components/OutOfStock.jsx'
import NoMoreItemsAvailable from './components/Nomoreitemleft.jsx'
import Login from './components/Login.jsx'
import Test2 from './components/Test2.jsx'
import Previewcard from './components/Previewcard.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpinner from './components/LoadingSpinner.jsx'
import OrderPlaced from './components/proceed/OrderPlaced.jsx'
import ProfilePage from './components/ProfilePage.jsx'
import ReceiptCard from './components/ReceiptCard.jsx'
import AvatarSection from './components/AvatarSection.jsx'
import Authentication from './components/Authentication.jsx'
import Scroll from './components/Scroll.jsx'
import SearchComponent from './components/SearchComponent.jsx'



const router=createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/',
        element:<Authentication/>
      },
      {
        path:'/login',
        
        element:
          
        <Login/>
      
      },
      {
        path:'/books',
        element:<Booksapi/>
      },
     



      {
        path:'/home',
        element:<Home/>
      },
      {
        path:'/book-page',
        element:<Bookspage/>
      },
      {
        path:"description",
        element:<Description/>
      },
      {
        path:'all-cart',
        element:<Allcart/>
      },
      {
        path:'test',
        element:<Testcard/> 

      },
      {
        path:'/proceed',
        element:<Main/>,
        children:[
          {
            path:"/proceed/address",
            element:<Address/>
          },
          {
            path:"/proceed/orderSumary",
            element:<Ordersumary/>
          }
        ]
      },
      {
        path:"/outofstock",
        element:<OutOfStock/>
      }
      ,
      {
        path:'/no-more-items-available',
        element:<NoMoreItemsAvailable/>
      },
      {
        path:'/test2',
        element:<Test2/>
      }
      ,
      {
        path:'/preview',
        element:<Previewcard/>
      },
      {
        path:"/load",
        element:<LoadingSpinner/>
      },
      {
        path:'/orderPlaced',
        element:<OrderPlaced/>
      },
      {
        path:'/profilePage',
        element:<ProfilePage/>
      },
      {
        path:'/orderReceipt',
        element:<ReceiptCard/>
      },
      {
        path:'/AvatarSection',
        element:<AvatarSection/>
      },
      {
        path:'/scroll',
        element:<Scroll/>
            },
            {
              path:'/search',
              element:<SearchComponent/>
            }
      
     

      

    ]

  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition: Bounce
/>
  </Provider>
)
