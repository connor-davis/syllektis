import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Input,
    Row,
} from 'reactstrap'
import React, { useState } from 'react'

export const Syllektions = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const toggle = () => setDropdownOpen((prevState) => !prevState)
    return (
        <>
            <Row color="faded" light className="p-0 m-2 align-items-center border shadow-sm">
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                    className="p-2"
                >
                    <Input
                        type="text"
                        className="border-focus mr-2"
                        style={{ boxShadow: 'none' }}
                        placeholder="Syllektor ID"
                    />
                    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                        <DropdownToggle
                            tag="span"
                            className="m-2 mr-4 p-2 text-primary text-center pointer"
                            data-toggle="dropdown"
                            aria-expanded={dropdownOpen}
                            caret
                        >
                            Material
                        </DropdownToggle>
                        <DropdownMenu className="text-center p-1">
                            <div onClick={toggle} className="p-2 pointer">## Material ##</div>
                        </DropdownMenu>
                    </Dropdown>
                    <Button color="primary" className="mr-2">Submit</Button>
                    <Button color="primary">Export</Button>
                </div>
            </Row>
        </>
    )
}
