"use client"

import { useState } from "react"


type Props = {
    onFileUpload: any
    setFile: any,
    setFileName: any,
}
export default function FileUpload({ onFileUpload, setFile, setFileName }: Props) {

    const handleFileUpload = async (e: any) => {
        const file = e.target.files?.[0];
        if (file && file.type === 'application/pdf') {
            // 处理文件上传逻辑
            console.log('File uploaded:', file);
            let fileName = file.name
            let parts = fileName.split(".")
            fileName = parts[0]
            setFileName(fileName)
            console.log(fileName)
            const reader = new FileReader();
            reader.onloadend = () => {
                const pdf = (reader.result as string);
                setFile(pdf)
            };
            reader.readAsDataURL(file);
            // setPdfFile(file)
        } else {
            alert('Please select a PDF file.');
        }
        onFileUpload(file)
    };

    return (
        <>
            <div className="relative mx-auto flex items-center justify-center w-48 h-64 border-2 border-dashed border-gray-300 rounded bg-white m-10">
                <label htmlFor="pdfUpload" className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer">
                    <input
                        type="file"
                        accept=".pdf"
                        id="pdfUpload"
                        className="absolute inset-0 w-full h-full opacity-0"
                        onChange={handleFileUpload}
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-8 cursor-pointer"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                        />
                    </svg>
                    <p className="text-center mt-2 text-sm horver:cursor-pointer  tracking-tighter">Click to upload or drag and drop</p>
                </label>
            </div>
        </>
    );
};