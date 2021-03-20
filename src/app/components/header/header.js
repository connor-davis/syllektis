import { Button, Nav, NavItem, Navbar } from 'reactstrap'

import { Link } from 'react-router-dom'
import React from 'react'

export const Header = () => {
    return (
        <div>
            <Navbar color="faded" className="bg-light m-0 p-1 shadow-sm">
                <div className="me-auto"></div>
                <Nav>
                    <NavItem>
                        <Link to="/syllektions">
                            <Button outline color="primary" className="mr-2">
                                Collections
                            </Button>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/syllektors">
                            <Button outline color="primary" className="mr-2">
                                Collectors
                            </Button>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/materials">
                            <Button outline color="primary">
                                Materials
                            </Button>
                        </Link>
                    </NavItem>
                </Nav>
            </Navbar>
        </div>
    )
}
