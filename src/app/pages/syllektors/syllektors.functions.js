import Database from '../../util/database'
import { setSyllektors } from '../../util/slices/syllektors.slice'
import { v4 } from 'uuid'

let database = new Database()

export const loadSyllektors = async (dispatch) =>
    dispatch(setSyllektors((await database.getAll('syllektor')) || []))

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
    database.remove(syllektor, async () => {
        dispatch(
            setSyllektors(
                syllektors.filter((filtered) => filtered._id !== syllektor._id)
            )
        )
    })
}
