import Database from '../../util/database'
import { setSyllektions } from '../../util/slices/syllektions.slice'
import { v4 } from 'uuid'

let database = new Database()

export const loadSyllektions = async (dispatch) =>
    dispatch(setSyllektions((await database.getAll('syllektion')) || []))

export const addSyllektor = () => {}

export const editSyllektor = () => {}

export const completeEdit = () => {}

export const removeSyllektor = () => {}
