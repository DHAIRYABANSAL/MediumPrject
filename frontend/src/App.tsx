import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { FullBlog } from './pages/FullBlog'
import { Blogs } from './pages/Blogs'
import { Publish } from './pages/Publish'
import { Navbar } from './components/Navbar'

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path='/signup' element = {<Signup/>}/>
        <Route path='signin' element = {<Signin/>}/>
        <Route path='/blog/:id' element = {<FullBlog/>}/>
        <Route path='/blogs' element = {<Blogs/>}/>
        <Route path= "/publish" element = {<Publish/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App