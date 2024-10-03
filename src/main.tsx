import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Login } from './pages/Login'
import { Profile } from './pages/Profile'
import { Dashboard } from './pages/Profile/Dashboard'
import { Settings } from './pages/Profile/Settings'
import { Posts } from './pages/Profile/Posts'
import { Followers } from './pages/Profile/Followers'
import { Followings } from './pages/Profile/Followings'
import { Search } from './pages/Profile/Search'
import { Account } from './pages/Profile/Search/Account'
import { Request } from './pages/Profile/Requests'

const routes = createBrowserRouter([
  {
    path:'',
    element:<Signup/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/profile',
    element:<Profile/>,
    children:[
      {
        path:'',
        element:<Dashboard/>
      },
      {
        path:'settings',
        element:<Settings/>
      },
      {
        path:'posts',
        element:<Posts/>
      },
      {
        path:'followers',
        element:<Followers/>
      },
      {
        path:'followings',
        element:<Followings/>
      },
      {
        path:'search',
        element:<Search/>
      },
      {
        path:':id',
        element:<Account/>
      },
      {
        path:'requests',
        element:<Request/>
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider  router={routes}>
    </RouterProvider>
  </StrictMode>,
)
