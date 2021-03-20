import { Button, Col, Row, Table } from 'reactstrap'
import { FaPen, FaTrash } from 'react-icons/fa'
import React, { useCallback, useEffect, useState } from 'react'
import {
    completeEdit,
    editSyllektor,
    loadSyllektors,
    removeSyllektor,
} from './syllektors.functions'
import { useDispatch, useSelector } from 'react-redux'

import AddSyllektorModal from '../../components/modals/add.syllektor.modal'
import { ExportCSV } from '../../util/export.functions'
import SyllektorEditing from '../../components/modals/edit.syllektor.modal'
import moment from 'moment'
import { selectSyllektors } from '../../util/slices/syllektors.slice'

const Syllektors = () => {
    const dispatch = useDispatch()
    const syllektors = useSelector(selectSyllektors)

    useEffect(() => {
        if (syllektors) loadSyllektors(dispatch)
    }, [])

    const [modalAdd, setModalAdd] = useState(false)
    const toggleAdd = () => setModalAdd(!modalAdd)

    return (
        <>
            <Row
                color="faded"
                light={true}
                className="p-0 m-2 bg-light align-items-end border shadow-sm"
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
                    <AddSyllektorModal
                        modal={modalAdd}
                        toggle={toggleAdd}
                        syllektors={syllektors}
                    />
                    <Button
                        color="primary"
                        className="mr-2"
                        onClick={toggleAdd}
                    >
                        <div>Add Collector</div>
                    </Button>
                    <ExportCSV
                        csvData={syllektors}
                        fileName={`syllektors-data-${moment().format(
                            'DD/MM/YYYY'
                        )}`}
                    />
                </div>
            </Row>

            <Col className="px-2 m-0">
                <div className="shadow-sm bg-light">
                    <Table className="p-0 m-0" bordered hover responsive>
                        <thead>
                            <tr className="text-center">
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Phone Number</th>
                                <th>ID Number</th>
                                <th>Account Number</th>
                                <th>Branch Code</th>
                                <th>Bank Name</th>
                                <th>Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {syllektors.map((syllektor, index) => {
                                return (
                                    <tr
                                        key={index + syllektor.idNumber}
                                        className="text-center"
                                        style={{
                                            alignItems: 'center',
                                        }}
                                    >
                                        {syllektor.editing ? (
                                            <SyllektorEditing
                                                key={index}
                                                index={index}
                                                isEditing={syllektor.editing}
                                                editingSyllektor={syllektor}
                                                completeEdit={(edited) =>
                                                    completeEdit(
                                                        syllektors,
                                                        edited,
                                                        dispatch
                                                    )
                                                }
                                            />
                                        ) : null}
                                        <th>{index + 1}</th>
                                        <td>{syllektor.firstName}</td>
                                        <td>{syllektor.lastName}</td>
                                        <td>{syllektor.phoneNumber}</td>
                                        <td>{syllektor.idNumber}</td>
                                        <td>{syllektor.accountNumber}</td>
                                        <td>{syllektor.branchCode}</td>
                                        <td>{syllektor.bankName}</td>
                                        <td>{syllektor.address}</td>
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
                                                            syllektor,
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
                                                            syllektor,
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
