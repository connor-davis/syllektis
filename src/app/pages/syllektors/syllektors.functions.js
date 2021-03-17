import { setSyllektors } from '../../util/slices/syllektors.slice'

const ipcRenderer = window.ipcRenderer

export const loadSyllektors = (dispatch, currentSyllektors) => {
    if (ipcRenderer) {
        ipcRenderer.send('API_db-get', { key: 'syllektors' })
        ipcRenderer.on('API_db-get-success', ({ key, value }) => {
            if (key === 'syllektors')
                dispatch(setSyllektors(JSON.parse(value.value)))
        })
        ipcRenderer.on('API_db-get-failure', ({ key }) => {
            if (key === 'syllektors') {
                ipcRenderer.send('API_db-put', {
                    key: 'syllektors',
                    value: JSON.stringify(currentSyllektors),
                })
                ipcRenderer.on('API_db-put-success', () => {
                    ipcRenderer.send('API_db-get', { key: 'syllektors' })
                })
            }
        })
    }
}

export const addSyllektor = ({
    syllektors,
    setFirstName,
    setLastName,
    setPhoneNumber,
    setIdNumber,
    dispatch,
    firstName,
    lastName,
    phoneNumber,
    idNumber,
}) => {
    if (ipcRenderer) {
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
    } else {
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
}

export const editSyllektor = (syllektors, idNumber, dispatch) => {
    if (ipcRenderer) {
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
    }

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

export const completeEdit = (syllektors, edited, dispatch) => {
    if (ipcRenderer) {
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
    }

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

export const removeSyllektor = (syllektors, idNumber, dispatch) => {
    if (ipcRenderer) {
        ipcRenderer.send('API_db-put', {
            key: 'syllektors',
            value: JSON.stringify(
                syllektors.filter(
                    (syllektor) => syllektor.idNumber !== idNumber
                )
            ),
        })
    }

    return dispatch(
        setSyllektors(
            syllektors.filter((syllektor) => syllektor.idNumber !== idNumber)
        )
    )
}
