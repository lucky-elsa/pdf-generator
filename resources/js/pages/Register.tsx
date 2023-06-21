import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { TextField } from "@mui/material";
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
// import ImageUpload from '../components/ImageUpload';
import { AutocompleteChangeReason, AutocompleteChangeDetails } from '@mui/lab';
import '../components/style.css'

import axios, { AxiosResponse } from 'axios';

interface CountryType {
    code: string;
    label: string;
    phone: string;
    suggested?: boolean;
}

interface ImgUploadProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    src: string
}

interface ProfileProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
    src: string,
    name?: string,
    status?: string,
}

interface EditProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    children?: React.ReactNode;
}

export default function Register() {
    const [name, setName] = useState<string | undefined>('');
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [surname, setSurname] = useState<string | undefined>('');
    const [citizen, setCitizen] = useState<string | undefined>('');
    const [country, setCountry] = useState<string | undefined>('');
    const [airport, setAirport] = useState<string | undefined>('');
    const [phone, setPhone] = useState<string | undefined>('');
    const [email, setEmail] = useState<string | undefined>('');
    const [password, setPassword] = useState<string | undefined>('');
    const [repassword, setRepassword] = useState<string | undefined>('');

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleSurNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSurname(event.target.value);
    };

    const handleCitizenChange = (event: React.SyntheticEvent<Element, Event>, value: CountryType | null, reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<any>) => {
        setCitizen(value?.label);
    };

    const handleCountryChange = (event: React.SyntheticEvent<Element, Event>, value: CountryType | null, reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<any>) => {
        setCountry(value?.label)
        console.log(value?.label)
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

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleRepasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRepassword(event.target.value);
    };

    function handleDateChange(date: Date | null) {
        setSelectedDate(date);
        console.log(selectedDate);
    }

    const [image, setImage] = useState<File | undefined>();
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('/image/profile.jpg');
    const [status, setStatus] = useState<string | undefined>('');
    const [active, setActive] = useState<'edit' | 'profile'>('edit');

    const ImageUpload: React.FC = () => {
        const photoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault();
            if (!e.target.files) return;
            const reader = new FileReader();
            const file = e.target.files[0];
            reader.onloadend = () => {
                setImage(file);
                setImagePreviewUrl(reader.result as string);
            }

            reader.readAsDataURL(file);
        };

        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            let activeP = (active === 'edit' ? 'profile' : 'edit') as "edit" | "profile";
            setActive(activeP);
            setStatus(undefined);
        }

        return (
            <div>
                {active === 'edit' ? (
                    <Edit onSubmit={handleSubmit}>
                        <ImgUpload onChange={photoUpload} src={imagePreviewUrl} />
                    </Edit>
                ) : (
                    <Profile
                        onSubmit={handleSubmit}
                        src={imagePreviewUrl}
                        name={name}
                        status={status}
                    />
                )}
            </div>
        )
    };



    const registerUser = () => {
        const userData = new FormData();
        name ? userData.append('name', name) : userData.append('name', '');
        selectedDate ? userData.append('selectedDate', selectedDate.toISOString()) : userData.append('selectedDate', '  ');
        surname ? userData.append('surname', surname) : userData.append('surname', '');
        citizen ? userData.append('citizen', citizen) : userData.append('citizen', '');
        country ? userData.append('country', country) : userData.append('country', '');
        airport ? userData.append('airport', airport) : userData.append('airport', '');
        phone ? userData.append('phone', phone) : userData.append('phone', '');
        email ? userData.append('email', email) : userData.append('email', '');
        password ? userData.append('password', password) : userData.append('password', '');
        image ? userData.append('image', image) : userData.append('image', '');

        if (password) {
            if (password.length < 6) {
                alert('Password must be at least 6 characters');
            } else if (password != repassword) {
                if (!repassword) {
                    return
                } else {
                    alert('Password does not match');
                }
            } else {
                console.log('success');
                
                axios.post('/api/user/register', userData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then((res: AxiosResponse) => {
                    window.location.href = '/login';
                })
            }
        }
    };

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

    const ImgUpload: React.FC<ImgUploadProps> = ({ onChange, src }) => (
        <label htmlFor="photo-upload" className="custom-file-upload fas">
            <div className="img-wrap img-upload" >
                <img className='avatar' src={src} alt="preview" />
            </div>
            <input
                id="photo-upload"
                type="file"
                onChange={onChange}
            />
        </label>
    );

    const Profile: React.FC<ProfileProps> = ({ onSubmit, src, name, status }) => {
        const [inputName, setInputName] = useState<string | undefined>(name);
        const [inputStatus, setInputStatus] = useState<string | undefined>(status);

        const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setInputName(e.target.value);
        }

        const handleStatusChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setInputStatus(e.target.value);
        }

        return (

            <form onSubmit={onSubmit}>
                <h1>Profile Card</h1>
                <label className="custom-file-upload fas">
                    <div className="img-wrap" >
                        <img src={src} alt="preview" />
                    </div>
                </label>
                <div className="name">
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={inputName}
                        onChange={handleNameChange}
                    />
                </div>
                <div className="status">
                    <textarea
                        placeholder="Your Status"
                        rows={4}
                        value={inputStatus}
                        onChange={handleStatusChange}
                    />
                </div>
                <button type="submit" className="edit_1">Edit Profile </button>
            </form>

        );
    }

    const Edit: React.FC<EditProps> = ({ onSubmit, children }) => (
        <form onSubmit={onSubmit}>
            {children}
        </form>
    );


    return (
        <div className='pt-[75px] mb-[90px]'>
            <div className='flex justify-between w-[163px] ml-[23px]'>
                <Link className='text-[16px] font-[600] text-[#9CA3AF]' to="/">Home</Link>
                <img src='/image/right.png' className='pt-[4px] w-3' />
                <Link className='text-[16px] font-[600] text-[#116ACC]' to="/about_project">Add Crewing</Link>
            </div>

            <div style={{ padding: "50px 58px 80px 58px" }} className='flex flex-col bg-[#F3F4F6] rounded-[56px] pt-[67px] pl-[58px] gap-[47px] mt-[80px]'>
                <div className='flex'>
                    <p className='text-[48px] leading-[56px] font-[600] w-[40%] text-[#116ACC] mt-[120px]'>Register</p>
                    <div className='w-[60%] flex justify-end mr-[30px]'>
                        <ImageUpload />
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
                                    onChange={handleNameChange}
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
                                    id="country"
                                    onChange={handleCountryChange}
                                    sx={{
                                        width: 300,
                                        backgroundColor: "#fff",
                                        borderRadius: '7px',
                                        marginLeft: "17px"
                                    }}
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
                                            value={country}
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

                        <div className='flex'>
                            <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                Password:
                            </div>
                            <div className='w-[70%]'>
                                <input
                                    style={{ padding: "8px 10px 8px 16px", border: "1px solid #9CA3AF" }}
                                    className='w-[300px] ml-[17px] h-[44px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                                    placeholder="Type your Password"
                                    type="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                            </div>
                        </div>

                        <div className='flex'>
                            <div className='w-[30%] label-style pt-[10px] flex justify-end'>
                                Confirm Password:
                            </div>
                            <div className='w-[70%]'>
                                <input
                                    style={{ padding: "8px 10px 8px 16px", border: "1px solid #9CA3AF" }}
                                    className='w-[300px] ml-[17px] h-[44px] rounded-[7px] input_style focus:outline-[#3088c2] hover:outline-black transition duration-500 ease-in-out'
                                    placeholder="Confirm your password"
                                    type="password"
                                    value={repassword}
                                    onChange={handleRepasswordChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex justify-center mt-[40px] mr-[80px]'>
                <button
                    type="button"
                    className='bg-[#116ACC] rounded-[7px] pt-[16px] pb-[16px] pl-[24px] pr-[24px] text-[#fff] text-center hover:bg-[#116bccc5] active:bg-[#116bcca6]'
                    onClick={registerUser}
                >
                    Register
                </button>
            </div>
        </div>
    )
}
