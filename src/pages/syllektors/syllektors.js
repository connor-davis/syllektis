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

const Syllektors = () => {
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
                        placeholder="First Name"
                        style={{
                            width: '75%',
                        }}
                    />
                    <Input
                        type="text"
                        className="border-focus mr-2"
                        style={{ boxShadow: 'none' }}
                        placeholder="Last Name"
                        style={{
                            width: '75%',
                        }}
                    />
                    <Input
                        type="text"
                        className="border-focus mr-2"
                        style={{ boxShadow: 'none' }}
                        placeholder="Phone Number"
                        style={{
                            width: '100%',
                        }}
                    />
                    <Input
                        type="text"
                        className="border-focus mr-2"
                        style={{ boxShadow: 'none' }}
                        placeholder="ID Number"
                        style={{
                            width: '100%',
                        }}
                    />
                    <Button color="primary" className="mr-2">
                        <div>Add</div>
                    </Button>
                </div>
            </Row>

            <Col className="px-2 m-0">
                <Table className="border shadow-sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone Number</th>
                            <th>ID Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>+27 67 892 8430</td>
                            <td>0302105185677</td>
                        </tr>
                    </tbody>
                </Table>
            </Col>
        </>
    )
}

export default Syllektors
