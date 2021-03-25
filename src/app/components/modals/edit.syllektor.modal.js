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

import { FaCheck } from 'react-icons/fa'

const SyllektorEditing = ({
    index,
    isEditing = false,
    editingSyllektor,
    completeEdit,
}) => {
    const [firstName, setFirstName] = useState(editingSyllektor.firstName)
    const [lastName, setLastName] = useState(editingSyllektor.lastName)
    const [phoneNumber, setPhoneNumber] = useState(editingSyllektor.phoneNumber)
    const [idNumber, setIdNumber] = useState(editingSyllektor.idNumber)
    const [accountNumber, setAccountNumber] = useState(
        editingSyllektor.accountNumber
    )
    const [branchCode, setBranchCode] = useState(editingSyllektor.branchCode)
    const [bankName, setBankName] = useState(editingSyllektor.bankName)
    const [address, setAddress] = useState(
        editingSyllektor.address.split(', ')[0]
    )
    const [city, setCity] = useState(editingSyllektor.address.split(', ')[1])
    const [postalCode, setPostalCode] = useState(
        editingSyllektor.address.split(', ')[2]
    )
    const [province, setProvince] = useState(
        editingSyllektor.address.split(', ')[3]
    )

    const [visible, setVisible] = useState(false)
    const toggleAlert = () => setVisible(!visible)

    const [modal, setModal] = useState(isEditing)
    const toggle = () => setModal(!modal)

    const completeEditSyllektor = () => {
        setCity('')
        setPostalCode('')
        setProvince('')

        completeEdit({
            ...editingSyllektor,
            firstName,
            lastName,
            phoneNumber,
            idNumber,
            accountNumber,
            branchCode,
            bankName,
            address: `${address}, ${city}, ${postalCode}, ${province}`,
            editing: false,
        })

        toggle()
        setVisible(false)
    }

    return (
        <Modal
            isOpen={modal}
            toggle={() => {
                completeEditSyllektor()
            }}
        >
            <ModalHeader
                toggle={() => {
                    completeEditSyllektor()
                }}
            >
                Edit Collector
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
                    className="border-focus mb-4"
                    style={{ boxShadow: 'none' }}
                    placeholder="ID Number"
                    value={idNumber}
                    onChange={({ target }) => setIdNumber(target.value)}
                    required
                />
                <Input
                    type="text"
                    className="border-focus mb-2 mt-4"
                    style={{ boxShadow: 'none' }}
                    placeholder="Account Number"
                    value={accountNumber}
                    onChange={({ target }) => setAccountNumber(target.value)}
                    required
                />
                <InputGroup>
                    <Input
                        type="text"
                        className="border-focus mr-1"
                        style={{ boxShadow: 'none' }}
                        placeholder="Branch Code"
                        value={branchCode}
                        onChange={({ target }) => setBranchCode(target.value)}
                        required
                    />
                    <Input
                        type="text"
                        className="border-focus ml-1"
                        style={{ boxShadow: 'none' }}
                        placeholder="Bank Name"
                        value={bankName}
                        onChange={({ target }) => setBankName(target.value)}
                        required
                    />
                </InputGroup>
                <Input
                    type="text"
                    className="border-focus mb-2 mt-4"
                    style={{ boxShadow: 'none' }}
                    placeholder="Address"
                    value={address}
                    onChange={({ target }) => setAddress(target.value)}
                    required
                />
                <InputGroup>
                    <Input
                        type="text"
                        className="border-focus mr-1"
                        style={{ boxShadow: 'none' }}
                        placeholder="City"
                        value={city}
                        onChange={({ target }) => setCity(target.value)}
                        required
                    />
                    <Input
                        type="text"
                        className="border-focus mx-1"
                        style={{ boxShadow: 'none' }}
                        placeholder="Postal Code"
                        value={postalCode}
                        onChange={({ target }) => setPostalCode(target.value)}
                        required
                    />
                    <Input
                        type="text"
                        className="border-focus ml-1"
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
                            completeEditSyllektor()
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
                        completeEditSyllektor()
                    }}
                >
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>

        // onClick={() =>
        //     completeEdit({
        //         ...editingSyllektor,
        //         firstName,
        //         lastName,
        //         phoneNumber,
        //         idNumber,
        //         accountNumber,
        //         branchCode,
        //         editing: false,
        //     })
        // }
    )
}

export default SyllektorEditing
