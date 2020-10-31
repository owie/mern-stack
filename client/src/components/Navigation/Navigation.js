import React from 'react';
import { Navbar, NavbarBrand,  Container } from 'reactstrap';

const Navigation = (props) => {
  return (
    <div>
      <Navbar color="dark" dark expand="sm" className="mb-5">
        <Container>
        <NavbarBrand href="/" className="mr-auto">MERN</NavbarBrand>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navigation;