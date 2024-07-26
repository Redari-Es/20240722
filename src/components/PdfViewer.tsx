"use client"
import { RefreshCw } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs, } from 'react-pdf'; // 导入 Document 和 Page 组件
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString()



const PdfViewer = ({ file, scale, rotate, rotatePage, numPages, setNumPages }) => {

    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
    }
    // 监听文件变化，重新加载 PDF
    useEffect(() => {
        if (file) {
            setNumPages(0); // 重置页数
            // 这里可以添加代码来重新加载 PDF，例如创建新的 Document 实例
        }
    }, [file]);

    return (

        <Document file={file} onLoadSuccess={onDocumentLoadSuccess}
            className="py-10"
            renderMode='canvas'
            externalLinkRel='_blank'
        >
            <div className='flex flex-wrap space-x-4'>
                {Array.from({ length: numPages }, (_, index) => (
                    <div className='grid grid-col-6 gap-4 space-y-4 items-center relative bg-white p-2 mx-auto min-h-full cursor-pointer'
                        onClick={() => rotatePage(index + 1)}
                    >
                        <div key={`page_${index + 1}`} className="grid grid-flow-row">
                            {/* 旋转按钮 */}
                            <div className='absolute cursor-pointer z-30 top-1 right-1 p-1 border rounded-full bg-orange-500 hover:scale-105 justify-end mx-auto'
                            >
                                <RefreshCw className='stroke-white stroke-2 size-3' />
                            </div>
                            <Page
                                pageNumber={index + 1}
                                scale={scale} // 调整缩放比例以适应容器
                                rotate={rotate[index]}
                                className="z-20 pt-1 transition-transform overflow-hidden duration-300 rotate-0 w-full h-full"
                                renderTextLayer={false}
                                renderAnnotationLayer={false}
                            />
                            <p className='italic font-serif text-xs text-center'>
                                {index + 1}
                            </p>
                        </div >
                    </div>
                ))}
            </div>
        </Document >
    );
};


export default PdfViewer;