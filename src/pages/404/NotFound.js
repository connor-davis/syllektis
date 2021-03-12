import { Button, Col, Row } from 'reactstrap'
import { Link, useLocation } from 'react-router-dom'
import React, { useEffect } from 'react'

export const NotFound = () => {
    let location = useLocation()

    useEffect(() => {
        console.log('Not Found')
    })

    return (
        <Col className="justify-content-center p-0 m-0">
            <Row className="justify-content-center p-0 m-0">
                <h3>
                    No match for <code>{location.pathname}</code>
                </h3>
            </Row>

            <Row className="justify-content-center p-0 m-0">
                <Link to="/">
                    <Button color="primary">Go Home</Button>
                </Link>
            </Row>
        </Col>
    )
}
