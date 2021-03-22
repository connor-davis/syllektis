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

import { addMaterial } from '../../pages/materials/materials.functions'
import { useDispatch } from 'react-redux'

let AddMaterialModal = ({ modal, toggle, materials }) => {
    let dispatch = useDispatch()

    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [value, setValue] = useState('')

    const [visible, setVisible] = useState(false)
    const toggleAlert = () => setVisible(!visible)

    let toggleModal = () => {
        toggle()

        setName('')
        setType('')
        setValue('')
    }

    return (
        <Modal isOpen={modal} toggle={toggleModal}>
            <ModalHeader
                toggle={() => {
                    toggleModal()
                    setVisible(false)
                }}
            >
                Add Material
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
                        if (name !== '' && type !== '' && value !== '') {
                            addMaterial({
                                materials,
                                dispatch,
                                name,
                                type,
                                value,
                                setName,
                                setType,
                                setValue,
                            })

                            toggleModal()
                            setVisible(false)
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

export default AddMaterialModal
