import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'

import { Button } from 'reactstrap'
import React from 'react'

export const ExportSyllektorsCSV = ({ csvData, fileName }) => {
    const fileType =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    const fileExtension = '.xlsx'

    const exportToCSV = (csvData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(
            csvData.map((data) => {
                return {
                    'First Name': data.firstName,
                    'Last Name': data.lastName,
                    'Phone Number': data.phoneNumber,
                    'ID Number': data.idNumber,
                    'Account Number': data.accountNumber,
                    'Branch Code': data.branchCode,
                    'Bank Name': data.bankName,
                    'Address': data.address,
                }
            })
        )
        const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
        const data = new Blob([excelBuffer], { type: fileType })
        FileSaver.saveAs(data, fileName + fileExtension)
    }

    return (
        <Button
            color="primary"
            className="mr-2"
            onClick={() => exportToCSV(csvData, fileName)}
        >
            <div>Export</div>
        </Button>
    )
}

export const ExportSyllektionsCSV = ({ csvData, fileName }) => {
    const fileType =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    const fileExtension = '.xlsx'

    const exportToCSV = (csvData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(
            csvData.map((data) => {
                return {
                    'ID Number': data.idNumber,
                    'Material': data.material,
                    'Mass (kg)': data.mass,
                    'Date': data.dateIn,
                    'Earned': `R ${data.earned}`,
                }
            })
        )
        const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
        const data = new Blob([excelBuffer], { type: fileType })
        FileSaver.saveAs(data, fileName + fileExtension)
    }

    return (
        <Button
            color="primary"
            className="mr-2"
            onClick={() => exportToCSV(csvData, fileName)}
        >
            <div>Export</div>
        </Button>
    )
}

export const ExportMaterialsCSV = ({ csvData, fileName }) => {
    const fileType =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    const fileExtension = '.xlsx'

    const exportToCSV = (csvData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(
            csvData.map((data) => {
                return {
                    'Material Name': data.name,
                    'Material Type': data.type,
                    'Material Value (R/kg)': data.value,
                }
            })
        )
        const wb = { Sheets: { data: ws }, SheetNames: ['data'] }
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
        const data = new Blob([excelBuffer], { type: fileType })
        FileSaver.saveAs(data, fileName + fileExtension)
    }

    return (
        <Button
            color="primary"
            className="mr-2"
            onClick={() => exportToCSV(csvData, fileName)}
        >
            <div>Export</div>
        </Button>
    )
}
