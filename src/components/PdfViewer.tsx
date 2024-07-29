"use client"
import { Divide, RefreshCw } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs, } from 'react-pdf'; // 导入 Document 和 Page 组件
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString()



const PdfViewer = ({ file, scale, rotate, rotatePage, numPages, setNumPages, degree }) => {

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
        <div className='py-10'>

            <Document
                file={file}
                onLoadSuccess={onDocumentLoadSuccess}
                className="flex flex-wrap justify-center"
                renderMode="canvas"
                externalLinkRel="_blank"
            >
                <div className="flex flex-wrap justify-center space-x-4">
                    {Array.from({ length: numPages }, (_, index) => {
                        const degree = rotate[index] || 0; // 获取旋转角度

                        return (
                            <div
                                key={`page_${index + 1}`}
                                className="grid grid-col-6 gap-4 items-center relative bg-white p-3 mx-auto min-h-full cursor-pointer overflow-hidden"
                                onClick={() => rotatePage(index + 1)}
                            >
                                <div className="absolute cursor-pointer z-30 top-1 right-1 p-1 border rounded-full bg-orange-500 hover:scale-105 justify-end mx-auto">
                                    <RefreshCw className="stroke-white stroke-2 size-3" />
                                </div>
                                <div
                                    style={{
                                        transform: `rotate(${degree}deg)`, // 应用旋转
                                        width: 'auto', // 容器宽度自适应
                                        height: 'auto', // 容器高度自适应
                                    }}
                                    className='duration-150 transition-transform z-20'
                                >
                                    <Page
                                        pageNumber={index + 1}
                                        scale={scale} // 调整缩放比例以适应容器
                                        rotate={0} // 通过CSS旋转，这里设置为0
                                        className="w-full h-full overflow-hidden"
                                        renderTextLayer={false}
                                        renderAnnotationLayer={false}
                                    />
                                </div>
                                <p className="italic font-serif text-xs text-center text-ellipsis whitespace-nowrap">
                                    {index + 1}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </Document>
        </div>
    );
};


export default PdfViewer;