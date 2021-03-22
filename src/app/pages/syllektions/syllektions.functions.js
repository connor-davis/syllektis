import Database from '../../util/database'
import { calculateEarnings } from '../../util/earnings.calculator'
import moment from 'moment'
import { setSyllektions } from '../../util/slices/syllektions.slice'
import { v4 } from 'uuid'

let database = new Database()

export const loadSyllektions = async (dispatch) =>
    dispatch(setSyllektions((await database.getAll('syllektion')) || []))

export const addSyllektion = ({
    syllektions,
    dispatch,
    idNumber,
    materials,
    material,
    mass,
    setIdNumber,
    setMaterial,
    setMass,
}) => {
    if (idNumber !== '' && material !== '' && mass !== '') {
        setIdNumber('')
        setMaterial('')
        setMass('')

        let data = {
            idNumber,
            material,
            mass,
            dateIn: moment().format('DD/MM/YYYY').toString(),
            earned: calculateEarnings({ materials, material, mass }),
            editing: false,
            _id: `syllektion:${v4()}`,
        }

        let iter = syllektions !== undefined ? [...syllektions] : [...[]]

        database.add(data, (added) =>
            dispatch(setSyllektions([...iter, { ...data, ...added }]))
        )
    }
}

export const editSyllektion = (syllektions, syllektion, dispatch) => {
    database.update(
        {
            ...syllektion,
            editing: true,
        },
        (updated) =>
            dispatch(
                setSyllektions([
                    ...syllektions.filter(
                        (current) => current._id !== syllektion._id
                    ),
                    updated,
                ])
            )
    )
}

export const completeEdit = (syllektions, syllektion, materials, dispatch) => {
    database.update(
        {
            ...syllektion,
            earned: calculateEarnings({ materials, material: syllektion.material, mass: syllektion.mass }),
            editing: false,
        },
        (updated) =>
            dispatch(
                setSyllektions([
                    ...syllektions.filter(
                        (current) => current._id !== syllektion._id
                    ),
                    updated,
                ])
            )
    )
}

export const removeSyllektion = (syllektions, syllektion, dispatch) => {
    database.remove(syllektion, async () => {
        dispatch(
            setSyllektions(
                syllektions.filter(
                    (filtered) => filtered._id !== syllektion._id
                )
            )
        )
    })
}
