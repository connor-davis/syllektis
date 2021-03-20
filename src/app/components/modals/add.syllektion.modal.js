import {
    Alert,
    Button,
    Col,
    Dropdown,
    DropdownMenu,
    DropdownToggle,
    Input,
    InputGroup,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from 'reactstrap'
import { FaMinus, FaPlus } from 'react-icons/fa'
import React, { useState } from 'react'

import { useDispatch } from 'react-redux'

let AddSyllektionModal = ({ modal, toggle, syllektions }) => {
    let dispatch = useDispatch()

    const [idNumber, setIdNumber] = useState('')
    const [material, setMaterial] = useState('Material')
    const [mass, setMass] = useState(0)

    const [dropdownOpen, setDropdownOpen] = useState(false)
    const toggleDropdown = () => {
        setDropdownOpen((prevState) => !prevState)
    }

    const [visible, setVisible] = useState(false)
    const toggleAlert = () => setVisible(!visible)

    let toggleModal = () => {
        toggle()

        setIdNumber('')
        setMaterial('Material')
        setMass(0)
    }

    return (
        <Modal isOpen={modal} toggle={toggleModal}>
            <ModalHeader
                toggle={() => {
                    toggleModal()
                    setVisible(false)
                }}
            >
                Add Collector
            </ModalHeader>
            <ModalBody>
                <Alert color="danger" isOpen={visible} toggle={toggleAlert}>
                    Make sure nothing is empty.
                </Alert>
                <InputGroup
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <Col md={7} className="m-0 p-0">
                        <Input
                            type="text"
                            className="border-focus"
                            style={{ boxShadow: 'none' }}
                            placeholder="Syllektor ID"
                            value={idNumber}
                            onChange={({ target }) => setIdNumber(target.value)}
                            required
                        />
                    </Col>
                    <Col md={5} className="m-0 p-0">
                        <Dropdown
                            isOpen={dropdownOpen}
                            toggle={toggleDropdown}
                            className="m-2 p-2 text-primary text-center pointer"
                        >
                            <DropdownToggle
                                tag="span"
                                className="m-2 p-2 text-primary text-center pointer"
                                data-toggle="dropdown"
                                aria-expanded={dropdownOpen}
                                caret
                                style={{
                                    width: '100px',
                                }}
                            >
                                {material}
                            </DropdownToggle>
                            <DropdownMenu className="text-center p-1">
                                <div
                                    onClick={() => {
                                        toggleDropdown()
                                        setMaterial('Plastic')
                                    }}
                                    className="p-2 pointer"
                                >
                                    Plastic
                                </div>
                                <div
                                    onClick={() => {
                                        toggleDropdown()
                                        setMaterial('Glass')
                                    }}
                                    className="p-2 pointer"
                                >
                                    Glass
                                </div>
                            </DropdownMenu>
                        </Dropdown>
                    </Col>
                </InputGroup>
                <div
                    className="mt-2"
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <Col md={7} className="m-0 p-0">
                        <div
                            className="mr-4"
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            Mass (kg):{' '}
                        </div>
                    </Col>
                    <Col md={5} className="m-0 p-0">
                        <div
                            className="mt-2"
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Button
                                outline
                                color="primary"
                                className="m-0 mr-2 p-0 px-2 py-1"
                                style={{
                                    height: 'auto',
                                    fontSize: 11,
                                }}
                                title="Remove"
                                onClick={() => {
                                    if (mass === NaN) setMass(1)
                                    if (mass === NaN && mass > 0) setMass(0)
                                    if (mass > 0) setMass(mass - 1)
                                }}
                            >
                                <FaMinus />
                            </Button>
                            <Col className="text-center">{mass}</Col>
                            <Button
                                outline
                                color="primary"
                                className="m-0 p-0 px-2 py-1"
                                style={{
                                    height: 'auto',
                                    fontSize: 11,
                                }}
                                title="Add"
                                onClick={() => {
                                    if (mass === NaN) setMass(parseInt('1'))
                                    setMass(mass + 1)
                                }}
                            >
                                <FaPlus />
                            </Button>
                        </div>
                    </Col>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={() => {}}>
                    Continue
                </Button>{' '}
                <Button
                    color="secondary"
                    onClick={() => {
                        toggleModal()
                        setVisible(false)
                    }}
                >
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default AddSyllektionModal
