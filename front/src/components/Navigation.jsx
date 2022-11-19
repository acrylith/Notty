import React from 'react'
import { Button, Container, Dropdown, Nav, Navbar } from 'react-bootstrap'
import DropdownItem from 'react-bootstrap/esm/DropdownItem'
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu'
import { BiUserCircle } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import { logOut } from '../redux/authSlice'

export default function Navigation(props) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const NlogOut = () => {
    dispatch(logOut())
    navigate('/')
    window.location.reload()
  }
  return (
    <Navbar bg='primary' variant='dark' fixed='top'>
        <Container>
            <LinkContainer to='/'><Navbar.Brand>NOTTy</Navbar.Brand></LinkContainer>
            {isLoggedIn ?
              <Dropdown>
                <Dropdown.Toggle>
                  <BiUserCircle />
                </Dropdown.Toggle>
                <DropdownMenu>
                  <LinkContainer to='/home'><Dropdown.Item>Profile</Dropdown.Item></LinkContainer>
                  <Dropdown.Item as='button' onClick={() => NlogOut()}>Log out</Dropdown.Item>
                </DropdownMenu>
              </Dropdown>
              :
              <Nav>
                <LinkContainer to='/signup'><Nav.Link>Sign up</Nav.Link></LinkContainer>
                <LinkContainer to='/register'><Nav.Link>Register</Nav.Link></LinkContainer>
              </Nav>
            }
        </Container>
    </Navbar>
  )
}