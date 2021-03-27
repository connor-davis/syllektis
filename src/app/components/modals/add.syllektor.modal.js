import {
    Alert,
    Button,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from 'reactstrap'
import { FaAddressCard, FaBuilding, FaCity, FaCode, FaCodeBranch, FaRoad, FaSatellite } from 'react-icons/fa'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addSyllektor } from '../../functions/syllektors.functions'
import { selectSyllektors } from '../../util/slices/syllektors.slice'

let AddSyllektorModal = ({ modal, toggle }) => {
    let dispatch = useDispatch()

    let syllektors = useSelector(selectSyllektors)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [idNumber, setIdNumber] = useState('')
    const [accountNumber, setAccountNumber] = useState('')
    const [branchCode, setBranchCode] = useState('')
    const [bankName, setBankName] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [address, setAddress] = useState('')
    const [province, setProvince] = useState('')

    const [visible, setVisible] = useState(false)
    const toggleAlert = () => setVisible(!visible)

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader
                toggle={() => {
                    toggle()
                    setVisible(false)
                }}
            >
                Add Collector
            </ModalHeader>
            <ModalBody>
                <Alert color="danger" isOpen={visible} toggle={toggleAlert}>
                    Make sure nothing is empty.
                </Alert>
                <InputGroup>
                    <Input
                        type="text"
                        className="border-focus mb-2 mr-1"
                        style={{ boxShadow: 'none' }}
                        placeholder="First Name"
                        value={firstName}
                        onChange={({ target }) => setFirstName(target.value)}
                        required
                    />
                    <Input
                        type="text"
                        className="border-focus mb-2 ml-1"
                        style={{ boxShadow: 'none' }}
                        placeholder="Last Name"
                        value={lastName}
                        onChange={({ target }) => setLastName(target.value)}
                        required
                    />
                </InputGroup>
                <Input
                    type="text"
                    className="border-focus mb-2"
                    style={{ boxShadow: 'none' }}
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={({ target }) => setPhoneNumber(target.value)}
                    required
                />
                <Input
                    type="text"
                    className="border-focus mb-2"
                    style={{ boxShadow: 'none' }}
                    placeholder="ID Number"
                    value={idNumber}
                    onChange={({ target }) => setIdNumber(target.value)}
                    required
                />
                <InputGroup>
                    <InputGroupAddon
                        addonType="prepend"
                        color="primary"
                        className="mb-2 mt-3"
                    >
                        <InputGroupText className="text-primary px-1">
                            <FaAddressCard />
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input
                        type="text"
                        className="border-focus mb-2 mt-3"
                        style={{ boxShadow: 'none' }}
                        placeholder="Account Number"
                        value={accountNumber}
                        onChange={({ target }) =>
                            setAccountNumber(target.value)
                        }
                        required
                    />
                </InputGroup>
                <InputGroup>
                    <InputGroupAddon addonType="prepend" color="primary">
                        <InputGroupText className="text-primary px-1">
                            <FaCodeBranch />
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input
                        type="text"
                        className="border-focus mr-2"
                        style={{ boxShadow: 'none' }}
                        placeholder="Branch Code"
                        value={branchCode}
                        onChange={({ target }) => setBranchCode(target.value)}
                        required
                    />
                    <InputGroupAddon addonType="prepend" color="primary">
                        <InputGroupText className="text-primary px-1">
                            <FaBuilding />
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input
                        type="text"
                        className="border-focus"
                        style={{ boxShadow: 'none' }}
                        placeholder="Bank Name"
                        value={bankName}
                        onChange={({ target }) => setBankName(target.value)}
                        required
                    />
                </InputGroup>
                <InputGroup>
                    <InputGroupAddon
                        addonType="prepend"
                        color="primary"
                        className="mb-2 mt-4"
                    >
                        <InputGroupText className="text-primary px-1">
                            <FaRoad />
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input
                        type="text"
                        className="border-focus mb-2 mt-4"
                        style={{ boxShadow: 'none' }}
                        placeholder="Address"
                        value={address}
                        onChange={({ target }) => setAddress(target.value)}
                        required
                    />
                </InputGroup>
                <InputGroup>
                    <InputGroupAddon addonType="prepend" color="primary">
                        <InputGroupText className="text-primary px-1">
                            <FaCity />
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input
                        type="text"
                        className="border-focus mr-2"
                        style={{ boxShadow: 'none' }}
                        placeholder="City"
                        value={city}
                        onChange={({ target }) => setCity(target.value)}
                        required
                    />
                    <InputGroupAddon addonType="prepend" color="primary">
                        <InputGroupText className="text-primary px-1">
                            <FaCode />
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input
                        type="text"
                        className="border-focus mr-2"
                        style={{ boxShadow: 'none' }}
                        placeholder="Postal Code"
                        value={postalCode}
                        onChange={({ target }) => setPostalCode(target.value)}
                        required
                    />
                    <InputGroupAddon addonType="prepend" color="primary">
                        <InputGroupText className="text-primary px-1">
                            <FaSatellite />
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input
                        type="text"
                        className="border-focus"
                        style={{ boxShadow: 'none' }}
                        placeholder="Province"
                        value={province}
                        onChange={({ target }) => setProvince(target.value)}
                        required
                    />
                </InputGroup>
            </ModalBody>
            <ModalFooter>
                <Button
                    color="primary"
                    onClick={() => {
                        if (
                            firstName !== '' &&
                            lastName !== '' &&
                            phoneNumber !== '' &&
                            idNumber !== '' &&
                            accountNumber !== '' &&
                            branchCode !== '' &&
                            bankName !== '' &&
                            address !== ''
                        ) {
                            setCity('')
                            setPostalCode('')
                            setProvince('')

                            addSyllektor({
                                syllektors,
                                setFirstName,
                                setLastName,
                                setPhoneNumber,
                                setIdNumber,
                                setAccountNumber,
                                setBranchCode,
                                setBankName,
                                setAddress,
                                dispatch,
                                firstName,
                                lastName,
                                phoneNumber,
                                idNumber,
                                accountNumber,
                                branchCode,
                                bankName,
                                address: `${address}, ${city}, ${postalCode}, ${province}`,
                            })
                            toggle()
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
                        toggle()
                        setVisible(false)
                    }}
                >
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default AddSyllektorModal
