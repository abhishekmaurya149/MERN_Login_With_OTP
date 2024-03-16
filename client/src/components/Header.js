import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          {/* <Navbar.Brand href="/home">roomlo</Navbar.Brand> */}
          <NavLink to="/" className='mt-3 mx-3 text-light text-decoration-none'>AbhiTechnical</NavLink>

          <Nav className="">
            <NavLink to="/register" className='mt-3 mx-2 text-light text-decoration-none'>Register</NavLink>
            <img src='' style={{width:50}} />
            
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default Header
