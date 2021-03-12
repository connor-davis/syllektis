import { Nav, NavItem, NavLink, Navbar } from 'reactstrap'

import { Link } from 'react-router-dom'
import React from 'react'

export const Header = () => {
    return (
        <div>
            <Navbar color="faded" light>
                <div className="me-auto"></div>
                <Nav>
                    <NavItem>
                        <Link to="/">
                            <NavLink tag="div">Dashboard</NavLink>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/syllektions">
                            <NavLink tag="div">Syllektions</NavLink>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/syllektors">
                            <NavLink tag="div">Syllektors</NavLink>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/materials">
                            <NavLink tag="div">Materials</NavLink>
                        </Link>
                    </NavItem>
                </Nav>
            </Navbar>
        </div>
    )
}
