import Database from '../util/database'
import { setSyllektors } from '../util/slices/syllektors.slice'
import { v4 } from 'uuid'

let database = new Database()

export const loadSyllektors = async (dispatch) =>
    dispatch(setSyllektors((await database.getAll('reuseit:syllektor')) || []))

export const addSyllektor = ({
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
    address,
}) => {
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
        setFirstName('')
        setLastName('')
        setPhoneNumber('')
        setIdNumber('')
        setAccountNumber('')
        setBranchCode('')
        setBankName('')
        setAddress('')

        let data = {
            firstName,
            lastName,
            phoneNumber,
            idNumber,
            accountNumber,
            branchCode,
            bankName,
            address,
            editing: false,
            _id: `reuseit:syllektor:${v4()}`,
        }

        let iter = syllektors !== undefined ? [...syllektors] : [...[]]

        database.add(data, (added) =>
            dispatch(setSyllektors([...iter, { ...data, ...added }]))
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
    database.remove(syllektor, async () => {
        dispatch(
            setSyllektors(
                syllektors.filter((filtered) => filtered._id !== syllektor._id)
            )
        )
    })
}
