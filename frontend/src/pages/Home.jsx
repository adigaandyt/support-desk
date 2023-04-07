import React from 'react'
import { Link } from 'react-router-dom'
import {FaRegFileAlt,FaFolderOpen} from 'react-icons/fa'

function Home() {
  return (
    <>
      <section className="heading"> 
      <h1>What do u need help with</h1>
      <p>Choose one</p>
      </section>

      <Link to='/new-ticket' className ='btn btn-reverse btn-block'>
        <FaRegFileAlt/>New Ticket
      </Link>
      <Link to='/tickets' className ='btn btn-block'>
        <FaFolderOpen/>My Tickets
    </Link>
    </>
  )
}

export default Home
