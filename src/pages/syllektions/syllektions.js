import {
    Button,
    Col,
    Dropdown,
    DropdownMenu,
    DropdownToggle,
    Input,
    Row,
    Table,
} from 'reactstrap'
import React, { useState } from 'react'

const Syllektions = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const toggle = () => setDropdownOpen((prevState) => !prevState)
    return (
        <>
            <Row
                color="faded"
                light
                className="p-0 m-2 align-items-center border shadow-sm"
            >
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                    className="p-2"
                >
                    <Input
                        type="text"
                        className="border-focus mr-2"
                        style={{ boxShadow: 'none' }}
                        placeholder="Syllektor ID"
                    />
                    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                        <DropdownToggle
                            tag="span"
                            className="m-2 mr-4 p-2 text-primary text-center pointer"
                            data-toggle="dropdown"
                            aria-expanded={dropdownOpen}
                            caret
                        >
                            Material
                        </DropdownToggle>
                        <DropdownMenu className="text-center p-1">
                            <div onClick={toggle} className="p-2 pointer">
                                ## Material ##
                            </div>
                        </DropdownMenu>
                    </Dropdown>
                    <Button color="primary" className="mr-2">
                        Submit
                    </Button>
                    <Button color="primary">Export</Button>
                </div>
            </Row>

            <Col className="px-2 m-0">
                <Table className="border shadow-sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>ID Number</th>
                            <th>Material</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>0302105185677</td>
                            <td>PPE Plastic</td>
                        </tr>
                    </tbody>
                </Table>
            </Col>
        </>
    )
}

export default Syllektions
