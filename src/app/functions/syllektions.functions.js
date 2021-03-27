import Database from '../util/database'
import { calculateEarnings } from '../util/earnings.calculator'
import { setSyllektions } from '../util/slices/syllektions.slice'
import { v4 } from 'uuid'

let database = new Database()

export const loadSyllektions = async (dispatch) =>
    dispatch(setSyllektions((await database.getAll('reuseit:syllektion')) || []))

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
            dateIn: Date.now(),
            earned: calculateEarnings({ materials, material, mass }),
            editing: false,
            _id: `reuseit:syllektion:${v4()}`,
        }

        if (syllektions !== undefined)
            database.add(data, (added) =>
                dispatch(
                    setSyllektions([...syllektions, { ...data, ...added }])
                )
            )
        else
            database.add(data, (added) =>
                dispatch(setSyllektions([{ ...data, ...added }]))
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
            earned: calculateEarnings({
                materials,
                material: syllektion.material,
                mass: syllektion.mass,
            }),
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
