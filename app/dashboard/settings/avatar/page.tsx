'use client'

import SubmitButton from "@/components/submit-button";
import FileInput from "../components/file-input";
import { ChangeEvent, useActionState, useState } from "react";
import { FormState } from "@/lib/consts";
import { uploadAvatar } from "@/lib/actions";
import Alert from "@/components/Alert";
import { Ban, Check } from "lucide-react";

const initialState: FormState = {
    message: "",
    error: false
}

export default function Page() {
    const [error, setError] = useState(true)
    const [errorMessage, setErrorMessage] = useState('');
    const [state, formAction, pending] = useActionState(uploadAvatar, initialState);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        setError(false);
        const file = event.target.files?.[0] || null;
        console.log(file);
        if (!file) {
            return;
        }
        
        if (file.size > 512 * 1024) {
            setError(true);
            setErrorMessage('File size must be less than 512 KB')
            event.target.value = '';
            return;
        }

        if (!['image/jpeg', 'image/png'].includes(file.type)){
            setError(true);
            setErrorMessage("Only JPEG or PNG file is allowed");
            event.target.value = '';
            return;
        }

        setError(false);
        console.log('File selected properly');
        return;
    }
    

    return (
        <>
            <h1 className="text-3xl font-semibold mb-8">
                Avatar
            </h1>

            <form className="space-y-4" action={formAction} >
                {state?.error &&
                    <Alert 
                        icon={<Ban className="text-red-700 dark:text-red-300 w-6 h-6" />} 
                        title={<span className="text-red-700 dark:text-red-300">Hello</span>}
                    >
                        <span className="text-red-700 dark:text-red-300">Hello</span>
                    </Alert>
                }
                {!state?.error && state?.message.length > 0 && 
                    <Alert 
                        icon={<Check className="text-green-700 dark:text-green-300 w-6 h-6" />}
                        title={<span className="text-green-700 dark:text-green-300">Hello</span>}
                    >
                        <span className="text-green-700 dark:text-green-300">Hello</span>
                    </Alert>
                }
                
                <FileInput 
                    type="file" 
                    name="file" 
                    id="file" 
                    onChange={handleFileChange}
                    className="appearance-auto"
                    accept="image/png, image/jpeg"
                />
                <SubmitButton disabled={pending || error}>Upload Avatar</SubmitButton>
                {error && <p className="text-gray-400">{errorMessage}</p>}
            </form>
            
        </>
    )
}