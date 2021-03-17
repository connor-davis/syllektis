import { setSyllektions } from '../../util/slices/syllektions.slice'

const ipcRenderer = window.ipcRenderer

export const loadSyllektions = (dispatch, currentSyllektions) => {
    if (ipcRenderer) {
        ipcRenderer.send('API_db-get', { key: 'syllektions' })
        ipcRenderer.on('API_db-get-success', ({ key, value }) => {
            if (key === 'syllektions')
                dispatch(setSyllektions(JSON.parse(value.value)))
        })
        ipcRenderer.on('API_db-get-failure', ({ key }) => {
            if (key === 'syllektions') {
                ipcRenderer.send('API_db-put', {
                    key: 'syllektions',
                    value: JSON.stringify(currentSyllektions),
                })
                ipcRenderer.on('API_db-put-success', () => {
                    ipcRenderer.send('API_db-get', { key: 'syllektions' })
                })
            }
        })
    }
}
