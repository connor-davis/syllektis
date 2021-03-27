import {
    Alert,
    Button,
    Col,
    Dropdown,
    DropdownMenu,
    DropdownToggle,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from 'reactstrap'
import { FaMinus, FaPlus, FaSearch } from 'react-icons/fa'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { FadeIn } from '../animations'
import { addSyllektion } from '../../pages/syllektions/syllektions.functions'
import { loadMaterials } from '../../pages/materials/materials.functions'
import { loadSyllektors } from '../../pages/syllektors/syllektors.functions'
import { selectMaterials } from '../../util/slices/materials.slice'
import { selectSyllektions } from '../../util/slices/syllektions.slice'
import { selectSyllektors } from '../../util/slices/syllektors.slice'

let AddSyllektionModal = ({ modal, toggle }) => {
    let dispatch = useDispatch()

    let syllektions = useSelector(selectSyllektions)
    let syllektors = useSelector(selectSyllektors)
    let materials = useSelector(selectMaterials)

    const [idNumber, setIdNumber] = useState('ID Number')
    const [idNumberSearch, setIdNumberSearch] = useState('')
    const [material, setMaterial] = useState('Material')
    const [mass, setMass] = useState('')

    const [dropdownOpen, setDropdownOpen] = useState(false)
    const toggleDropdown = () => {
        setDropdownOpen((prevState) => !prevState)
    }

    const [syllektorsDropdownOpen, setSyllektorsDropdownOpen] = useState(false)
    const toggleSyllektorsDropdown = () => {
        setSyllektorsDropdownOpen((prevState) => !prevState)
    }

    const [visible, setVisible] = useState(false)
    const toggleAlert = () => setVisible(!visible)

    let toggleModal = () => {
        toggle()

        setIdNumber('ID Number')
        setMaterial('Material')
        setMass('')
    }

    useEffect(() => {
        if (syllektors) loadSyllektors(dispatch)
        if (materials) loadMaterials(dispatch)
    }, [])

    let SyllektorsList = () => {
        return syllektors.length > 0 ? (
            syllektors
                .filter((_) => {
                    if (_.idNumber)
                        return _.idNumber.toString().startsWith(idNumberSearch)
                })
                .map((_) => (
                    <div
                        key={_._id}
                        onClick={() => {
                            toggleSyllektorsDropdown()
                            setIdNumber(_.idNumber)
                        }}
                        className="p-2 pointer"
                    >
                        {_.firstName} - {_.idNumber}
                    </div>
                ))
        ) : (
            <div
                onClick={() => {
                    toggleSyllektorsDropdown()
                }}
                className="p-2 pointer"
            >
                No Collectors
            </div>
        )
    }

    let MaterialsList = () => {
        return materials.length > 0 ? (
            materials.map((_) => (
                <div
                    key={_._id}
                    onClick={() => {
                        toggleDropdown()
                        setMaterial(_.name)
                    }}
                    className="p-2 pointer"
                >
                    {_.name}
                </div>
            ))
        ) : (
            <div
                onClick={() => {
                    toggleDropdown()
                }}
                className="p-2 pointer"
            >
                No Materials
            </div>
        )
    }

    return (
        <Modal isOpen={modal} toggle={toggleModal}>
            <ModalHeader
                toggle={() => {
                    toggleModal()
                    setVisible(false)
                }}
            >
                Add Collection
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
                    <Col md={6} className="mb-2">
                        <Dropdown
                            isOpen={syllektorsDropdownOpen}
                            toggle={toggleSyllektorsDropdown}
                            className="pointer"
                        >
                            <DropdownToggle
                                tag="span"
                                className="pointer btn btn-block btn-outline-primary"
                                data-toggle="dropdown"
                                aria-expanded={syllektorsDropdownOpen}
                                caret
                            >
                                {idNumber}
                            </DropdownToggle>
                            <DropdownMenu className="text-center p-1">
                                <FadeIn>
                                    <InputGroup className="mb-2">
                                        <InputGroupAddon
                                            addonType="prepend"
                                            color="primary"
                                        >
                                            <InputGroupText className="text-primary">
                                                <FaSearch />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            type="text"
                                            className="border-focus m-0 py-0"
                                            style={{ boxShadow: 'none' }}
                                            placeholder="Collector ID"
                                            value={idNumberSearch}
                                            onChange={({ target }) =>
                                                setIdNumberSearch(target.value)
                                            }
                                            required
                                        />
                                    </InputGroup>
                                    <SyllektorsList />
                                </FadeIn>
                            </DropdownMenu>
                        </Dropdown>
                    </Col>
                    <Col md={6} className="mb-2">
                        <Dropdown
                            isOpen={dropdownOpen}
                            toggle={toggleDropdown}
                            className="pointer"
                        >
                            <DropdownToggle
                                tag="span"
                                className="pointer btn btn-block btn-outline-primary"
                                data-toggle="dropdown"
                                aria-expanded={dropdownOpen}
                                caret
                            >
                                {material}
                            </DropdownToggle>
                            <DropdownMenu className="text-center p-1">
                                <FadeIn>
                                    <MaterialsList />
                                </FadeIn>
                            </DropdownMenu>
                        </Dropdown>
                    </Col>
                </InputGroup>
                <div
                    className="mt-2"
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}
                >
                    {/* <Col md={4}>
                        <div
                            className="mr-1"
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            Mass (kg):{' '}
                        </div>
                    </Col> */}
                    <Col md={6}>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Button
                                outline
                                color="primary"
                                className="m-0 p-0 px-2 py-1"
                                style={{
                                    height: 'auto',
                                    fontSize: 11,
                                }}
                                title="Remove"
                                onClick={() => {
                                    if (mass === '') setMass(parseFloat('0.0'))
                                    else if (mass >= 1)
                                        setMass(parseFloat(mass) - 1)
                                    else setMass(parseFloat('0.0'))
                                }}
                            >
                                <FaMinus />
                            </Button>
                            <Col className="text-center">
                                <Input
                                    type="number"
                                    className="border-focus text-center"
                                    style={{ boxShadow: 'none' }}
                                    placeholder="Mass (kg)"
                                    value={mass}
                                    onChange={({ target }) => {
                                        setMass(target.value)
                                    }}
                                    required
                                />
                            </Col>
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
                                    if (mass === '') setMass(parseFloat('1.0'))
                                    else setMass(parseFloat(mass) + 1)
                                }}
                            >
                                <FaPlus />
                            </Button>
                        </div>
                    </Col>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button
                    color="primary"
                    onClick={() => {
                        if (
                            idNumber !== '' &&
                            material !== '' &&
                            material !== 'Material' &&
                            mass !== ('' || 0)
                        ) {
                            addSyllektion({
                                syllektions,
                                dispatch,
                                idNumber,
                                materials,
                                material,
                                mass,
                                setIdNumber,
                                setMaterial,
                                setMass,
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

export default AddSyllektionModal
