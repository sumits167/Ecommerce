import React from 'react'
import { Outlet } from 'react-router-dom'
import Proceed from './Proceedd'
import Address from './Address'

function Main() {
  return (
    <div>
        <Proceed/>
       
        <Outlet/>
    </div>
  )
}

export default Main