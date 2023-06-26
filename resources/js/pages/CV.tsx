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
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import { AutocompleteChangeReason, AutocompleteChangeDetails } from '@mui/lab';

// slice part
import { setDocument, createDocument, updateDocument, deleteDocument } from '../redux/reducers/documentslice';
import { setMarintime, createMarintime, updateMarintime, deleteMarintime } from '../redux/reducers/marintimeslice';
import { setCompetency, createCompetency, updateCompetency, deleteCompetency } from '../redux/reducers/competencyslice';
import { setMedical, createMedical, updateMedical, deleteMedical } from '../redux/reducers/medicalslice';
import { setOffshore, createOffshore, updateOffshore, deleteOffshore } from '../redux/reducers/offshoreslice';
import { setSea, createSea, updateSea, deleteSea } from '../redux/reducers/seaslice';
import { setInfomation, createInfomation, updateInfomation, deleteInfomation } from '../redux/reducers/informationslice';

interface CountryType {
    code: string;
    label: string;
    phone: string;
    suggested?: boolean;
}

export default function CV() {
    const countries: readonly CountryType[] = [
        { code: 'AD', label: 'Andorra', phone: '376' },
        {
            code: 'AE',
            label: 'United Arab Emirates',
            phone: '971',
        },
        { code: 'AF', label: 'Afghanistan', phone: '93' },
        {
            code: 'AG',
            label: 'Antigua and Barbuda',
            phone: '1-268',
        },
        { code: 'AI', label: 'Anguilla', phone: '1-264' },
        { code: 'AL', label: 'Albania', phone: '355' },
        { code: 'AM', label: 'Armenia', phone: '374' },
        { code: 'AO', label: 'Angola', phone: '244' },
        { code: 'AQ', label: 'Antarctica', phone: '672' },
        { code: 'AR', label: 'Argentina', phone: '54' },
        { code: 'AS', label: 'American Samoa', phone: '1-684' },
        { code: 'AT', label: 'Austria', phone: '43' },
        {
            code: 'AU',
            label: 'Australia',
            phone: '61',
            suggested: true,
        },
        { code: 'AW', label: 'Aruba', phone: '297' },
        { code: 'AX', label: 'Alland Islands', phone: '358' },
        { code: 'AZ', label: 'Azerbaijan', phone: '994' },
        {
            code: 'BA',
            label: 'Bosnia and Herzegovina',
            phone: '387',
        },
        { code: 'BB', label: 'Barbados', phone: '1-246' },
        { code: 'BD', label: 'Bangladesh', phone: '880' },
        { code: 'BE', label: 'Belgium', phone: '32' },
        { code: 'BF', label: 'Burkina Faso', phone: '226' },
        { code: 'BG', label: 'Bulgaria', phone: '359' },
        { code: 'BH', label: 'Bahrain', phone: '973' },
        { code: 'BI', label: 'Burundi', phone: '257' },
        { code: 'BJ', label: 'Benin', phone: '229' },
        { code: 'BL', label: 'Saint Barthelemy', phone: '590' },
        { code: 'BM', label: 'Bermuda', phone: '1-441' },
        { code: 'BN', label: 'Brunei Darussalam', phone: '673' },
        { code: 'BO', label: 'Bolivia', phone: '591' },
        { code: 'BR', label: 'Brazil', phone: '55' },
        { code: 'BS', label: 'Bahamas', phone: '1-242' },
        { code: 'BT', label: 'Bhutan', phone: '975' },
        { code: 'BV', label: 'Bouvet Island', phone: '47' },
        { code: 'BW', label: 'Botswana', phone: '267' },
        { code: 'BY', label: 'Belarus', phone: '375' },
        { code: 'BZ', label: 'Belize', phone: '501' },
        {
            code: 'CA',
            label: 'Canada',
            phone: '1',
            suggested: true,
        },
        {
            code: 'CC',
            label: 'Cocos (Keeling) Islands',
            phone: '61',
        },
        {
            code: 'CD',
            label: 'Congo, Democratic Republic of the',
            phone: '243',
        },
        {
            code: 'CF',
            label: 'Central African Republic',
            phone: '236',
        },
        {
            code: 'CG',
            label: 'Congo, Republic of the',
            phone: '242',
        },
        { code: 'CH', label: 'Switzerland', phone: '41' },
        { code: 'CI', label: "Cote d'Ivoire", phone: '225' },
        { code: 'CK', label: 'Cook Islands', phone: '682' },
        { code: 'CL', label: 'Chile', phone: '56' },
        { code: 'CM', label: 'Cameroon', phone: '237' },
        { code: 'CN', label: 'China', phone: '86' },
        { code: 'CO', label: 'Colombia', phone: '57' },
        { code: 'CR', label: 'Costa Rica', phone: '506' },
        { code: 'CU', label: 'Cuba', phone: '53' },
        { code: 'CV', label: 'Cape Verde', phone: '238' },
        { code: 'CW', label: 'Curacao', phone: '599' },
        { code: 'CX', label: 'Christmas Island', phone: '61' },
        { code: 'CY', label: 'Cyprus', phone: '357' },
        { code: 'CZ', label: 'Czech Republic', phone: '420' },
        {
            code: 'DE',
            label: 'Germany',
            phone: '49',
            suggested: true,
        },
        { code: 'DJ', label: 'Djibouti', phone: '253' },
        { code: 'DK', label: 'Denmark', phone: '45' },
        { code: 'DM', label: 'Dominica', phone: '1-767' },
        {
            code: 'DO',
            label: 'Dominican Republic',
            phone: '1-809',
        },
        { code: 'DZ', label: 'Algeria', phone: '213' },
        { code: 'EC', label: 'Ecuador', phone: '593' },
        { code: 'EE', label: 'Estonia', phone: '372' },
        { code: 'EG', label: 'Egypt', phone: '20' },
        { code: 'EH', label: 'Western Sahara', phone: '212' },
        { code: 'ER', label: 'Eritrea', phone: '291' },
        { code: 'ES', label: 'Spain', phone: '34' },
        { code: 'ET', label: 'Ethiopia', phone: '251' },
        { code: 'FI', label: 'Finland', phone: '358' },
        { code: 'FJ', label: 'Fiji', phone: '679' },
        {
            code: 'FK',
            label: 'Falkland Islands (Malvinas)',
            phone: '500',
        },
        {
            code: 'FM',
            label: 'Micronesia, Federated States of',
            phone: '691',
        },
        { code: 'FO', label: 'Faroe Islands', phone: '298' },
        {
            code: 'FR',
            label: 'France',
            phone: '33',
            suggested: true,
        },
        { code: 'GA', label: 'Gabon', phone: '241' },
        { code: 'GB', label: 'United Kingdom', phone: '44' },
        { code: 'GD', label: 'Grenada', phone: '1-473' },
        { code: 'GE', label: 'Georgia', phone: '995' },
        { code: 'GF', label: 'French Guiana', phone: '594' },
        { code: 'GG', label: 'Guernsey', phone: '44' },
        { code: 'GH', label: 'Ghana', phone: '233' },
        { code: 'GI', label: 'Gibraltar', phone: '350' },
        { code: 'GL', label: 'Greenland', phone: '299' },
        { code: 'GM', label: 'Gambia', phone: '220' },
        { code: 'GN', label: 'Guinea', phone: '224' },
        { code: 'GP', label: 'Guadeloupe', phone: '590' },
        { code: 'GQ', label: 'Equatorial Guinea', phone: '240' },
        { code: 'GR', label: 'Greece', phone: '30' },
        {
            code: 'GS',
            label: 'South Georgia and the South Sandwich Islands',
            phone: '500',
        },
        { code: 'GT', label: 'Guatemala', phone: '502' },
        { code: 'GU', label: 'Guam', phone: '1-671' },
        { code: 'GW', label: 'Guinea-Bissau', phone: '245' },
        { code: 'GY', label: 'Guyana', phone: '592' },
        { code: 'HK', label: 'Hong Kong', phone: '852' },
        {
            code: 'HM',
            label: 'Heard Island and McDonald Islands',
            phone: '672',
        },
        { code: 'HN', label: 'Honduras', phone: '504' },
        { code: 'HR', label: 'Croatia', phone: '385' },
        { code: 'HT', label: 'Haiti', phone: '509' },
        { code: 'HU', label: 'Hungary', phone: '36' },
        { code: 'ID', label: 'Indonesia', phone: '62' },
        { code: 'IE', label: 'Ireland', phone: '353' },
        { code: 'IL', label: 'Israel', phone: '972' },
        { code: 'IM', label: 'Isle of Man', phone: '44' },
        { code: 'IN', label: 'India', phone: '91' },
        {
            code: 'IO',
            label: 'British Indian Ocean Territory',
            phone: '246',
        },
        { code: 'IQ', label: 'Iraq', phone: '964' },
        {
            code: 'IR',
            label: 'Iran, Islamic Republic of',
            phone: '98',
        },
        { code: 'IS', label: 'Iceland', phone: '354' },
        { code: 'IT', label: 'Italy', phone: '39' },
        { code: 'JE', label: 'Jersey', phone: '44' },
        { code: 'JM', label: 'Jamaica', phone: '1-876' },
        { code: 'JO', label: 'Jordan', phone: '962' },
        {
            code: 'JP',
            label: 'Japan',
            phone: '81',
            suggested: true,
        },
        { code: 'KE', label: 'Kenya', phone: '254' },
        { code: 'KG', label: 'Kyrgyzstan', phone: '996' },
        { code: 'KH', label: 'Cambodia', phone: '855' },
        { code: 'KI', label: 'Kiribati', phone: '686' },
        { code: 'KM', label: 'Comoros', phone: '269' },
        {
            code: 'KN',
            label: 'Saint Kitts and Nevis',
            phone: '1-869',
        },
        {
            code: 'KP',
            label: "Korea, Democratic People's Republic of",
            phone: '850',
        },
        { code: 'KR', label: 'Korea, Republic of', phone: '82' },
        { code: 'KW', label: 'Kuwait', phone: '965' },
        { code: 'KY', label: 'Cayman Islands', phone: '1-345' },
        { code: 'KZ', label: 'Kazakhstan', phone: '7' },
        {
            code: 'LA',
            label: "Lao People's Democratic Republic",
            phone: '856',
        },
        { code: 'LB', label: 'Lebanon', phone: '961' },
        { code: 'LC', label: 'Saint Lucia', phone: '1-758' },
        { code: 'LI', label: 'Liechtenstein', phone: '423' },
        { code: 'LK', label: 'Sri Lanka', phone: '94' },
        { code: 'LR', label: 'Liberia', phone: '231' },
        { code: 'LS', label: 'Lesotho', phone: '266' },
        { code: 'LT', label: 'Lithuania', phone: '370' },
        { code: 'LU', label: 'Luxembourg', phone: '352' },
        { code: 'LV', label: 'Latvia', phone: '371' },
        { code: 'LY', label: 'Libya', phone: '218' },
        { code: 'MA', label: 'Morocco', phone: '212' },
        { code: 'MC', label: 'Monaco', phone: '377' },
        {
            code: 'MD',
            label: 'Moldova, Republic of',
            phone: '373',
        },
        { code: 'ME', label: 'Montenegro', phone: '382' },
        {
            code: 'MF',
            label: 'Saint Martin (French part)',
            phone: '590',
        },
        { code: 'MG', label: 'Madagascar', phone: '261' },
        { code: 'MH', label: 'Marshall Islands', phone: '692' },
        {
            code: 'MK',
            label: 'Macedonia, the Former Yugoslav Republic of',
            phone: '389',
        },
        { code: 'ML', label: 'Mali', phone: '223' },
        { code: 'MM', label: 'Myanmar', phone: '95' },
        { code: 'MN', label: 'Mongolia', phone: '976' },
        { code: 'MO', label: 'Macao', phone: '853' },
        {
            code: 'MP',
            label: 'Northern Mariana Islands',
            phone: '1-670',
        },
        { code: 'MQ', label: 'Martinique', phone: '596' },
        { code: 'MR', label: 'Mauritania', phone: '222' },
        { code: 'MS', label: 'Montserrat', phone: '1-664' },
        { code: 'MT', label: 'Malta', phone: '356' },
        { code: 'MU', label: 'Mauritius', phone: '230' },
        { code: 'MV', label: 'Maldives', phone: '960' },
        { code: 'MW', label: 'Malawi', phone: '265' },
        { code: 'MX', label: 'Mexico', phone: '52' },
        { code: 'MY', label: 'Malaysia', phone: '60' },
        { code: 'MZ', label: 'Mozambique', phone: '258' },
        { code: 'NA', label: 'Namibia', phone: '264' },
        { code: 'NC', label: 'New Caledonia', phone: '687' },
        { code: 'NE', label: 'Niger', phone: '227' },
        { code: 'NF', label: 'Norfolk Island', phone: '672' },
        { code: 'NG', label: 'Nigeria', phone: '234' },
        { code: 'NI', label: 'Nicaragua', phone: '505' },
        { code: 'NL', label: 'Netherlands', phone: '31' },
        { code: 'NO', label: 'Norway', phone: '47' },
        { code: 'NP', label: 'Nepal', phone: '977' },
        { code: 'NR', label: 'Nauru', phone: '674' },
        { code: 'NU', label: 'Niue', phone: '683' },
        { code: 'NZ', label: 'New Zealand', phone: '64' },
        { code: 'OM', label: 'Oman', phone: '968' },
        { code: 'PA', label: 'Panama', phone: '507' },
        { code: 'PE', label: 'Peru', phone: '51' },
        { code: 'PF', label: 'French Polynesia', phone: '689' },
        { code: 'PG', label: 'Papua New Guinea', phone: '675' },
        { code: 'PH', label: 'Philippines', phone: '63' },
        { code: 'PK', label: 'Pakistan', phone: '92' },
        { code: 'PL', label: 'Poland', phone: '48' },
        {
            code: 'PM',
            label: 'Saint Pierre and Miquelon',
            phone: '508',
        },
        { code: 'PN', label: 'Pitcairn', phone: '870' },
        { code: 'PR', label: 'Puerto Rico', phone: '1' },
        {
            code: 'PS',
            label: 'Palestine, State of',
            phone: '970',
        },
        { code: 'PT', label: 'Portugal', phone: '351' },
        { code: 'PW', label: 'Palau', phone: '680' },
        { code: 'PY', label: 'Paraguay', phone: '595' },
        { code: 'QA', label: 'Qatar', phone: '974' },
        { code: 'RE', label: 'Reunion', phone: '262' },
        { code: 'RO', label: 'Romania', phone: '40' },
        { code: 'RS', label: 'Serbia', phone: '381' },
        { code: 'RU', label: 'Russian Federation', phone: '7' },
        { code: 'RW', label: 'Rwanda', phone: '250' },
        { code: 'SA', label: 'Saudi Arabia', phone: '966' },
        { code: 'SB', label: 'Solomon Islands', phone: '677' },
        { code: 'SC', label: 'Seychelles', phone: '248' },
        { code: 'SD', label: 'Sudan', phone: '249' },
        { code: 'SE', label: 'Sweden', phone: '46' },
        { code: 'SG', label: 'Singapore', phone: '65' },
        { code: 'SH', label: 'Saint Helena', phone: '290' },
        { code: 'SI', label: 'Slovenia', phone: '386' },
        {
            code: 'SJ',
            label: 'Svalbard and Jan Mayen',
            phone: '47',
        },
        { code: 'SK', label: 'Slovakia', phone: '421' },
        { code: 'SL', label: 'Sierra Leone', phone: '232' },
        { code: 'SM', label: 'San Marino', phone: '378' },
        { code: 'SN', label: 'Senegal', phone: '221' },
        { code: 'SO', label: 'Somalia', phone: '252' },
        { code: 'SR', label: 'Suriname', phone: '597' },
        { code: 'SS', label: 'South Sudan', phone: '211' },
        {
            code: 'ST',
            label: 'Sao Tome and Principe',
            phone: '239',
        },
        { code: 'SV', label: 'El Salvador', phone: '503' },
        {
            code: 'SX',
            label: 'Sint Maarten (Dutch part)',
            phone: '1-721',
        },
        {
            code: 'SY',
            label: 'Syrian Arab Republic',
            phone: '963',
        },
        { code: 'SZ', label: 'Swaziland', phone: '268' },
        {
            code: 'TC',
            label: 'Turks and Caicos Islands',
            phone: '1-649',
        },
        { code: 'TD', label: 'Chad', phone: '235' },
        {
            code: 'TF',
            label: 'French Southern Territories',
            phone: '262',
        },
        { code: 'TG', label: 'Togo', phone: '228' },
        { code: 'TH', label: 'Thailand', phone: '66' },
        { code: 'TJ', label: 'Tajikistan', phone: '992' },
        { code: 'TK', label: 'Tokelau', phone: '690' },
        { code: 'TL', label: 'Timor-Leste', phone: '670' },
        { code: 'TM', label: 'Turkmenistan', phone: '993' },
        { code: 'TN', label: 'Tunisia', phone: '216' },
        { code: 'TO', label: 'Tonga', phone: '676' },
        { code: 'TR', label: 'Turkey', phone: '90' },
        {
            code: 'TT',
            label: 'Trinidad and Tobago',
            phone: '1-868',
        },
        { code: 'TV', label: 'Tuvalu', phone: '688' },
        {
            code: 'TW',
            label: 'Taiwan, Republic of China',
            phone: '886',
        },
        {
            code: 'TZ',
            label: 'United Republic of Tanzania',
            phone: '255',
        },
        { code: 'UA', label: 'Ukraine', phone: '380' },
        { code: 'UG', label: 'Uganda', phone: '256' },
        {
            code: 'US',
            label: 'United States',
            phone: '1',
            suggested: true,
        },
        { code: 'UY', label: 'Uruguay', phone: '598' },
        { code: 'UZ', label: 'Uzbekistan', phone: '998' },
        {
            code: 'VA',
            label: 'Holy See (Vatican City State)',
            phone: '379',
        },
        {
            code: 'VC',
            label: 'Saint Vincent and the Grenadines',
            phone: '1-784',
        },
        { code: 'VE', label: 'Venezuela', phone: '58' },
        {
            code: 'VG',
            label: 'British Virgin Islands',
            phone: '1-284',
        },
        {
            code: 'VI',
            label: 'US Virgin Islands',
            phone: '1-340',
        },
        { code: 'VN', label: 'Vietnam', phone: '84' },
        { code: 'VU', label: 'Vanuatu', phone: '678' },
        { code: 'WF', label: 'Wallis and Futuna', phone: '681' },
        { code: 'WS', label: 'Samoa', phone: '685' },
        { code: 'XK', label: 'Kosovo', phone: '383' },
        { code: 'YE', label: 'Yemen', phone: '967' },
        { code: 'YT', label: 'Mayotte', phone: '262' },
        { code: 'ZA', label: 'South Africa', phone: '27' },
        { code: 'ZM', label: 'Zambia', phone: '260' },
        { code: 'ZW', label: 'Zimbabwe', phone: '263' },
    ];

    const dispatch = useAppDispatch();

    useEffect(() => {
        axios.get('/api/category/getCategories')
            .then((res: AxiosResponse) => {
                dispatch(setCategory(res.data.data))
            })
    }, [dispatch])

    const categories = useSelector((state: RootState) => state.categories.category);

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

    /*  Sea Experience table state management */
    // Inputs States
    const [seaVessel, setSeaVessel] = useState<string | undefined>('');
    const [seaRank, setSeaRank] = useState<string | undefined>('');
    const [seaAmountContract, setSeaAmountContract] = useState<string | undefined>('');
    const [seaContract, setSeaContract] = useState<string | undefined>('');
    const [seaJob, setSeaJob] = useState<string | undefined>('');
    const [seaVesselType, setSeaVesselType] = useState<string>('')
    // HandleChange functions
    const handleSeaVesselChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSeaVessel(event.target.value);
    };
    const handleSeaAmountContractChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSeaAmountContract(event.target.value);
    };
    const handleSeaRankChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSeaRank(event.target.value);
    };
    const handleSeaContractChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSeaContract(event.target.value);
    };
    const handleSeaJobChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSeaJob(event.target.value);
    };
    const handleSeaVesselTypeChange = (option: SingleValue<{ value: string; label: string; }>) => {
        setSeaVesselType(option?.label ?? '');
    };

    //  Sea Data
    const SeaData = {
        'userId': localStorage.getItem('userId'),
        'vessel': seaVessel,
        'vessel_type': seaVesselType,
        'rank': seaRank,
        'contracts': seaAmountContract,
        'contract_duration': seaContract,
        'description': seaJob,
    }
    useEffect(() => {
        axios.get('/api/controller/getSea')
            .then((res: AxiosResponse) => {
                dispatch(setSea(res.data.data))
            })
    }, [dispatch])
    const submitSea = () => {
        axios.post('/api/controller/addSea', SeaData)
            .then((res: AxiosResponse) => {
                dispatch(createSea(res.data.data))
            })
        setSeaVessel('');
        setSeaAmountContract('');
        setSeaRank('');
        setSeaContract('');
        setSeaJob('');
        setSeaVesselType('');
    }
    //  Sea State Value
    const sea = useSelector((state: RootState) => state.seas.sea)
    //  Delete Sea table
    const handleDeleteSea = (id: number) => {
        axios.delete(`/api/controller/deleteSea/${id}`)
            .then((res: AxiosResponse) => {
                dispatch(deleteSea(id))
            })
    }

    /*  Sea Experience table state management */
    //  Inputs States
    const [language, setLanguage] = useState<string>('')
    const [computer, setComputer] = useState<string | undefined>('');
    const [training, setTraining] = useState<string | undefined>('');
    //  HandleChange Functions
    const handleTrainingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTraining(event.target.value);
    };
    const handleComputerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComputer(event.target.value);
    };
    const handleLanuguageChange = (option: SingleValue<{ value: string; label: string; }>) => {
        setLanguage(option?.label ?? '');
    };
    //  Add Informations Data
    const InfoData = {
        'userId': localStorage.getItem('userId'),
        'languages': language,
        'computer': computer,
        'add_skills': training
    }
    useEffect(() => {
        axios.get('/api/controller/getInfo')
            .then((res: AxiosResponse) => {
                dispatch(setInfomation(res.data.data))
            })
    }, [dispatch])
    const submitInfo = () => {
        axios.post('/api/controller/addInfo', InfoData)
            .then((res: AxiosResponse) => {
                dispatch(createInfomation(res.data.data))
            })
        setLanguage('');
        setComputer('');
        setTraining('');
    }
    //  Sea State Value
    const information = useSelector((state: RootState) => state.informations.information)
    //  Delete Sea table
    const handleDeleteInfo = (id: number) => {
        axios.delete(`/api/controller/deleteInfo/${id}`)
            .then((res: AxiosResponse) => {
                dispatch(deleteInfomation(id))
            })
    }
    /*  Personal Data table state management */
    //  Inputs state
    const [name, setName] = useState<string | undefined>('');
    const [birthday, setBrithday] = useState<Date | null>(new Date());
    const [surname, setSurname] = useState<string | undefined>('');
    const [citizen, setCitizen] = useState<string | undefined>('');
    const [personalCountry, setPersonalCountry] = useState<string | undefined>('');
    const [airport, setAirport] = useState<string | undefined>('');
    const [phone, setPhone] = useState<string | undefined>('');
    const [email, setEmail] = useState<string | undefined>('');
    const [link, setLink] = useState<string | undefined>('');
    const [gender, setGender] = useState<string | undefined>('');
    //  HandleChange Functions
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleSurNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSurname(event.target.value);
    };

    const handleCitizenChange = (event: React.SyntheticEvent<Element, Event>, value: CountryType | null, reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<any>) => {
        setCitizen(value?.label);
    };

    const handlePersonalCountryChange = (event: React.SyntheticEvent<Element, Event>, value: CountryType | null, reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<any>) => {
        setPersonalCountry(value?.label)
    };

    const handleAirPortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAirport(event.target.value);
    };

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(event.target.value);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLink(event.target.value);
    };

    const handleGenderChange = (option: SingleValue<{ value: string; label: string; }>) => {
        setGender(option?.label ?? '');
    };
    function handleBirthdayChange(date: Date | null) {
        setBrithday(date);
    }
    //  Personal Data
    const PersonalData = {
        
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

    const genderOptions = [
        { value: 'Man', label: 'Man' },
        { value: 'Man', label: 'Man' }
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
                                        value={surname}
                                        onChange={handleSurNameChange}
                                    />
                                </div>
                            </div>

                            <div className='flex'>
                                <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                    Citizenship:
                                </div>
                                <div className='w-[70%]'>
                                    <Autocomplete
                                        id="citizen"
                                        sx={{
                                            width: 300,
                                            backgroundColor: "#fff",
                                            borderRadius: '7px',
                                            marginLeft: "17px"
                                        }}
                                        onChange={handleCitizenChange}
                                        options={countries}
                                        autoHighlight
                                        getOptionLabel={(option) => option.label}
                                        renderOption={(props, option) => (
                                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                                <img
                                                    loading="lazy"
                                                    width="20"
                                                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                                    alt=""
                                                />
                                                {option.label} ({option.code}) +{option.phone}
                                            </Box>
                                        )}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                value={citizen}
                                                label="Please, select"
                                                inputProps={{
                                                    ...params.inputProps,
                                                    autoComplete: 'new-password', // disable autocomplete and autofill
                                                }}
                                            />
                                        )}
                                    />
                                </div>
                            </div>

                            <div className='flex'>
                                <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                    Country of residence:
                                </div>
                                <div className='w-[70%]'>
                                    <Autocomplete
                                        id="citizen"
                                        sx={{
                                            width: 300,
                                            backgroundColor: "#fff",
                                            borderRadius: '7px',
                                            marginLeft: "17px"
                                        }}
                                        onChange={handlePersonalCountryChange}
                                        options={countries}
                                        autoHighlight
                                        getOptionLabel={(option) => option.label}
                                        renderOption={(props, option) => (
                                            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                                <img
                                                    loading="lazy"
                                                    width="20"
                                                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                                    alt=""
                                                />
                                                {option.label} ({option.code}) +{option.phone}
                                            </Box>
                                        )}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                value={personalCountry}
                                                label="Please, select"
                                                inputProps={{
                                                    ...params.inputProps,
                                                    autoComplete: 'new-password', // disable autocomplete and autofill
                                                }}
                                            />
                                        )}
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
                                        value={airport}
                                        onChange={handleAirPortChange}
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
                                    <Select className='w-[300px] mt-[3px] rounded-[10px] ml-[17px]' onChange={handleGenderChange} placeholder="Select Gender" options={genderOptions} />
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
                                        value={phone}
                                        onChange={handlePhoneChange}
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
                                        value={email}
                                        onChange={handleEmailChange}
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
                                        value={link}
                                        onChange={handleLinkChange}
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
                                            value={birthday}
                                            onChange={handleBirthdayChange}
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
                        <button
                            onClick={submitSea}
                            className='w-[82px] h-[52px] text-[16px] font-[500] leading-[20px] rounded-[7px] text-[#fff] bg-[#116ACC]'>
                            ADD
                        </button>
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
                                        placeholder="Type your Vessel"
                                        type="text"
                                        value={seaVessel}
                                        onChange={handleSeaVesselChange}
                                    />
                                </div>
                            </div>

                            <div className='flex'>
                                <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                    Vessel Type:
                                </div>
                                <div className='w-[70%]'>
                                    <Select
                                        onChange={handleSeaVesselTypeChange}
                                        className='w-[300px] rounded-[10px] ml-[17px] mt-[3px]' placeholder="Please select" options={vesselOptions} />
                                </div>
                            </div>

                            <div className='flex'>
                                <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                    Rank:
                                </div>
                                <div className='w-[70%]'>
                                    <input
                                        style={{ padding: "8px 10px 8px 16px", border: "1px solid #9CA3AF" }}
                                        className='w-[300px] ml-[17px] h-[44px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                                        placeholder="Type your Rank"
                                        type="text"
                                        value={seaRank}
                                        onChange={handleSeaRankChange}
                                    />
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
                                        placeholder="Type your Amount of Contract"
                                        type="text"
                                        value={seaAmountContract}
                                        onChange={handleSeaAmountContractChange}
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
                                        placeholder="Type your Contract Duration"
                                        type="text"
                                        value={seaContract}
                                        onChange={handleSeaContractChange}
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
                                        placeholder="Type your Job Description"
                                        type="email"
                                        value={seaJob}
                                        onChange={handleSeaJobChange}
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
                            {
                                sea.map((item, i) => {
                                    return (
                                        <tr key={i}>
                                            <td className='text-start'>{item.vessel}</td>
                                            <td className='text-start'>{item.vessel_type}</td>
                                            <td className='text-start'>{item.rank}</td>
                                            <td className='text-start'>{item.contracts}</td>
                                            <td className='text-start'>{item.contract_duration}</td>
                                            <td className='text-start'>{item.description}</td>
                                            <td className='text-start flex gap-[10px]'>
                                                <button id="delete"
                                                    onClick={() => handleDeleteSea(item.id)}
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

            {/* Additional information   */}

            <div style={{ padding: "48px 58px" }} className='flex flex-col bg-[#F3F4F6] rounded-[56px] pt-[48px] pl-[58px] gap-[27px] mt-[80px]'>
                <div className='flex'>
                    <p className='text-[48px] leading-[56px] font-[600] text-[#116ACC]'>Additional information</p>
                </div>

                <div style={{ border: "1px dashed #7B61FF", padding: "41px 37px" }} className='flex flex-col gap-[53px] rounded-[5px] w-full box-border'>
                    <div className="flex w-full">
                        <div className='flex justify-end w-full'>
                            <button
                                onClick={submitInfo}
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
                                        Languages:
                                    </div>
                                    <div className='w-[70%]'>
                                        <Select
                                            onChange={handleLanuguageChange}
                                            className='w-[300px] rounded-[10px] ml-[17px] mt-[3px]' placeholder="Please select" options={langOptions} />
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
                                            value={computer}
                                            onChange={handleComputerChange}
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
                                            value={training}
                                            onChange={handleTrainingChange}
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
                            {
                                information.map((item, i) => {
                                    return (
                                        <tr key={i}>
                                            <td className='text-start'>{item.languages}</td>
                                            <td className='text-start'>{item.computer}</td>
                                            <td className='text-start'>{item.add_skills}</td>
                                            <td className='text-start flex gap-[10px]'>
                                                <button id="delete"
                                                    onClick={() => handleDeleteInfo(item.id)}
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
            </div >

            <div className='flex justify-end mr-[100px] mt-[96px] pt-[96x]'>
                <button className='mt-[96x] bg-[#116ACC] rounded-[7px] w-[117px] h-[52px] text-[16px] font-[500] text-[#fff]' type='button'>PREVIEW</button>
            </div>
        </div >
    )
}