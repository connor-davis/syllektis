import { Button, Col, Input, Row, Table } from 'reactstrap'
import { FaCheck, FaPen, FaTrash } from 'react-icons/fa'
import React, { useState } from 'react'

import TableEditing from '../../components/editing/table.editing'

const Syllektors = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [idNumber, setIdNumber] = useState('')

    const [syllektors, setSyllektors] = useState([])

    const addSyllektor = () => {
        if (
            firstName !== '' &&
            lastName !== '' &&
            phoneNumber !== '' &&
            idNumber !== ''
        )
            setFirstName('')
        setLastName('')
        setPhoneNumber('')
        setIdNumber('')

        return setSyllektors((state) => [
            ...state,
            { firstName, lastName, phoneNumber, idNumber, editing: false },
        ])
    }

    const editSyllektor = (idNumber) => {
        return setSyllektors((state) =>
            state.map((syllektor) => {
                if (syllektor.idNumber === idNumber) syllektor.editing = true
                return syllektor
            })
        )
    }

    const completeEdit = (edited) => {
        return setSyllektors((state) =>
            state.map((syllektor) => {
                if (syllektor.idNumber === edited.idNumber) {
                    console.log(edited)
                    if (
                        edited.firstName !== '' &&
                        edited.lastName !== '' &&
                        edited.phoneNumber !== '' &&
                        edited.idNumber !== ''
                    )
                        return edited
                }
                return syllektor
            })
        )
    }

    const removeSyllektor = (idNumber) => {
        return setSyllektors((state) =>
            state.filter((syllektor) => syllektor.idNumber !== idNumber)
        )
    }

    return (
        <>
            <Row
                color="faded"
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
                        className="border-focus w-75p mr-2"
                        style={{ boxShadow: 'none' }}
                        placeholder="First Name"
                        value={firstName}
                        onChange={({ target }) => setFirstName(target.value)}
                    />
                    <Input
                        type="text"
                        className="border-focus w-75p mr-2"
                        style={{ boxShadow: 'none' }}
                        placeholder="Last Name"
                        value={lastName}
                        onChange={({ target }) => setLastName(target.value)}
                    />
                    <Input
                        type="text"
                        className="border-focus w-100p mr-2"
                        style={{ boxShadow: 'none' }}
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={({ target }) => setPhoneNumber(target.value)}
                    />
                    <Input
                        type="text"
                        className="border-focus w-100p mr-2"
                        style={{ boxShadow: 'none' }}
                        placeholder="ID Number"
                        value={idNumber}
                        onChange={({ target }) => setIdNumber(target.value)}
                    />
                    <Button
                        color="primary"
                        className="mr-2"
                        onClick={() => addSyllektor()}
                    >
                        <div>Add</div>
                    </Button>
                </div>
            </Row>

            <Col className="px-2 m-0">
                <div className="border shadow-sm">
                    <Table className="p-0 m-0" bordered hover>
                        <thead>
                            <tr className="text-center">
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Phone Number</th>
                                <th>ID Number</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {syllektors.map((syllektor, index) => {
                                return syllektor.editing === true ? (
                                    <TableEditing
                                        key={index}
                                        index={index}
                                        editingSyllektor={syllektor}
                                        completeEdit={(edited) =>
                                            completeEdit(edited)
                                        }
                                    />
                                ) : (
                                    <tr
                                        key={index + syllektor.idNumber}
                                        className="text-center"
                                        style={{ alignItems: 'center' }}
                                    >
                                        <th>{index + 1}</th>
                                        <td>{syllektor.firstName}</td>
                                        <td>{syllektor.lastName}</td>
                                        <td>{syllektor.phoneNumber}</td>
                                        <td>{syllektor.idNumber}</td>
                                        <td>
                                            <Row tag="div" className="justify-content-center p-0 m-0">
                                                <Button
                                                    outline
                                                    color="info"
                                                    className="m-0 mr-2 p-0 px-2 py-1"
                                                    style={{ height: 'auto', fontSize: 11 }}
                                                    title="Edit"
                                                    onClick={() => {
                                                        editSyllektor(
                                                            syllektor.idNumber
                                                        )
                                                    }}
                                                >
                                                    <FaPen />
                                                </Button>
                                                <Button
                                                    outline
                                                    color="danger"
                                                    className="m-0 p-0 px-2 py-1"
                                                    style={{ height: 'auto', fontSize: 11 }}
                                                    title="Delete"
                                                    onClick={() => {
                                                        removeSyllektor(
                                                            syllektor.idNumber
                                                        )
                                                    }}
                                                >
                                                    <FaTrash />
                                                </Button>
                                            </Row>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>

                    {syllektors.length > 0 ? (
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
                            <h5>No Syllektors</h5>
                        </Row>
                    )}
                </div>
            </Col>
        </>
    )
}

export default Syllektors
