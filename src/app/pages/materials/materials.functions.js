import Database from '../../util/database'
import { setMaterials } from '../../util/slices/materials.slice'
import { v4 } from 'uuid'

let database = new Database()

export const loadMaterials = async (dispatch) =>
    dispatch(setMaterials((await database.getAll('material')) || []))

export const addMaterial = ({
    materials,
    dispatch,
    name,
    type,
    value,
    setName,
    setType,
    setValue,
}) => {
    if (name !== '' && type !== '' && value !== '') {
        setName('')
        setType('')
        setValue('')

        let data = {
            name,
            type,
            value,
            editing: false,
            _id: `material:${v4()}`,
        }

        let iter = materials !== undefined ? [...materials] : [...[]]

        database.add(data, (added) =>
            dispatch(setMaterials([...iter, { ...data, ...added }]))
        )
    }
}

export const editMaterial = (materials, material, dispatch) => {
    database.update({ ...material, editing: true }, (updated) =>
        dispatch(
            setMaterials([
                ...materials.filter(
                    (current) => current._id !== material._id
                ),
                updated,
            ])
        )
    )
}

export const completeEdit = (materials, material, dispatch) => {
    database.update({ ...material, editing: false }, (updated) =>
        dispatch(
            setMaterials([
                ...materials.filter(
                    (current) => current._id !== material._id
                ),
                updated,
            ])
        )
    )
}

export const removeMaterial = (materials, material, dispatch) => {
    database.remove(material, () => {
        dispatch(
            setMaterials(
                materials.filter(
                    (filtered) => filtered._id !== material._id
                )
            )
        )
    })
}
