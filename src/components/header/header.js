import { Nav, NavItem, NavLink, Navbar, NavbarBrand } from 'reactstrap'

import React from 'react'

export const Header = () => {
    return (
        <div>
            <Navbar color="faded" light>
                <div className="me-auto">
                </div>
                <Nav>
                    <NavItem>
                        <NavLink href="/">Dashboard</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/syllektions">Syllektions</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/syllektors">Syllektors</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/materials">Materials</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        </div>
    )
}
