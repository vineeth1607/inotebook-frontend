import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';
import '../App.css';

const Customnavbar = () => {
    let location = useLocation();
    // useEffect(() => {
    //     console.log(location.pathname)
    // }, [location]);

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark" className='navbar navbar-custom'>
                <Container fluid>
                    <Navbar.Brand as={NavLink} to="/">iNotebook</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll>
                            <Nav.Link as={NavLink} to="/" style={{ color: location.pathname === "/" ? "rgb(210, 71, 225)" : "" }}  >Home</Nav.Link>
                            <Nav.Link as={NavLink} to="/about" style={{ color: location.pathname === "/about" ? "rgb(210, 71, 225)" : "" }} >About</Nav.Link>
                        </Nav>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>

    )
}

export default Customnavbar
