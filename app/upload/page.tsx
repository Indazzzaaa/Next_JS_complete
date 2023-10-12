'use client'
import { CldUploadWidget, CldImage } from 'next-cloudinary'
import { useState } from 'react';

interface CloudinaryResult {
    public_id: string
}

const UploadPage = () => {
    const [publicID, setPublicID] = useState("");
    return (
        <>
            {publicID &&
                <CldImage src={publicID} width={270} height={180} alt="A test image" />
            }
            <CldUploadWidget uploadPreset='dlcn1dhm'
                onUpload={(result, widget) => {
                    if (result.event !== 'success') return;

                    const info = result.info as CloudinaryResult;
                    setPublicID(info.public_id)

                }}
            >

                {({ open }) => <button
                    className='btn btn-primary' onClick={() => open()}>Upload</button>}

            </CldUploadWidget>
        </>
    )
}

export default UploadPage