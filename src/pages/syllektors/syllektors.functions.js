const addSyllektor = ({
    setFirstName,
    setLastName,
    setPhoneNumber,
    setIdNumber,
}) => {
    if (
        firstName !== '' &&
        lastName !== '' &&
        phoneNumber !== '' &&
        idNumber !== ''
    ) {
        setFirstName('')
        setLastName('')
        setPhoneNumber('')
        setIdNumber('')

        ipcRenderer.send('API_db-put', {
            key: 'syllektors',
            value: JSON.stringify([
                ...syllektors,
                {
                    firstName,
                    lastName,
                    phoneNumber,
                    idNumber,
                    editing: false,
                },
            ]),
        })

        return dispatch(
            setSyllektors([
                ...syllektors,
                {
                    firstName,
                    lastName,
                    phoneNumber,
                    idNumber,
                    editing: false,
                },
            ])
        )
    }
}

const editSyllektor = (idNumber) => {
    ipcRenderer.send('API_db-put', {
        key: 'syllektors',
        value: JSON.stringify(
            syllektors.map((syllektor) => {
                if (syllektor.idNumber === idNumber)
                    return { ...syllektor, editing: true }
                return syllektor
            })
        ),
    })

    return dispatch(
        setSyllektors(
            syllektors.map((syllektor) => {
                if (syllektor.idNumber === idNumber)
                    return { ...syllektor, editing: true }
                return syllektor
            })
        )
    )
}

const completeEdit = (edited) => {
    ipcRenderer.send('API_db-put', {
        key: 'syllektors',
        value: JSON.stringify(
            syllektors.map((syllektor) => {
                if (syllektor.idNumber === edited.idNumber) {
                    if (
                        edited.firstName !== '' &&
                        edited.lastName !== '' &&
                        edited.phoneNumber !== '' &&
                        edited.idNumber !== ''
                    )
                        return edited
                }
                return syllektor
            })
        ),
    })

    return dispatch(
        setSyllektors(
            syllektors.map((syllektor) => {
                if (syllektor.idNumber === edited.idNumber) {
                    if (
                        edited.firstName !== '' &&
                        edited.lastName !== '' &&
                        edited.phoneNumber !== '' &&
                        edited.idNumber !== ''
                    )
                        return edited
                }
                return syllektor
            })
        )
    )
}

const removeSyllektor = (idNumber) => {
    ipcRenderer.send('API_db-put', {
        key: 'syllektors',
        value: JSON.stringify(
            syllektors.filter((syllektor) => syllektor.idNumber !== idNumber)
        ),
    })

    return dispatch(
        setSyllektors(
            syllektors.filter((syllektor) => syllektor.idNumber !== idNumber)
        )
    )
}

module.exports = { addSyllektor, editSyllektor, completeEdit, removeSyllektor }
