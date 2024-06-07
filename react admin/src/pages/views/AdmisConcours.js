import React, { useMemo, useState, useEffect } from 'react'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { MRT_Localization_FR } from 'material-react-table/locales/fr'
import { Box } from '@mui/material'
import * as XLSX from 'xlsx'
import Swal from 'sweetalert2'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import { etudiantService } from '@/_services/etudiant.service'
import socket from '@/_services/socket.service.js' 
import MoonLoader from "react-spinners/MoonLoader"

const Licence1 = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [etudiants, setEtudiants] = useState(null)
  const [fileName, setFileName] = useState('')

  useEffect(() => {
    socketN()
    getData()
  }, [])

  const socketN = () => {
        socket.on('addImport', (data) => {
            getData()
        })
    
        socket.on('AdmisConcoursTruncate', (data) => {
            getData()
        })

        return () => {
            socket.off('AdmisConcoursTruncate')
        }
  }
  
  const TruncateAllData = async () => {
    await etudiantService.deleteAdmisConcours()
  }

  const columns = useMemo(() => [
    {
      accessorKey: 'numConcours',
      header: 'numero concours',
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
    positionToolbarAlertBanner: 'bottom',
    localization: MRT_Localization_FR,
    renderTopToolbarCustomActions: ({ table }) => (
      <Box sx={{ display: 'flex', gap: '16px', padding: '8px', flexWrap: 'wrap' }} >
        <div style={{ display: 'flex' }}>
            <Tooltip title="réinitialiser">
              <IconButton sx={{ '&:hover': { color: 'darkred', }, }} onClick={() => TruncateAllData()}>
                <RestartAltIcon/>
              </IconButton>
            </Tooltip>
            <StyledButton
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                style={{ textTransform: 'none' }} 
            >
                {fileName || "Sélectionner un fichier "}
                <VisuallyHiddenInput type="file" onChange={handleFileChange} />
            </StyledButton>
            <RegularButton
                onClick={importData}
                disabled={!etudiants}
                variant="contained"
                style={{ textTransform: 'none' }} 
            >
                Enregistrer
            </RegularButton>
        </div>
      </Box>
    ),
  })

  const getData = async () => {
    try {
      let res = await etudiantService.getAllAdmisConcours()
      // console.log('res ...oui', res)
      setData(res.data.data)
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  const handleFileChange = (e) => {
    setEtudiants(e.target.files[0])
    setFileName(e.target.files[0].name)

    const reader = new FileReader()

    reader.onload = (e) => {
        try {
            const data = new Uint8Array(e.target.result)
            const workbook = XLSX.read(data, { type: 'array' })
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const enTetesAttendus = ["numeroConcours", "nom", "prenom", "parcours"]

             // Obtenir les en-têtes de colonnes réelles du fichier Excel (première ligne)
            const enTetesReelles = Object.keys(sheet).map(key => sheet[key].v)
            console.log('En-têtes attendus :', enTetesAttendus)
            console.log('En-têtes réelles :', enTetesReelles)
            const enTetesManquants = enTetesAttendus.filter(enTete => !enTetesReelles.includes(enTete))
            if (enTetesManquants.length > 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: `Les colonnes suivantes sont manquantes : ${enTetesManquants.join(', ')}`,
                })
                setEtudiants(null)
                return // arrêt et vider la variable etudiants
            }
            const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: null })
            console.log(jsonData)
            console.log('En-têtes valides. Continuer avec le reste du processus d\'importation...')
        } catch (err) {
            console.log('Erreur lors de la lecture du fichier Excel :', err)
        }
    }

    reader.readAsArrayBuffer(e.target.files[0])
  }

  const importData = async () => {
    if (etudiants && XLSX) {
        const reader = new FileReader()
        const loadingSwal = Swal.fire({
            text: 'Traitement des données en cours ...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading()
            }
        })
        reader.onload = async (e) => {
            try {
                const workbook = XLSX.read(e.target.result, { type: 'binary' })
                const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { defval: null })
                
                const pageSize = 100; // taille du lot
                const paginatedData = paginateData(jsonData, pageSize)

                for (const dataChunk of paginatedData) { // itère sur chaque morceau 

                    // console.log("DataChunk:", dataChunk)
                    await sendDataToServer(dataChunk)
                }
                loadingSwal.close()
                Swal.fire({
                    icon: 'success',
                    title: 'succès',
                    text: 'Toutes les données ont été enregistrées avec succès!',
                })
              
                setEtudiants(null)
                setFileName(null)
                getData()
                
            } catch (err) {
                loadingSwal.close()
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur',
                    text: 'Une erreur s\'est produite lors de l\'importation des données.',
                });
                console.log('Erreur lors de la lecture du fichier Excel :', err)
            }
        }
        reader.readAsBinaryString(etudiants)
    } else {
        console.error('Aucun fichier sélectionné ou bibliothèque xlsx non disponible.')
    }
  }

  const paginateData = (data, pageSize) => { // divise en morceaux 
    const paginatedData = []
    for (let i = 0; i < data.length; i += pageSize) {
        const dataChunk = data.slice(i, i + pageSize)
        paginatedData.push(dataChunk)
    }
    return paginatedData
  }

  const sendDataToServer = async (jsonData) => {
    try {
        const res = await etudiantService.addImport({ DataEtudiant: jsonData })
        console.log("✅ Données envoyées avec succès :", res)
    } catch (err) {
        console.log("🚫 Erreur lors de l'envoi des données :", err)
    }
  }

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  })

  const StyledButton = styled(Button)({
    border: 'none',
    // margin: 0,
    marginLeft: 10,
    borderRadius: '0',
  })

  const RegularButton = styled(Button)({
      borderRadius: '0',
      backgroundColor: '#5e35b1',
      color: '#fff',
      '&:hover': {
          backgroundColor: '#8e24aa', 
      },
  })

  
  return (
    <>
      <div>
        <h2 className="titre">LISTE DES ETUDIANTS ADMIS CONCOURS</h2>
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
