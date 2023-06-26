import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import TextField from '@mui/material/TextField';
import { setCategory, addCategory } from '../redux/reducers/categoryslice';
import { useAppDispatch } from '../redux/hooks';
import { RootState } from '../redux/store';
import Select, { SingleValue } from 'react-select';
import axios, { AxiosResponse } from 'axios';
import { useSelector } from 'react-redux';

// slice part
import { setDocument, createDocument, updateDocument, deleteDocument } from '../redux/reducers/documentslice';
import { setMarintime, createMarintime, updateMarintime, deleteMarintime } from '../redux/reducers/marintimeslice';
import { setCompetency, createCompetency, updateCompetency, deleteCompetency } from '../redux/reducers/competencyslice';
import { setMedical, createMedical, updateMedical, deleteMedical } from '../redux/reducers/medicalslice';
import { setOffshore, createOffshore, updateOffshore, deleteOffshore } from '../redux/reducers/offshoreslice';

export default function CV() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        axios.get('/api/category/getCategories')
            .then((res: AxiosResponse) => {
                dispatch(setCategory(res.data.data))
            })
    }, [dispatch])

    const categories = useSelector((state: RootState) => state.categories.category);      //    category items

    const [name, setName] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    function handleDateChange(date: Date | null) {
        setSelectedDate(date);
        console.log(selectedDate);
    }

    //  document options value 
    const [selectedDocument, setSelectedDocument] = useState<string>('')
    const options = categories.filter((item) => item.documents !== null).map((item) => ({ value: item.documents, label: item.documents }))
    const selectDocument = (option: SingleValue<{ value: string; label: string; }>) => {
        setSelectedDocument(option?.label ?? '');
    };
    const [addDocument, setAddDocument] = useState<string>('')      //  Add Document Input State
    const handleDocumentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddDocument(event.target.value);
    };
    //  marintime experience options  
    const [selectedMaritime, setSelectedMarintime] = useState<string>('')
    const experienceOptions = categories.filter((item) => item.maritime !== null).map((item) => ({ value: item.maritime, label: item.maritime }))
    const selectMarintime = (option: SingleValue<{ value: string; label: string; }>) => {
        setSelectedMarintime(option?.label ?? '');
    };
    const [addMarintime, setAddMarintime] = useState<string>('')        //  Add Marintime Input State
    const handleMarintimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddMarintime(event.target.value);
    };
    //  competency certification options
    const [selectedCompetency, setSelectedCompetency] = useState<string>('')
    const certificateOptions = categories.filter((item) => item.competency !== null).map((item) => ({ value: item.competency, label: item.competency }))
    const selectCompetency = (option: SingleValue<{ value: string; label: string; }>) => {
        setSelectedCompetency(option?.label ?? '');
    };
    const [addCompetency, setAddCompetency] = useState<string>('')      //  Add Competency Input State
    const handleCompetencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddCompetency(event.target.value);
    };
    //  mediacal certification options
    const [selectedMedical, setSelectedMedical] = useState<string>('')
    const medicalOptions = categories.filter((item) => item.medical !== null).map((item) => ({ value: item.medical, label: item.medical }))
    const selectMedical = (option: SingleValue<{ value: string; label: string; }>) => {
        setSelectedMedical(option?.label ?? '');
    };
    const [addMedical, setAddMedical] = useState<string>('')        //  Add Medical Input State
    const handleMedicalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddMedical(event.target.value);
    };
    //  offshore certification options
    const [selectedOffshore, setSelectedOffshore] = useState<string>('')
    const offshoreOptions = categories.filter((item) => item.offshore !== null).map((item) => ({ value: item.offshore, label: item.offshore }))
    const selectOffshore = (option: SingleValue<{ value: string; label: string; }>) => {
        setSelectedOffshore(option?.label ?? '');
    };
    const [addOffshore, setAddOffshore] = useState<string>('')      //  Add Offshore Input State
    const handleOffshoreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddOffshore(event.target.value);
    };
    //  Category Data      
    const CategoryData = {
        'documents': addDocument,
        'maritime': addMarintime,
        'competency': addCompetency,
        'medical': addMedical,
        'offshore': addOffshore
    }
    //  Submit Category Data
    const submitCategory = () => {
        axios.post('/api/category/addcategory', CategoryData, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res: AxiosResponse) => {
            dispatch(addCategory(res.data.data))
        })
        setAddDocument('');
        setAddMarintime('');
        setAddCompetency('');
        setAddMedical('');
        setAddOffshore('');
    }

    /* Documents table state management */
    // Inputs States
    const [country, setCountry] = useState<string | undefined>('');
    const [docNumber, setDocNumber] = useState<string | undefined>('');
    const [docIssueDate, setDocIssueDate] = useState<Date | null>(new Date());
    const [docExpirationDate, setDocExpirationDate] = useState<Date | null>(new Date());
    // HandleChange functions
    const handleDocNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDocNumber(event.target.value);
    };
    const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCountry(event.target.value);
    };
    function handleDocIssueDateChange(date: Date | null) {
        setDocIssueDate(date);
    }
    function handleDocExpirationDateChange(date: Date | null) {
        setDocExpirationDate(date);
    }
    // Submit Documents table Data
    const DocumentData = {
        'userId': localStorage.getItem('userId'),
        'document_type': selectedDocument,
        'country': country,
        'number': docNumber,
        'issue_date': docIssueDate,
        'expiration_date': docExpirationDate
    }
    useEffect(() => {
        axios.get('/api/controller/getDocuments')
            .then((res: AxiosResponse) => {
                dispatch(setDocument(res.data.data))
            })
    }, [dispatch])
    const submitDocument = () => {
        axios.post('/api/controller/addDocument', DocumentData)
            .then((res: AxiosResponse) => {
                dispatch(createDocument(res.data.data))
            })
    }
    //  Documents state value using useSelector
    const document = useSelector((state: RootState) => state.documents.document);
    //  Delete Document table
    const handleDeleteDocument = (id: number) => {
        axios.delete(`/api/controller/deleteDocument/${id}`)
            .then((res: AxiosResponse) => {
                dispatch(deleteDocument(id))
            })
    }
    //  Edit Document table
    const editDocument = (id: number, type: string, country: string, number: string) => {
        //
    }


    /* Marintime table state management */
    // Inputs States
    const [client, setClient] = useState<string | undefined>('');
    const [employer, setEmployer] = useState<string | undefined>('');
    const [vesselType, setVesselType] = useState<string>('');
    const [year, setYear] = useState<string>('');
    // Handle Change Functions
    const handleVessecTypeChange = (option: SingleValue<{ value: string; label: string; }>) => {
        setVesselType(option?.label ?? '');
    };
    const handleClientChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setClient(event.target.value);
    };
    const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setYear(event.target.value);
    };
    const handleEmployerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmployer(event.target.value);
    };
    //  Marintime Data
    const MarinData = {
        'userId': localStorage.getItem('userId'),
        'job_title': selectedMaritime,
        'years': year,
        'vessel_type': vesselType,
        'client': client,
        'employers': employer
    }
    useEffect(() => {
        axios.get('/api/controller/getMarintime')
            .then((res: AxiosResponse) => {
                dispatch(setMarintime(res.data.data))
            })
    }, [dispatch])
    const submitMaintime = () => {
        axios.post('/api/controller/addMarintime', MarinData)
            .then((res: AxiosResponse) => {
                dispatch(createMarintime(res.data.data))
            })
        setYear('');
        setClient('');
        setEmployer('');
        setVesselType('');
    }
    //  Marintime State Value
    const marintime = useSelector((state: RootState) => state.marintimes.marintime)
    //  Delete Marintime table
    const handleDeleteMarintime = (id: number) => {
        axios.delete(`/api/controller/deleteMarintime/${id}`)
            .then((res: AxiosResponse) => {
                dispatch(deleteMarintime(id))
            })
    }

    /* Competency table state management */
    // Inputs States
    const [comNumber, setComNumber] = useState<string | undefined>('');
    const [comIssueDate, setComIssueDate] = useState<Date | null>(new Date());
    const [comExpirationDate, setComExpirationDate] = useState<Date | null>(new Date());
    // HandleChange functions
    const handleComNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComNumber(event.target.value);
    };
    function handleComIssueDateChange(date: Date | null) {
        setComIssueDate(date);
    }
    function handleComExpirationDateChange(date: Date | null) {
        setComExpirationDate(date);
    }
    //  Marintime Data
    const CompetencyData = {
        'userId': localStorage.getItem('userId'),
        'name': selectedCompetency,
        'number': comNumber,
        'issue_date': comIssueDate,
        'expiry_date': comExpirationDate
    }
    useEffect(() => {
        axios.get('/api/controller/getCompetency')
            .then((res: AxiosResponse) => {
                dispatch(setCompetency(res.data.data))
            })
    }, [dispatch])
    const submitCompetecy = () => {
        axios.post('/api/controller/addCompetency', CompetencyData)
            .then((res: AxiosResponse) => {
                dispatch(createCompetency(res.data.data))
            })
        setComNumber('');
        setSelectedCompetency('');
    }
    //  Marintime State Value
    const competency = useSelector((state: RootState) => state.competencies.competency)
    //  Delete Marintime table
    const handleDeleteCompetecny = (id: number) => {
        axios.delete(`/api/controller/deleteCompetency/${id}`)
            .then((res: AxiosResponse) => {
                dispatch(deleteCompetency(id))
            })
    }

    /*  Medical table state management */
    // Inputs States
    const [medicalNumber, setMedicalNumber] = useState<string | undefined>('');
    const [medicalIssueDate, setMedicalIssueDate] = useState<Date | null>(new Date());
    const [medicalExpirationDate, setMedicalExpirationDate] = useState<Date | null>(new Date());
    // HandleChange functions
    const handleMedicalNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMedicalNumber(event.target.value);
    };
    function handleMedicalIssueDateChange(date: Date | null) {
        setMedicalIssueDate(date);
    }
    function handleMedicalExpirationDateChange(date: Date | null) {
        setMedicalExpirationDate(date);
    }
    //  Medical Data
    const MedicalData = {
        'userId': localStorage.getItem('userId'),
        'name': selectedMedical,
        'number': medicalNumber,
        'issue_date': medicalIssueDate,
        'expiry_date': medicalExpirationDate
    }
    useEffect(() => {
        axios.get('/api/controller/getMedical')
            .then((res: AxiosResponse) => {
                dispatch(setMedical(res.data.data))
            })
    }, [dispatch])
    const submitMedical = () => {
        axios.post('/api/controller/addMedical', MedicalData)
            .then((res: AxiosResponse) => {
                dispatch(createMedical(res.data.data))
            })
        setMedicalNumber('');
        setSelectedMedical('');
    }
    //  Marintime State Value
    const medical = useSelector((state: RootState) => state.medicals.medical)
    //  Delete Marintime table
    const handleDeleteMedical = (id: number) => {
        axios.delete(`/api/controller/deleteMedical/${id}`)
            .then((res: AxiosResponse) => {
                dispatch(deleteMedical(id))
            })
    }

    /*   Offshore table state management */
    // Inputs States
    const [offshoreNumber, setOffshoreNumber] = useState<string | undefined>('');
    const [offshoreIssueDate, setOffshoreIssueDate] = useState<Date | null>(new Date());
    const [offshoreExpirationDate, setOffshoreExpirationDate] = useState<Date | null>(new Date());
    // HandleChange functions
    const handleOffshoreNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOffshoreNumber(event.target.value);
    };
    function handleOffshoreIssueDateChange(date: Date | null) {
        setOffshoreIssueDate(date);
    }
    function handleOffshoreExpirationDateChange(date: Date | null) {
        setOffshoreExpirationDate(date);
    }
    //  Medical Data
    const OffshoreData = {
        'userId': localStorage.getItem('userId'),
        'name': selectedOffshore,
        'number': offshoreNumber,
        'issue_date': offshoreIssueDate,
        'expiry_date': offshoreExpirationDate
    }
    useEffect(() => {
        axios.get('/api/controller/getOffshore')
            .then((res: AxiosResponse) => {
                dispatch(setOffshore(res.data.data))
            })
    }, [dispatch])
    const submitOffshore = () => {
        axios.post('/api/controller/addOffshore', OffshoreData)
            .then((res: AxiosResponse) => {
                dispatch(createOffshore(res.data.data))
            })
        setOffshoreNumber('');
        setSelectedOffshore('');
    }
    //  Marintime State Value
    const offshore = useSelector((state: RootState) => state.offshores.offshore)
    //  Delete Marintime table
    const handleDeleteOffshore = (id: number) => {
        axios.delete(`/api/controller/deleteOffshore/${id}`)
            .then((res: AxiosResponse) => {
                dispatch(deleteOffshore(id))
            })
    }



    const langOptions = [
        { value: 'latvian', label: 'Latvian' },
        { value: 'russian', label: 'Russian' },
        { value: 'english', label: 'English' }
    ]

    const vesselOptions = [
        { value: 'vessel_1', label: 'Vessel 1' },
        { value: 'vessel_2', label: 'Vessel 2' }
    ]

    const avatar = localStorage.getItem('avatar');

    return (
        <div className='pt-[75px] mb-[90px]'>
            <div className='flex justify-between w-[148px] ml-[23px]'>
                <Link className='text-[16px] font-[600] text-[#9CA3AF]' to="/">Home</Link>
                <img src='/image/right.png' className='pt-[4px] w-3' />
                <Link className='text-[16px] font-[600] text-[#116ACC]' to="/about_project">CV Creator</Link>
            </div>
            {/* Personal Data */}

            <form>
                <div style={{ padding: "50px 58px 80px 58px" }} className='back-cv flex flex-col bg-[#F3F4F6] rounded-[56px] pt-[67px] pl-[58px] gap-[47px] mt-[80px]'>
                    <div className='flex'>
                        <p className='text-[48px] leading-[56px] font-[600] w-[40%] text-[#116ACC] mt-[120px]'>Personal Data</p>
                        <div className='w-[60%] flex justify-end mr-[30px]'>
                            {
                                avatar ? <img className='w-[165px] h-[165px] rounded-[50%]' src={`/avatar/${avatar}`} alt="avatar" /> : <img src="/image/profile.png" />
                            }
                        </div>
                    </div>
                    <div style={{ border: "1px dashed #7B61FF", padding: "58px 71px" }} className='flex rounded-[5px] w-full box-border'>
                        <div className='flex flex-col gap-[83px] w-[50%]'>
                            <div className='flex'>
                                <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                    Name:
                                </div>
                                <div className='w-[70%]'>
                                    <input
                                        style={{ padding: "8px 10px 8px 16px", border: "1px solid #9CA3AF" }}
                                        className='w-[300px] ml-[17px] h-[44px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                                        placeholder="Type your name"
                                        type="text"
                                        value={name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className='flex'>
                                <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                    Surname:
                                </div>
                                <div className='w-[70%]'>
                                    <input
                                        style={{ padding: "8px 10px 8px 16px", border: "1px solid #9CA3AF" }}
                                        className='w-[300px] ml-[17px] h-[44px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                                        placeholder="Type your citizenship"
                                        type="text"
                                        value={name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className='flex'>
                                <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                    Citizenship:
                                </div>
                                <div className='w-[70%]'>
                                    <input
                                        style={{ padding: "8px 10px 8px 16px", border: "1px solid #9CA3AF" }}
                                        className='w-[300px] ml-[17px] h-[44px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                                        placeholder="Type your name"
                                        type="text"
                                        value={name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className='flex'>
                                <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                    Country of residence:
                                </div>
                                <div className='w-[70%]'>
                                    <input
                                        style={{ padding: "8px 10px 8px 16px", border: "1px solid #9CA3AF" }}
                                        className='w-[300px] ml-[17px] h-[44px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                                        placeholder="Type your name"
                                        type="text"
                                        value={name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className='flex'>
                                <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                    Nearest Airport:
                                </div>
                                <div className='w-[70%]'>
                                    <input
                                        style={{ padding: "8px 10px 8px 16px", border: "1px solid #9CA3AF" }}
                                        className='w-[300px] ml-[17px] h-[44px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                                        placeholder="Type your name"
                                        type="text"
                                        value={name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col gap-[83px] w-[50%]'>
                            <div className='flex'>
                                <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                    Gender:
                                </div>
                                <div className='w-[70%]'>
                                    <input
                                        style={{ padding: "8px 10px 8px 16px", border: "1px solid #9CA3AF" }}
                                        className='w-[300px] ml-[17px] h-[44px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                                        placeholder="Type your phone number"
                                        type="text"
                                        value={name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className='flex'>
                                <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                    Phone number:
                                </div>
                                <div className='w-[70%]'>
                                    <input
                                        style={{ padding: "8px 10px 8px 16px", border: "1px solid #9CA3AF" }}
                                        className='w-[300px] ml-[17px] h-[44px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                                        placeholder="Type your phone number"
                                        type="text"
                                        value={name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className='flex'>
                                <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                    E-mail:
                                </div>
                                <div className='w-[70%]'>
                                    <input
                                        style={{ padding: "8px 10px 8px 16px", border: "1px solid #9CA3AF" }}
                                        className='w-[300px] ml-[17px] h-[44px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                                        placeholder="Type your email"
                                        type="email"
                                        value={name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className='flex'>
                                <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                    Other links:
                                </div>
                                <div className='w-[70%]'>
                                    <input
                                        style={{ padding: "8px 10px 8px 16px", border: "1px solid #9CA3AF" }}
                                        className='w-[300px] ml-[17px] h-[44px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                                        placeholder="Type your phone number"
                                        type="text"
                                        value={name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className='flex'>
                                <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                    Date of Birth:
                                </div>
                                <div className='w-[70%] ml-[22px]'>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <MobileDatePicker
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            renderInput={(params) => <TextField
                                                onClick={() => console.log("asd")}
                                                sx={{
                                                    width: 300,
                                                    backgroundColor: "#fff",
                                                }} {...params}
                                            />}
                                        />
                                    </LocalizationProvider>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            {/* Document element */}

            <div style={{ padding: "48px 58px" }} className='flex flex-col bg-[#F3F4F6] rounded-[56px] pt-[48px] pl-[58px] gap-[27px] mt-[80px]'>
                <div className='flex'>
                    <p className='text-[48px] leading-[56px] font-[600] text-[#116ACC]'>Documents</p>
                    <Select className='w-[300px] rounded-[10px] ml-[60px] mt-[13px]' placeholder="All" onChange={selectDocument} options={options} />
                    <input
                        style={{ padding: "8px 10px 8px 16px", border: "1px solid #9CA3AF" }}
                        className='w-[300px] ml-[17px] h-[38px] mt-[13px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                        placeholder="Type your Documents"
                        type="text"
                        value={addDocument}
                        onChange={handleDocumentChange}
                    />
                    <button id="check" onClick={submitCategory} style={{ padding: "4px 10px" }} className='rounded-[8px] bg-[#fff] mt-[13px] ml-[23px] h-[38px]'>
                        <img src='/image/check.png' alt="x" />
                    </button>
                </div>
                {/* Seamans's Book element */}
                <div style={{ border: "1px dashed #7B61FF", padding: "41px 37px" }} className='flex flex-col gap-[53px] rounded-[5px] w-full box-border'>
                    <div className="flex w-full">
                        <div className='w-[80%] font-[700] text-[32px] leading-[36px] text-[#374151]'>{selectedDocument}</div>
                        <div className='flex justify-end w-[20%]'>
                            <button onClick={submitDocument} className='w-[82px] h-[52px] text-[16px] font-[500] leading-[20px] rounded-[7px] text-[#fff] bg-[#116ACC]'>ADD</button>
                        </div>
                    </div>
                    <div className='flex w-full'>
                        <div className='flex flex-col gap-[83px] w-[50%]'>
                            <div className='flex'>
                                <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                    Number:
                                </div>
                                <div className='w-[70%]'>
                                    <input
                                        style={{ padding: "8px 10px 8px 16px", border: "1px solid #9CA3AF" }}
                                        className='w-[300px] ml-[17px] h-[44px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                                        placeholder="Type your number"
                                        type="text"
                                        value={docNumber}
                                        onChange={handleDocNumberChange}
                                    />
                                </div>
                            </div>

                            <div className='flex'>
                                <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                    Country:
                                </div>
                                <div className='w-[70%]'>
                                    <input
                                        style={{ padding: "8px 10px 8px 16px", border: "1px solid #9CA3AF" }}
                                        className='w-[300px] ml-[17px] h-[44px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                                        placeholder="Type your citizenship"
                                        type="text"
                                        value={country}
                                        onChange={handleCountryChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col gap-[83px] w-[50%]'>
                            <div className='flex'>
                                <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                    Issue Date:
                                </div>
                                <div className='w-[70%]'>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <MobileDatePicker
                                            value={docIssueDate}
                                            onChange={handleDocIssueDateChange}
                                            renderInput={(params) => <TextField
                                                onClick={() => console.log("asd")}
                                                sx={{
                                                    width: 300,
                                                    backgroundColor: "#fff",
                                                    marginLeft: '17px'
                                                }}
                                                {...params}
                                            />}
                                        />
                                    </LocalizationProvider>
                                </div>
                            </div>

                            <div className='flex'>
                                <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                    Expiry Date:
                                </div>
                                <div className='w-[70%]'>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <MobileDatePicker
                                            value={docExpirationDate}
                                            onChange={handleDocExpirationDateChange}
                                            renderInput={(params) => <TextField
                                                onClick={() => console.log("asd")}
                                                sx={{
                                                    width: 300,
                                                    backgroundColor: "#fff",
                                                    marginLeft: "17px"
                                                }} {...params}
                                            />}
                                        />
                                    </LocalizationProvider>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Your Document element */}
                <div className='flex flex-col gap-[25px] mt-[10px] mb-[40px]'>
                    <div className='text-[32px] leading-[36px] text-[#374151] font-[700] '>Your Documents</div>

                    <table>
                        <thead className='bg-[#116ACC] h-[64px] '>
                            <tr className='rounded-[15px]'>
                                <th className='w-[20%]'>Document Type</th>
                                <th className='w-[16.7%]'>Country</th>
                                <th className='w-[16.7%]'>Number</th>
                                <th className='w-[16.6%]'>Issue Date</th>
                                <th className='w-[20%]'>Expiration Date</th>
                                <th className='w-[10%]'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {document.map((item, i) => {
                                return (
                                    <tr key={i}>
                                        <td className='text-start'>{item.document_type}</td>
                                        <td className='text-start'>{item.country}</td>
                                        <td className='text-start'>{item.number}</td>
                                        <td className='text-start'>{item.issue_date}</td>
                                        <td className='text-start'>{item.expiration_date}</td>
                                        <td className='text-start flex gap-[10px]'>
                                            <button id="delete"
                                                style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}
                                                onClick={() => handleDeleteDocument(item.id)}
                                            >
                                                <img src="/image/delete.png" alt="delete" />
                                            </button>
                                            <button id="edit"
                                                style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}
                                                onClick={() => editDocument(item.id, item.document_type, item.country, item.number)}
                                            >
                                                <img src="/image/edit.png" alt="edit" />
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Maritime experience element */}

            <div style={{ padding: "48px 58px" }} className='flex flex-col bg-[#F3F4F6] rounded-[56px] pt-[48px] pl-[58px] gap-[27px] mt-[80px]'>
                <div className='flex'>
                    <p className='text-[48px] leading-[56px] font-[600] text-[#116ACC]'>Maritime experience</p>
                    <Select className='w-[300px] rounded-[10px] ml-[60px] mt-[13px]' placeholder="Please select" onChange={selectMarintime} options={experienceOptions} />
                    <input
                        style={{ padding: "8px 10px 8px 16px", border: "1px solid #9CA3AF" }}
                        className='w-[300px] ml-[17px] h-[38px] mt-[13px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                        placeholder="Type your Experience"
                        type="text"
                        value={addMarintime}
                        onChange={handleMarintimeChange}
                    />
                    <button id="check" onClick={submitCategory} style={{ padding: "4px 10px" }} className='rounded-[8px] bg-[#fff] mt-[13px] ml-[23px] h-[38px]'>
                        <img src='/image/check.png' alt="x" />
                    </button>
                </div>
                {/* Job title element */}
                <div style={{ border: "1px dashed #7B61FF", padding: "41px 37px" }} className='flex flex-col gap-[53px] rounded-[5px] w-full box-border'>
                    <div className="flex w-full">
                        <div className='w-[80%] font-[700] text-[32px] leading-[36px] text-[#374151]'>{selectedMaritime}</div>
                        <div className='flex justify-end w-[20%]'>
                            <button
                                onClick={submitMaintime}
                                className='w-[82px] h-[52px] text-[16px] font-[500] leading-[20px] rounded-[7px] text-[#fff] bg-[#116ACC]'>
                                ADD
                            </button>
                        </div>
                    </div>

                    <div className='flex flex-col gap-[83px] w-full'>
                        <div className='flex'>
                            <div className='w-[15%] label-style pt-[6px] flex justify-end'>
                                Types of vessels:
                            </div>
                            <div className='w-[85%] flex'>
                                <Select className='w-[300px] rounded-[10px] ml-[17px]' onChange={handleVessecTypeChange} placeholder="..." options={vesselOptions} />
                            </div>
                        </div>

                        <div className='flex'>
                            <div className='w-[57%] flex'>
                                <div className='w-[26.5%] label-style pt-[6px] flex justify-end'>
                                    Clients:
                                </div>
                                <div className='w-[73.5%] flex'>
                                    <input
                                        style={{ padding: "8px 10px 8px 16px", border: "1px solid #9CA3AF" }}
                                        className='w-[300px] ml-[17px] h-[38px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                                        placeholder="Type Clients"
                                        type="text"
                                        value={client}
                                        onChange={handleClientChange}
                                    />
                                </div>
                            </div>
                            <div className='w-[43%] flex'>
                                <div className='w-[30%] label-style pt-[6px] flex justify-end'>
                                    Years:
                                </div>
                                <div className='w-[70%] flex'>
                                    <input
                                        style={{ padding: "8px 10px 8px 16px", border: "1px solid #9CA3AF" }}
                                        className='w-[300px] ml-[17px] h-[38px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                                        placeholder="Type Clients"
                                        type="text"
                                        value={year}
                                        onChange={handleYearChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='flex'>
                            <div className='w-[15%] label-style pt-[6px] flex justify-end'>
                                Crewing's, Employers:
                            </div>
                            <div className='w-[85%]'>
                                <input
                                    style={{ padding: "8px 10px 8px 16px", border: "1px solid #9CA3AF" }}
                                    className='w-[300px] ml-[17px] h-[38px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                                    placeholder="Type Crewing's, Employers"
                                    type="text"
                                    value={employer}
                                    onChange={handleEmployerChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Your Experience element */}
                <div className='flex flex-col gap-[25px] mt-[10px] mb-[40px]'>
                    <div className='text-[32px] leading-[36px] text-[#374151] font-[700] '>Your Experience</div>

                    <table>
                        <thead className='bg-[#116ACC] h-[64px] '>
                            <tr className='rounded-[15px]'>
                                <th className='w-[20%]'>Job title</th>
                                <th className='w-[16.7%]'>Years</th>
                                <th className='w-[16.7%]'>Type of vessels</th>
                                <th className='w-[16.6%]'>Clients</th>
                                <th className='w-[20%]'>Crewing's Employers</th>
                                <th className='w-[10%]'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {marintime.map((item, i) => {
                                return (
                                    <tr key={i}>
                                        <td className='text-start'>{item.job_title}</td>
                                        <td className='text-start'>{item.years}</td>
                                        <td className='text-start'>{item.vessel_type}</td>
                                        <td className='text-start'>{item.client}</td>
                                        <td className='text-start'>{item.employers}</td>
                                        <td className='text-start flex gap-[10px]'>
                                            <button id="delete"
                                                style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}
                                                onClick={() => handleDeleteMarintime(item.id)}
                                            >
                                                <img src="/image/delete.png" alt="delete" />
                                            </button>
                                            <button id="edit" style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}>
                                                <img src="/image/edit.png" alt="edit" />
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Certificate of Competency */}

            <div style={{ padding: "48px 58px" }} className='flex flex-col bg-[#F3F4F6] rounded-[56px] pt-[48px] pl-[58px] gap-[27px] mt-[80px]'>
                <div className='flex'>
                    <p className='text-[48px] leading-[56px] font-[600] text-[#116ACC]'>Certificate of Competency</p>
                    <Select className='w-[300px] rounded-[10px] ml-[60px] mt-[13px]' placeholder="Please select" onChange={selectCompetency} options={certificateOptions} />
                    <input
                        style={{ padding: "8px 10px 8px 16px", border: "1px solid #9CA3AF" }}
                        className='w-[300px] ml-[17px] h-[38px] mt-[13px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                        placeholder="Type your Competency"
                        type="text"
                        value={addCompetency}
                        onChange={handleCompetencyChange}
                    />
                    <button id="check" onClick={submitCategory} style={{ padding: "4px 10px" }} className='rounded-[8px] bg-[#fff] mt-[13px] ml-[23px] h-[38px]'>
                        <img src='/image/check.png' alt="x" />
                    </button>
                </div>
                {/* Onshore Cooks Certificate element */}
                <div style={{ border: "1px dashed #7B61FF", padding: "41px 37px" }} className='flex flex-col gap-[53px] rounded-[5px] w-full box-border'>
                    <div className="flex w-full">
                        <div className='w-[80%] font-[700] text-[32px] leading-[36px] text-[#374151]'>{selectedCompetency}</div>
                        <div className='flex justify-end w-[20%]'>
                            <button
                                onClick={submitCompetecy}
                                className='w-[82px] h-[52px] text-[16px] font-[500] leading-[20px] rounded-[7px] text-[#fff] bg-[#116ACC]'>
                                ADD
                            </button>
                        </div>
                    </div>

                    <div className='flex flex-col gap-[83px] w-full'>
                        <div className='flex w-full'>
                            <div className='flex flex-col gap-[83px] w-[50%]'>
                                <div className='flex'>
                                    <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                        Number:
                                    </div>
                                    <div className='w-[70%]'>
                                        <input
                                            style={{ padding: "8px 10px 8px 16px", border: "1px solid #9CA3AF" }}
                                            className='w-[300px] ml-[17px] h-[44px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                                            placeholder="Type your number"
                                            type="text"
                                            value={comNumber}
                                            onChange={handleComNumberChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='flex flex-col gap-[83px] w-[50%]'>
                                <div className='flex'>
                                    <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                        Issue Date:
                                    </div>
                                    <div className='w-[70%]'>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <MobileDatePicker
                                                value={comIssueDate}
                                                onChange={handleComIssueDateChange}
                                                renderInput={(params) => <TextField
                                                    onClick={() => console.log("asd")}
                                                    sx={{
                                                        width: 300,
                                                        backgroundColor: "#fff",
                                                        marginLeft: '17px'
                                                    }}
                                                    {...params}
                                                />}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </div>

                                <div className='flex'>
                                    <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                        Expiry Date:
                                    </div>
                                    <div className='w-[70%]'>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <MobileDatePicker
                                                value={comExpirationDate}
                                                onChange={handleComExpirationDateChange}
                                                renderInput={(params) => <TextField
                                                    onClick={() => console.log("asd")}
                                                    sx={{
                                                        width: 300,
                                                        backgroundColor: "#fff",
                                                        marginLeft: "17px"
                                                    }} {...params}
                                                />}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Your Certificates of Competency element */}
                <div className='flex flex-col gap-[25px] mt-[10px] mb-[40px]'>
                    <div className='text-[32px] leading-[36px] text-[#374151] font-[700] '>Your Certificates of Competency</div>

                    <table>
                        <thead className='bg-[#116ACC] h-[64px] '>
                            <tr className='rounded-[15px]'>
                                <th className='w-[20%]'>Name</th>
                                <th className='w-[20%]'>Number</th>
                                <th className='w-[20%]'>Issue Date</th>
                                <th className='w-[30%]'>Expiry Date</th>
                                <th className='w-[10%]'>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                competency.map((item, i) => {
                                    return (
                                        <tr key={i}>
                                            <td className='text-start'>Food Safety and HACPP </td>
                                            <td className='text-start'>HACPP122324324325</td>
                                            <td className='text-start'>20.05.2020</td>
                                            <td className='text-start'>20.05.2025</td>
                                            <td className='text-start flex gap-[10px]'>
                                                <button id="delete"
                                                    onClick={() => handleDeleteCompetecny(item.id)}
                                                    style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}>
                                                    <img src="/image/delete.png" alt="delete" />
                                                </button>
                                                <button id="edit" style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}>
                                                    <img src="/image/edit.png" alt="edit" />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Medical Certificate element */}

            <div style={{ padding: "48px 58px" }} className='flex flex-col bg-[#F3F4F6] rounded-[56px] pt-[48px] pl-[58px] gap-[27px] mt-[80px]'>
                <div className='flex'>
                    <p className='text-[48px] leading-[56px] font-[600] text-[#116ACC]'>Medical Certificate</p>
                    <Select className='w-[300px] rounded-[10px] ml-[60px] mt-[13px]' placeholder="Please select" onChange={selectMedical} options={medicalOptions} />
                    <input
                        style={{ padding: "8px 10px 8px 16px", border: "1px solid #9CA3AF" }}
                        className='w-[300px] ml-[17px] h-[38px] mt-[13px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                        placeholder="Type your Medical Certifications"
                        type="text"
                        value={addMedical}
                        onChange={handleMedicalChange}
                    />
                    <button id="check" onClick={submitCategory} style={{ padding: "4px 10px" }} className='rounded-[8px] bg-[#fff] mt-[13px] ml-[23px] h-[38px]'>
                        <img src='/image/check.png' alt="x" />
                    </button>
                </div>
                {/* Seafarers Medical element */}
                <div style={{ border: "1px dashed #7B61FF", padding: "41px 37px" }} className='flex flex-col gap-[53px] rounded-[5px] w-full box-border'>
                    <div className="flex w-full">
                        <div className='w-[80%] font-[700] text-[32px] leading-[36px] text-[#374151]'>{selectedMedical}</div>
                        <div className='flex justify-end w-[20%]'>
                            <button
                                onClick={submitMedical}
                                className='w-[82px] h-[52px] text-[16px] font-[500] leading-[20px] rounded-[7px] text-[#fff] bg-[#116ACC]'>
                                ADD
                            </button>
                        </div>
                    </div>

                    <div className='flex flex-col gap-[83px] w-full'>
                        <div className='flex w-full'>
                            <div className='flex flex-col gap-[83px] w-[50%]'>
                                <div className='flex'>
                                    <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                        Number:
                                    </div>
                                    <div className='w-[70%]'>
                                        <input
                                            style={{ padding: "8px 10px 8px 16px", border: "1px solid #9CA3AF" }}
                                            className='w-[300px] ml-[17px] h-[44px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                                            placeholder="Type your name"
                                            type="text"
                                            value={medicalNumber}
                                            onChange={handleMedicalNumberChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='flex flex-col gap-[83px] w-[50%]'>
                                <div className='flex'>
                                    <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                        Issue Date:
                                    </div>
                                    <div className='w-[70%]'>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <MobileDatePicker
                                                value={medicalIssueDate}
                                                onChange={handleMedicalIssueDateChange}
                                                renderInput={(params) => <TextField
                                                    onClick={() => console.log("asd")}
                                                    sx={{
                                                        width: 300,
                                                        backgroundColor: "#fff",
                                                        marginLeft: '17px'
                                                    }}
                                                    {...params}
                                                />}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </div>

                                <div className='flex'>
                                    <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                        Expiry Date:
                                    </div>
                                    <div className='w-[70%]'>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <MobileDatePicker
                                                value={medicalExpirationDate}
                                                onChange={handleMedicalExpirationDateChange}
                                                renderInput={(params) => <TextField
                                                    onClick={() => console.log("asd")}
                                                    sx={{
                                                        width: 300,
                                                        backgroundColor: "#fff",
                                                        marginLeft: "17px"
                                                    }} {...params}
                                                />}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Your Medical Certificates element */}
                <div className='flex flex-col gap-[25px] mt-[10px] mb-[40px]'>
                    <div className='text-[32px] leading-[36px] text-[#374151] font-[700] '>Your Certificates of Competency</div>

                    <table>
                        <thead className='bg-[#116ACC] h-[64px] '>
                            <tr className='rounded-[15px]'>
                                <th className='w-[20%]'>Name</th>
                                <th className='w-[20%]'>Number</th>
                                <th className='w-[20%]'>Issue Date</th>
                                <th className='w-[30%]'>Expiry Date</th>
                                <th className='w-[10%]'>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                medical.map((item, i) => {
                                    return (
                                        <tr key={i}>
                                            <td className='text-start'>{item.name}</td>
                                            <td className='text-start'>{item.number}</td>
                                            <td className='text-start'>{item.issue_date}</td>
                                            <td className='text-start'>{item.expiry_date}</td>
                                            <td className='text-start flex gap-[10px]'>
                                                <button id="delete"
                                                    onClick={() => handleDeleteMedical(item.id)}
                                                    style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}>
                                                    <img src="/image/delete.png" alt="delete" />
                                                </button>
                                                <button id="edit" style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}>
                                                    <img src="/image/edit.png" alt="edit" />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Certificates STCW and Offshore  */}

            <div style={{ padding: "48px 58px" }} className='flex flex-col bg-[#F3F4F6] rounded-[56px] pt-[48px] pl-[58px] gap-[27px] mt-[80px]'>
                <div className='flex'>
                    <p className='text-[48px] leading-[56px] font-[600] text-[#116ACC]'>Certificates STCW and Offshore</p>
                    <Select className='w-[300px] rounded-[10px] ml-[60px] mt-[13px]' placeholder="Please select" onChange={selectOffshore} options={offshoreOptions} />
                    <input
                        style={{ padding: "8px 10px 8px 16px", border: "1px solid #9CA3AF" }}
                        className='w-[300px] ml-[17px] h-[38px] mt-[13px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                        placeholder="Type your Certifications"
                        type="text"
                        value={addOffshore}
                        onChange={handleOffshoreChange}
                    />
                    <button id="check" onClick={submitCategory} style={{ padding: "4px 10px" }} className='rounded-[8px] bg-[#fff] mt-[13px] ml-[23px] h-[38px]'>
                        <img src='/image/check.png' alt="x" />
                    </button>
                </div>
                {/* BOSIET 5700 element */}
                <div style={{ border: "1px dashed #7B61FF", padding: "41px 37px" }} className='flex flex-col gap-[53px] rounded-[5px] w-full box-border'>
                    <div className="flex w-full">
                        <div className='w-[80%] font-[700] text-[32px] leading-[36px] text-[#374151]'>{selectedOffshore}</div>
                        <div className='flex justify-end w-[20%]'>
                            <button
                                onClick={submitOffshore}
                                className='w-[82px] h-[52px] text-[16px] font-[500] leading-[20px] rounded-[7px] text-[#fff] bg-[#116ACC]'>
                                ADD
                            </button>
                        </div>
                    </div>

                    <div className='flex flex-col gap-[83px] w-full'>
                        <div className='flex w-full'>
                            <div className='flex flex-col gap-[83px] w-[50%]'>
                                <div className='flex'>
                                    <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                        Number:
                                    </div>
                                    <div className='w-[70%]'>
                                        <input
                                            style={{ padding: "8px 10px 8px 16px", border: "1px solid #9CA3AF" }}
                                            className='w-[300px] ml-[17px] h-[44px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                                            placeholder="Type your name"
                                            type="text"
                                            value={offshoreNumber}
                                            onChange={handleOffshoreNumberChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='flex flex-col gap-[83px] w-[50%]'>
                                <div className='flex'>
                                    <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                        Issue Date:
                                    </div>
                                    <div className='w-[70%]'>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <MobileDatePicker
                                                value={offshoreIssueDate}
                                                onChange={handleOffshoreIssueDateChange}
                                                renderInput={(params) => <TextField
                                                    onClick={() => console.log("asd")}
                                                    sx={{
                                                        width: 300,
                                                        backgroundColor: "#fff",
                                                        marginLeft: '17px'
                                                    }}
                                                    {...params}
                                                />}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </div>

                                <div className='flex'>
                                    <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                        Expiry Date:
                                    </div>
                                    <div className='w-[70%]'>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <MobileDatePicker
                                                value={offshoreExpirationDate}
                                                onChange={handleOffshoreExpirationDateChange}
                                                renderInput={(params) => <TextField
                                                    onClick={() => console.log("asd")}
                                                    sx={{
                                                        width: 300,
                                                        backgroundColor: "#fff",
                                                        marginLeft: "17px"
                                                    }} {...params}
                                                />}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Your Certificates STCW and Offshore element */}
                <div className='flex flex-col gap-[25px] mt-[10px] mb-[40px]'>
                    <div className='text-[32px] leading-[36px] text-[#374151] font-[700] '>Your Certificates STCW and Offshore</div>

                    <table>
                        <thead className='bg-[#116ACC] h-[64px] '>
                            <tr className='rounded-[15px]'>
                                <th className='w-[20%]'>Name</th>
                                <th className='w-[20%]'>Number</th>
                                <th className='w-[20%]'>Issue Date</th>
                                <th className='w-[30%]'>Expiry Date</th>
                                <th className='w-[10%]'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                offshore.map((item, i) => {
                                    return (
                                        <tr key={i}>
                                            <td className='text-start'>{item.name}</td>
                                            <td className='text-start'>{item.number}</td>
                                            <td className='text-start'>{item.issue_date}</td>
                                            <td className='text-start'>{item.expiry_date}</td>
                                            <td className='text-start flex gap-[10px]'>
                                                <button id="delete"
                                                    onClick={() => handleDeleteOffshore(item.id)}
                                                    style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}>
                                                    <img src="/image/delete.png" alt="delete" />
                                                </button>
                                                <button id="edit" style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}>
                                                    <img src="/image/edit.png" alt="edit" />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Sea Experience element */}

            <div style={{ padding: "48px 58px" }} className='flex flex-col bg-[#F3F4F6] rounded-[56px] pt-[67px] pl-[58px] gap-[47px] mt-[80px]'>
                <div className='flex'>
                    <p className='text-[48px] leading-[56px] font-[600] w-[40%] text-[#116ACC]'>Sea experience </p>
                </div>
                <div style={{ border: "1px dashed #7B61FF", padding: "58px 71px" }} className='flex flex-col rounded-[5px] w-full box-border'>
                    <div className='flex justify-end mb-[50px]'>
                        <button className='w-[82px] h-[52px] text-[16px] font-[500] leading-[20px] rounded-[7px] text-[#fff] bg-[#116ACC]'>ADD</button>
                    </div>
                    <div className='flex'>
                        <div className='flex flex-col gap-[83px] w-[50%]'>
                            <div className='flex'>
                                <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                    Vessel:
                                </div>
                                <div className='w-[70%]'>
                                    <input
                                        style={{ padding: "8px 10px 8px 16px", border: "1px solid #9CA3AF" }}
                                        className='w-[300px] ml-[17px] h-[44px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                                        placeholder="Type your name"
                                        type="text"
                                        value={name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className='flex'>
                                <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                    Vessel Type:
                                </div>
                                <div className='w-[70%]'>
                                    <Select className='w-[300px] rounded-[10px] ml-[17px] mt-[3px]' placeholder="Please select" options={langOptions} />
                                </div>
                            </div>

                            <div className='flex'>
                                <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                    Rank:
                                </div>
                                <div className='w-[70%]'>
                                    <Select className='w-[300px] rounded-[10px] ml-[17px] mt-[3px]' placeholder="Please select" options={langOptions} />
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col gap-[83px] w-[50%]'>
                            <div className='flex'>
                                <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                    Amount of Contratcs:
                                </div>
                                <div className='w-[70%]'>
                                    <input
                                        style={{ padding: "8px 10px 8px 16px", border: "1px solid #9CA3AF" }}
                                        className='w-[300px] ml-[17px] h-[44px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                                        placeholder="Type your phone number"
                                        type="text"
                                        value={name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className='flex'>
                                <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                    Each Contract duration (average):
                                </div>
                                <div className='w-[70%]'>
                                    <input
                                        style={{ padding: "8px 10px 8px 16px", border: "1px solid #9CA3AF" }}
                                        className='w-[300px] ml-[17px] h-[44px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                                        placeholder="Type your phone number"
                                        type="text"
                                        value={name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className='flex'>
                                <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                    Description of Job Performed:
                                </div>
                                <div className='w-[70%]'>
                                    <input
                                        style={{ padding: "8px 10px 8px 16px", border: "1px solid #9CA3AF" }}
                                        className='w-[300px] ml-[17px] h-[44px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                                        placeholder="Type your email"
                                        type="email"
                                        value={name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Your Sea Experience element */}

                <div className='flex flex-col gap-[25px] mt-[10px] mb-[40px]'>
                    <div className='text-[32px] leading-[36px] text-[#374151] font-[700] '>Your Certificates STCW and Offshore</div>

                    <table>
                        <thead className='bg-[#116ACC] h-[64px] '>
                            <tr className='rounded-[15px]'>
                                <th className='w-[14%]'>Vessel</th>
                                <th className='w-[14%]'>Vessel Type</th>
                                <th className='w-[12%]'>Rank</th>
                                <th className='w-[14%]'>Contracts</th>
                                <th className='w-[18%]'>Contract Duration</th>
                                <th className='w-[18%]'>Description</th>
                                <th className='w-[10%]'>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td className='text-start'>Vessel Name</td>
                                <td className='text-start'>Vessel Type</td>
                                <td className='text-start'>Captain</td>
                                <td className='text-start'>20</td>
                                <td className='text-start'>6 months</td>
                                <td className='text-start'>I was the main on the board</td>
                                <td className='text-start flex gap-[10px]'>
                                    <button id="delete" style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}>
                                        <img src="/image/delete.png" alt="delete" />
                                    </button>
                                    <button id="edit" style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}>
                                        <img src="/image/edit.png" alt="edit" />
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td className='text-start'>Vessel Name</td>
                                <td className='text-start'>Vessel Type</td>
                                <td className='text-start'>Captain</td>
                                <td className='text-start'>20</td>
                                <td className='text-start'>6 months</td>
                                <td className='text-start'>I was the main on the board</td>
                                <td className='text-start flex gap-[10px]'>
                                    <button id="delete" style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}>
                                        <img src="/image/delete.png" alt="delete" />
                                    </button>
                                    <button id="edit" style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}>
                                        <img src="/image/edit.png" alt="edit" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Additional information   */}

            <div style={{ padding: "48px 58px" }} className='flex flex-col bg-[#F3F4F6] rounded-[56px] pt-[48px] pl-[58px] gap-[27px] mt-[80px]'>
                <div className='flex'>
                    <p className='text-[48px] leading-[56px] font-[600] text-[#116ACC]'>Additional information</p>
                </div>

                <div style={{ border: "1px dashed #7B61FF", padding: "41px 37px" }} className='flex flex-col gap-[53px] rounded-[5px] w-full box-border'>
                    <div className="flex w-full">
                        <div className='flex justify-end w-full'>
                            <button className='w-[82px] h-[52px] text-[16px] font-[500] leading-[20px] rounded-[7px] text-[#fff] bg-[#116ACC]'>ADD</button>
                        </div>
                    </div>

                    <div className='flex flex-col gap-[83px] w-full'>
                        <div className='flex w-full'>
                            <div className='flex flex-col gap-[83px] w-[50%]'>
                                <div className='flex'>
                                    <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                        Languages:
                                    </div>
                                    <div className='w-[70%]'>
                                        <Select className='w-[300px] rounded-[10px] ml-[17px] mt-[3px]' placeholder="Please select" options={langOptions} />
                                    </div>
                                </div>
                            </div>

                            <div className='flex flex-col gap-[83px] w-[50%]'>
                                <div className='flex'>
                                    <div className='w-[40%] label-style pt-[10px] flex justify-end'>
                                        Computer:
                                    </div>
                                    <div className='w-[60%]'>
                                        <input
                                            style={{ padding: "8px 10px 8px 16px", border: "1px solid #9CA3AF" }}
                                            className='w-[300px] ml-[17px] h-[44px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                                            placeholder="Type your Computer Skills"
                                            type="text"
                                            value={name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className='flex'>
                                    <div className='w-[40%] label-style pt-[10px] flex justify-end'>
                                        Additional Training and Skills:
                                    </div>
                                    <div className='w-[60%]'>
                                        <input
                                            style={{ padding: "8px 10px 8px 16px", border: "1px solid #9CA3AF" }}
                                            className='w-[300px] ml-[17px] h-[44px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                                            placeholder="Type your Skills"
                                            type="text"
                                            value={name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Your Additional Information element */}
                <div className='flex flex-col gap-[25px] mt-[10px] mb-[40px]'>
                    <div className='text-[32px] leading-[36px] text-[#374151] font-[700] '>Your Additional Information</div>

                    <table>
                        <thead className='bg-[#116ACC] h-[64px] '>
                            <tr className='rounded-[15px]'>
                                <th className='w-[25%]'>Languages</th>
                                <th className='w-[25%]'>Computer</th>
                                <th className='w-[40%]'>Additional trainings and skills</th>
                                <th className='w-[10%]'>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td className='text-start'>LV/ENG/RUS</td>
                                <td className='text-start'>Word/Excel/Explorer</td>
                                <td className='text-start'>I am very trained </td>
                                <td className='text-start flex gap-[10px]'>
                                    <button id="delete" style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}>
                                        <img src="/image/delete.png" alt="delete" />
                                    </button>
                                    <button id="edit" style={{ padding: "8px 14px", borderRadius: "8px", backgroundColor: "#fff", width: "44px", height: "44px" }}>
                                        <img src="/image/edit.png" alt="edit" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className='flex justify-end mr-[100px] mt-[96px] pt-[96x]'>
                <button className='mt-[96x] bg-[#116ACC] rounded-[7px] w-[117px] h-[52px] text-[16px] font-[500] text-[#fff]' type='button'>PREVIEW</button>
            </div>
        </div>
    )
}
