import { Button, Nav, NavItem, Navbar } from 'reactstrap'

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
                            <Button outline color="primary" className="mr-2">
                                Dashboard
                            </Button>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/syllektions">
                            <Button outline color="primary" className="mr-2">
                                Syllektions
                            </Button>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/syllektors">
                            <Button outline color="primary" className="mr-2">
                                Syllektors
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
