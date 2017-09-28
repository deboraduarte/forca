import React, { Component } from 'react';
import logo from './logo.svg';

import './App.css';
import Budget from './Budget.js';
import { Navbar, 
        NavItem, 
        Nav, 
        NavDropdown, 
        MenuItem } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
        <div>
             <Navbar collapseOnSelect>
                <Navbar.Header>
                  <Navbar.Brand>
                    <a href="#">
                        <logo />
                    </a>
                  </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                  <NavItem eventKey={1} href="#">Sobre</NavItem>
                  <NavItem eventKey={2} href="#">Orçamento</NavItem>
                  <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                    <MenuItem eventKey={3.1}>Action</MenuItem>
                    <MenuItem eventKey={3.2}>Another action</MenuItem>
                    <MenuItem eventKey={3.3}>Something else here</MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey={3.4}>Separated link</MenuItem>
                  </NavDropdown>
                </Nav>
            </Navbar>
            <Budget />
        </div>
    );
  }
}

export default App;
