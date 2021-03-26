import { Button, Col, Row, Table } from 'reactstrap'
import { FaPen, FaTrash } from 'react-icons/fa'
import React, { useEffect, useState } from 'react'
import {
    completeEdit,
    editSyllektion,
    loadSyllektions,
    removeSyllektion,
} from './syllektions.functions'
import { useDispatch, useSelector } from 'react-redux'

import AddSyllektionModal from '../../components/modals/add.syllektion.modal'
import { ExportSyllektionsCSV } from '../../util/export.functions'
import SyllektionEditing from '../../components/modals/edit.syllektion.modal'
import moment from 'moment'
import { selectSyllektions } from '../../util/slices/syllektions.slice'

const Syllektions = () => {
    const dispatch = useDispatch()
    const syllektions = useSelector(selectSyllektions)
    const [sortedSyllektions, setSortedSyllektions] = useState([])

    useEffect(() => {
        if (syllektions) loadSyllektions(dispatch)
    }, [])

    useEffect(() => {
        let _sorted = [...syllektions].sort((_a, _b) => {
            if (_a.dateIn > _b.dateIn) return -1
            if (_a.dateIn < _b.dateIn) return 1
            return 0
        })
        setSortedSyllektions(_sorted)
    }, [syllektions])

    const [modalAdd, setModalAdd] = useState(false)
    const toggleAdd = () => setModalAdd(!modalAdd)

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
                    <AddSyllektionModal modal={modalAdd} toggle={toggleAdd} />
                    <Button
                        color="primary"
                        className="mr-2"
                        onClick={toggleAdd}
                    >
                        Add Collection
                    </Button>
                    <ExportSyllektionsCSV
                        csvData={sortedSyllektions}
                        fileName={`syllektions-data-${moment().format(
                            'DD/MM/YYYY'
                        )}`}
                    />
                </div>
            </Row>

            <Col className="px-2 m-0">
                <div className="shadow-sm bg-light">
                    <Table
                        className="p-0 m-0"
                        bordered
                        hover
                        responsive
                        style={{
                            width: '100%',
                        }}
                    >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>ID Number</th>
                                <th>Material</th>
                                <th>Mass (kg)</th>
                                <th>Date</th>
                                <th>Earned</th>
                                <th
                                    style={{
                                        minWidth: '100px',
                                        maxWidth: '100px',
                                    }}
                                ></th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedSyllektions.map((syllektion, index) => (
                                <tr key={index}>
                                    {syllektion.editing ? (
                                        <SyllektionEditing
                                            key={index}
                                            index={index}
                                            isEditing={syllektion.editing}
                                            editingSyllektion={syllektion}
                                            completeEdit={(edited, materials) =>
                                                completeEdit(
                                                    syllektions,
                                                    edited,
                                                    materials,
                                                    dispatch
                                                )
                                            }
                                        />
                                    ) : null}
                                    <th scope="row">{index + 1}</th>
                                    <td>{syllektion.idNumber}</td>
                                    <td>{syllektion.material}</td>
                                    <td>{syllektion.mass}</td>
                                    <td>
                                        {moment(syllektion.dateIn).format(
                                            'DD/MM/YYYY'
                                        )}
                                    </td>
                                    <td>R {syllektion.earned}</td>
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
                                                    editSyllektion(
                                                        syllektions,
                                                        syllektion,
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
                                                    removeSyllektion(
                                                        syllektions,
                                                        syllektion,
                                                        dispatch
                                                    )
                                                }}
                                            >
                                                <FaTrash />
                                            </Button>
                                        </Row>
                                    </td>
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
                            <h5>No Collections</h5>
                        </Row>
                    )}
                </div>
            </Col>
        </>
    )
}

export default Syllektions
