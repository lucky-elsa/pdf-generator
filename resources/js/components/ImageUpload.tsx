import React, { useState, ReactNode } from 'react';
import './style.css';

interface ImgUploadProps {
    file?: File,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    src: string
}

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

interface ProfileProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
    src: string,
    name?: string,
    status?: string,
}

interface EditProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    children?: ReactNode;
}

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

const ImageUpload: React.FC = () => {
    const [file, setFile] = useState<File | undefined>();
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('/image/profile.jpg');
    const [name, setName] = useState<string | undefined>('');
    const [status, setStatus] = useState<string | undefined>('');
    const [active, setActive] = useState<'edit' | 'profile'>('edit');

    const photoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (!e.target.files) return;
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
            setFile(file);
            setImagePreviewUrl(reader.result as string);
        }

        reader.readAsDataURL(file);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let activeP = (active === 'edit' ? 'profile' : 'edit') as "edit" | "profile";
        setActive(activeP);
        setName(undefined);
        setStatus(undefined);
    }

    return (
        <div>
            {active === 'edit' ? (
                <Edit onSubmit={handleSubmit}>
                    <ImgUpload file={file || undefined} onChange={photoUpload} src={imagePreviewUrl} />
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

export default ImageUpload;