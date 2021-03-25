import {
    Alert,
    Button,
    Input,
    InputGroup,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from 'reactstrap'
import React, { useState } from 'react'

import { useDispatch } from 'react-redux'

let MaterialEditing = ({
    index,
    isEditing = false,
    editingMaterial,
    completeEdit,
}) => {
    let dispatch = useDispatch()

    const [name, setName] = useState(editingMaterial.name)
    const [type, setType] = useState(editingMaterial.type)
    const [value, setValue] = useState(editingMaterial.value)

    const [visible, setVisible] = useState(false)
    const toggleAlert = () => setVisible(!visible)

    const [modal, setModal] = useState(isEditing)
    const toggle = () => setModal(!modal)

    let toggleModal = () => {
        toggle()
    }

    const completeEditMaterial = () => {
        completeEdit({
            ...editingMaterial,
            name,
            type,
            value,
        })
        toggleModal()
        setVisible(false)
    }

    return (
        <Modal
            isOpen={modal}
            toggle={() => {
                completeEditMaterial()
            }}
        >
            <ModalHeader
                toggle={() => {
                    completeEditMaterial()
                }}
            >
                Edit Material
            </ModalHeader>
            <ModalBody>
                <Alert color="danger" isOpen={visible} toggle={toggleAlert}>
                    Make sure nothing is empty.
                </Alert>
                <Input
                    type="text"
                    className="border-focus mb-2"
                    style={{ boxShadow: 'none' }}
                    placeholder="Material Name"
                    value={name}
                    onChange={({ target }) => setName(target.value)}
                    required
                />
                <InputGroup>
                    <Input
                        type="text"
                        className="border-focus mr-2"
                        style={{ boxShadow: 'none' }}
                        placeholder="Material Type"
                        value={type}
                        onChange={({ target }) => setType(target.value)}
                        required
                    />
                    <Input
                        type="number"
                        className="border-focus"
                        style={{ boxShadow: 'none' }}
                        placeholder="Material Value (R/kg)"
                        value={value}
                        onChange={({ target }) => {
                            if (target.value >= 0 || target.value === '')
                                setValue(target.value)
                            else setValue(0)
                        }}
                        required
                    />
                </InputGroup>
            </ModalBody>
            <ModalFooter>
                <Button
                    color="primary"
                    onClick={() => {
                        if (name !== '' && type !== '' && value !== ('' || 0)) {
                            completeEditMaterial()
                        } else {
                            setVisible(true)
                        }
                    }}
                >
                    Continue
                </Button>{' '}
                <Button
                    color="secondary"
                    onClick={() => {
                        completeEditMaterial()
                    }}
                >
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default MaterialEditing
