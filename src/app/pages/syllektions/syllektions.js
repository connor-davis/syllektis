import { Button, Col, Row, Table } from 'reactstrap'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ExportCSV } from '../../util/export.functions'
import { loadSyllektions } from './syllektions.functions'
import moment from 'moment'
import { selectSyllektions } from '../../util/slices/syllektions.slice'

const Syllektions = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [idNumber, setIdNumber] = useState('')

    const dispatch = useDispatch()
    const syllektions = useSelector(selectSyllektions)

    useEffect(() => {
        if (syllektions) loadSyllektions(dispatch, syllektions)
    }, [])

    const [dropdownOpen, setDropdownOpen] = useState(false)
    const toggle = () => setDropdownOpen((prevState) => !prevState)

    return (
        <>
            <Row
                color="faded"
                className="p-0 m-2 align-items-center bg-light border shadow-sm"
            >
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}
                    className="p-2"
                >
                    {/* <Input
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
                    </Dropdown> */}
                    <Button color="primary" className="mr-2">
                        Add Collection
                    </Button>
                    <ExportCSV
                        csvData={syllektions}
                        fileName={`syllektions-data-${moment().format(
                            'DD/MM/YYYY'
                        )}`}
                    />
                </div>
            </Row>

            <Col className="px-2 m-0">
                <div className="shadow-sm bg-light">
                    <Table className="p-0 m-0" bordered hover responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>ID Number</th>
                                <th>Material</th>
                                <th>Mass</th>
                                <th>Date</th>
                                <th>Earned</th>
                            </tr>
                        </thead>
                        <tbody>
                            {syllektions.map((syllektion, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{syllektion.idNumber}</td>
                                    <td>{syllektion.material}</td>
                                    <td>{syllektion.mass}</td>
                                    <td>{syllektion.dateIn}</td>
                                    <td>{syllektion.tokensEarned}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    {syllektions.length > 0 ? (
                        <div
                            style={{
                                width: '100%',
                                height: 'auto',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        />
                    ) : (
                        <Row className="justify-content-center p-0 pt-2 m-0">
                            <h5>No Syllektions</h5>
                        </Row>
                    )}
                </div>
            </Col>
        </>
    )
}

export default Syllektions
