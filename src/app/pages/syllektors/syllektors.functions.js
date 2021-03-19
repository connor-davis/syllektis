import Database from '../../util/database'
import { setSyllektors } from '../../util/slices/syllektors.slice'
import { v4 } from 'uuid'

let database = new Database()

export const loadSyllektors = async (dispatch) =>
    dispatch(setSyllektors(await database.getAll()))

export const addSyllektor = ({
    syllektors,
    setFirstName,
    setLastName,
    setPhoneNumber,
    setIdNumber,
    setAccountNumber,
    setBranchCode,
    dispatch,
    firstName,
    lastName,
    phoneNumber,
    idNumber,
    accountNumber,
    branchCode,
}) => {
    if (
        firstName !== '' &&
        lastName !== '' &&
        phoneNumber !== '' &&
        idNumber !== '' &&
        accountNumber !== '' &&
        branchCode !== ''
    ) {
        setFirstName('')
        setLastName('')
        setPhoneNumber('')
        setIdNumber('')
        setAccountNumber('')
        setBranchCode('')

        let data = {
            firstName,
            lastName,
            phoneNumber,
            idNumber,
            accountNumber,
            branchCode,
            editing: false,
            _id: `syllektor:${v4()}`,
        }

        database.add(data, (added) =>
            dispatch(setSyllektors([...syllektors, { ...data, ...added }]))
        )
    }
}

export const editSyllektor = (syllektors, syllektor, dispatch) => {
    database.update({ ...syllektor, editing: true }, (updated) =>
        dispatch(
            setSyllektors([
                ...syllektors.filter(
                    (current) => current._id !== syllektor._id
                ),
                updated,
            ])
        )
    )
}

export const completeEdit = (syllektors, syllektor, dispatch) => {
    console.log(syllektor)
    database.update({ ...syllektor, editing: false }, (updated) =>
        dispatch(
            setSyllektors([
                ...syllektors.filter(
                    (current) => current._id !== syllektor._id
                ),
                updated,
            ])
        )
    )
}

export const removeSyllektor = (syllektors, syllektor, dispatch) => {
    database.remove(syllektor, (removed) => {
        dispatch(
            setSyllektors([
                ...syllektors.filter((current) => current.id !== syllektor.id),
            ])
        )
    })
}
