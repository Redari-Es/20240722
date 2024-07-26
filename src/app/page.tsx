"use client"
import FileUpload from "@/components/FileUpload";
import Rotate from "@/components/Rotate";
import Image from "next/image";
import { useState } from "react";

export default function Home() {

  // 跟踪文件是否已上传显示工具
  const [isFileUploaded, setIsFileUploaded] = useState(false)
  const [file, setFile] = useState("")
  const handleFileUpload = (file: File) => {
    setIsFileUploaded(true)
  }

  return (
    <>
      {/* des */}
      <h1 className="text-6xl font-base text-center mx-auto font-serif">
        <p className="text-nowrap">Rotate PDF<span> Pages</span></p>
      </h1>
      <div className="font-serif block md:inline pt-10 line-clamp-2 font-base tracking-wider text-slate-600 text-center mx-auto text-pretty">
        <span>Simply click on a page to rotate it. You can then download your</span>
        <span className="block md:text-center"> modified PDF.</span>
      </div>
      {/* 上传文件后显示工具 */}
      {isFileUploaded ? <Rotate file={file} setFile={setFile} setIsFileUpload={setIsFileUploaded} /> : <FileUpload onFileUpload={handleFileUpload} setFile={setFile} />}

    </>
  );
}
