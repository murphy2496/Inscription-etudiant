import React, { useMemo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { MRT_Localization_FR } from 'material-react-table/locales/fr'
import { Box, Button } from '@mui/material'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import PrintIcon from '@mui/icons-material/Print'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import { etudiantService } from '@/_services/etudiant.service'
import socket from '@/_services/socket.service.js'  
import MoonLoader from "react-spinners/MoonLoader"


const Licence1 = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  var navigate = useNavigate()

  useEffect(() => {
    socketN()
    getData()
  }, [])

  const columns = useMemo(() => [
    {
      accessorKey: 'matricule',
      header: 'Matricule',
      size: 150,
    },
    {
      accessorKey: 'nom',
      header: 'Nom',
      size: 150,
    },
    {
      accessorKey: 'prenom',
      header: 'Prenom',
      size: 200,
    },
    {
      accessorKey: 'parcours',
      header: 'Parcours',
      size: 150,
    },
  ], [])

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnActions: false,
    enableHiding: false,
    paginationDisplayMode: 'pages',
    localization: MRT_Localization_FR,
    muiTableBodyCellProps: ({ cell }) => ({
      onDoubleClick: () => handleRowClick(cell.row.original),
    }),
    positionToolbarAlertBanner: 'bottom',
    renderTopToolbarCustomActions: ({ table }) => (
      <Box sx={{ display: 'flex', gap: '16px', padding: '8px', flexWrap: 'wrap' }} >
        <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          onClick={() => handlePrint(table.getPrePaginationRowModel().rows)}
          sx={{
            color: 'white',
            backgroundColor: 'rgb(238, 158, 11)',
            '&:hover': {
              backgroundColor: 'orange',
            },
          }}
          startIcon={<PrintIcon />}
        >
          Imprimer
        </Button>
        <Button
            disabled={table.getPrePaginationRowModel().rows.length === 0}
            onClick={() => handleExportRows(table.getPrePaginationRowModel().rows)}
            sx={{
              color: 'white',
              backgroundColor: 'rgb(241, 34, 34)',
              '&:hover': {
              backgroundColor: 'red',
            },
          }}
          startIcon={<FileDownloadIcon />}
          >
          PDF
        </Button>
      </Box>
    ),
  })

  const socketN = () => {
    socket.on('newLicence1Added', (data) => {
      getData()
    })

    return () => {
      socket.off('newLicence1Added')
    }
  }

  const getData = async () => {
    try {
      let res = await etudiantService.getAllLicence1()
      // console.log('res ...oui', res)
      setData(res.data.data)
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  const handleRowClick = (row) => {
    navigate('/Licence1/Info/' + row.matricule);
  }

  const handleExportRows = (rows) => {
    const doc = new jsPDF()
    const tableData = rows.map((row) => Object.values(row.original))
    const tableHeaders = columns.map((c) => c.header)
    autoTable(doc, { head: [tableHeaders], body: tableData })
    doc.save('Liste des étudiants en première année de licence.pdf')
  }

  const handlePrint = (rows) => {
    const doc = new jsPDF()
    const tableData = rows.map((row) => Object.values(row.original))
    const tableHeaders = columns.map((c) => c.header)
    autoTable(doc, { head: [tableHeaders], body: tableData })
    doc.autoPrint()
    doc.output('dataurlnewwindow')
  }


  return (
    <>
      <div>
        <h2 className="titre">LISTE DES ETUDIANTS EN PREMIERE ANNEE DE LICENCE</h2>
        {
          loading ?
          <div className="d-flex justify-content-center align-items-center vh-100" style={{marginTop: '-100px'}}>
            <MoonLoader
            color={'rgb(52, 146, 52)'} size={50} 
            loading={loading}  
            aria-label="Loading Spinner" 
            data-testid="loader" />
          </div>
          :
          <div>
            <MaterialReactTable table={table} />
          </div>
        }
      </div>
    </>
  )
}

export default Licence1
