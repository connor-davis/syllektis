import { Button, Col, Input, Row, Table } from 'reactstrap'
import { FaPen, FaTrash } from 'react-icons/fa'
import React, { useEffect, useState } from 'react'
import {
    addSyllektor,
    completeEdit,
    editSyllektor,
    removeSyllektor,
} from './syllektors.functions'
import {
    selectSyllektors,
    setSyllektors,
} from '../../util/slices/syllektors.slice'
import { useDispatch, useSelector } from 'react-redux'

import TableEditing from '../../components/editing/table.editing'

const ipcRenderer = window.ipcRenderer

const Syllektors = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [idNumber, setIdNumber] = useState('')

    const dispatch = useDispatch()
    const syllektors = useSelector(selectSyllektors)

    useEffect(() => {
        ipcRenderer.send('API_db-get', { key: 'syllektors' })
        ipcRenderer.on('API_db-get-success', ({ key, value }) => {
            if (key === 'syllektors')
                dispatch(setSyllektors(JSON.parse(value.value)))
        })
    }, [])

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
                        onClick={() =>
                            addSyllektor({
                                syllektors,
                                setFirstName,
                                setLastName,
                                setPhoneNumber,
                                setIdNumber,
                                dispatch,
                                firstName,
                                lastName,
                                phoneNumber,
                                idNumber,
                            })
                        }
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
                                            completeEdit(
                                                syllektors,
                                                edited,
                                                dispatch
                                            )
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
                                            <Row
                                                tag="div"
                                                className="justify-content-center p-0 m-0"
                                            >
                                                <Button
                                                    outline
                                                    color="info"
                                                    className="m-0 mr-2 p-0 px-2 py-1"
                                                    style={{
                                                        height: 'auto',
                                                        fontSize: 11,
                                                    }}
                                                    title="Edit"
                                                    onClick={() => {
                                                        editSyllektor(
                                                            syllektors,
                                                            syllektor.idNumber,
                                                            dispatch
                                                        )
                                                    }}
                                                >
                                                    <FaPen />
                                                </Button>
                                                <Button
                                                    outline
                                                    color="danger"
                                                    className="m-0 p-0 px-2 py-1"
                                                    style={{
                                                        height: 'auto',
                                                        fontSize: 11,
                                                    }}
                                                    title="Delete"
                                                    onClick={() => {
                                                        removeSyllektor(
                                                            syllektors,
                                                            syllektor.idNumber,
                                                            dispatch
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
