import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import { useSelector } from 'react-redux'

function NavBar() {
    const isAuthenticated = useSelector(state => state.isAuthenticated)
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>Todo App</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">{
                        isAuthenticated ? 'Log out' : ''
                    }</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavBar