import { Button, Input } from 'reactstrap'
import React, { useState } from 'react'

import { FaCheck } from 'react-icons/fa'

const TableEditing = ({ index, editingSyllektor, completeEdit }) => {
    const [firstName, setFirstName] = useState(editingSyllektor.firstName)
    const [lastName, setLastName] = useState(editingSyllektor.lastName)
    const [phoneNumber, setPhoneNumber] = useState(editingSyllektor.phoneNumber)
    const [idNumber, setIdNumber] = useState(editingSyllektor.idNumber)
    const [accountNumber, setAccountNumber] = useState(
        editingSyllektor.accountNumber
    )
    const [branchCode, setBranchCode] = useState(editingSyllektor.branchCode)

    return (
        <tr
            key={index + editingSyllektor.id}
            className="text-center"
            style={{ alignItems: 'center' }}
        >
            <th>{index + 1}</th>
            <td>
                <Input
                    type="text"
                    className="border-focus mr-2 px-2 py-0 m-0"
                    style={{ boxShadow: 'none' }}
                    placeholder="First Name"
                    value={firstName}
                    onChange={({ target }) => setFirstName(target.value)}
                />
            </td>
            <td>
                <Input
                    type="text"
                    className="border-focus mr-2 px-2 py-0 m-0"
                    style={{ boxShadow: 'none' }}
                    placeholder="Last Name"
                    value={lastName}
                    onChange={({ target }) => setLastName(target.value)}
                />
            </td>
            <td>
                <Input
                    type="text"
                    className="border-focus mr-2 px-2 py-0 m-0"
                    style={{ boxShadow: 'none' }}
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={({ target }) => setPhoneNumber(target.value)}
                />
            </td>
            <td>
                <Input
                    type="text"
                    className="border-focus mr-2 px-2 py-0 m-0"
                    style={{ boxShadow: 'none' }}
                    placeholder="ID Number"
                    value={idNumber}
                    onChange={({ target }) => setIdNumber(target.value)}
                />
            </td>
            <td>
                <Input
                    type="text"
                    className="border-focus mr-2 px-2 py-0 m-0"
                    style={{ boxShadow: 'none' }}
                    placeholder="Account Number"
                    value={accountNumber}
                    onChange={({ target }) => setAccountNumber(target.value)}
                />
            </td>
            <td>
                <Input
                    type="text"
                    className="border-focus mr-2 px-2 py-0 m-0"
                    style={{ boxShadow: 'none' }}
                    placeholder="Branch Code"
                    value={branchCode}
                    onChange={({ target }) => setBranchCode(target.value)}
                />
            </td>
            <td>
                <Button
                    outline
                    color="primary"
                    className="m-0 p-0 px-2 py-2"
                    style={{ height: '100%', fontSize: 11, lineHeight: '100%' }}
                    onClick={() =>
                        completeEdit({
                            ...editingSyllektor,
                            firstName,
                            lastName,
                            phoneNumber,
                            idNumber,
                            accountNumber,
                            branchCode,
                            editing: false,
                        })
                    }
                >
                    <FaCheck />
                </Button>
            </td>
        </tr>
    )
}

export default TableEditing
