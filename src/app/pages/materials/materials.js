import { Button, Col, Row, Table } from 'reactstrap'
import { FaPen, FaTrash } from 'react-icons/fa'
import {
    completeEdit,
    editMaterial,
    loadMaterials,
    removeMaterial,
} from './materials.functions'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import AddMaterialModal from '../../components/modals/add.material.modal'
import { ExportMaterialsCSV } from '../../util/export.functions'
import MaterialEditing from '../../components/modals/edit.material.modal'
import moment from 'moment'
import { selectMaterials } from '../../util/slices/materials.slice'

const Materials = () => {
    const dispatch = useDispatch()
    const materials = useSelector(selectMaterials)
    const [sortedMaterials, setSortedMaterials] = useState([])

    useEffect(() => {
        if (materials) loadMaterials(dispatch)
    }, [])

    useEffect(() => {
        let _sorted = [...materials].sort((_a, _b) => {
            if (_a.lastName > _b.lastName) return -1
            if (_a.lastName < _b.lastName) return 1
            return 0
        })
        setSortedMaterials(_sorted)
    }, [materials])

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
                    <AddMaterialModal modal={modalAdd} toggle={toggleAdd} />
                    <Button
                        color="primary"
                        className="mr-2"
                        onClick={toggleAdd}
                    >
                        <div>Add Material</div>
                    </Button>
                    <ExportMaterialsCSV
                        csvData={sortedMaterials}
                        fileName={`materials-data-${moment().format(
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
                                <th>Name</th>
                                <th>Type</th>
                                <th>Value</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedMaterials.map((material, index) => {
                                return (
                                    <tr
                                        key={index + material.idNumber}
                                        className="text-center"
                                        style={{
                                            alignItems: 'center',
                                        }}
                                    >
                                        {material.editing ? (
                                            <MaterialEditing
                                                key={index}
                                                index={index}
                                                isEditing={material.editing}
                                                editingMaterial={material}
                                                completeEdit={(edited) => {
                                                    completeEdit(
                                                        materials,
                                                        edited,
                                                        dispatch
                                                    )
                                                }}
                                            />
                                        ) : null}
                                        <th>{index + 1}</th>
                                        <td>{material.name}</td>
                                        <td>{material.type}</td>
                                        <td>R {material.value}</td>
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
                                                        editMaterial(
                                                            materials,
                                                            material,
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
                                                        removeMaterial(
                                                            materials,
                                                            material,
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

                    {materials.length > 0 ? (
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
                            <h5>No Materials</h5>
                        </Row>
                    )}
                </div>
            </Col>
        </>
    )
}

export default Materials
