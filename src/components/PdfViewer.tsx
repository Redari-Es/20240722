"use client"
import { Divide, RefreshCw } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs, } from 'react-pdf'; // 导入 Document 和 Page 组件
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString()



const PdfViewer = ({ file, scale, rotate, rotatePage, numPages, setNumPages, degree }) => {
    const [showPages, setShowPages] = useState(false)
    // 监听文件变化，重新加载 PDF
    useEffect(() => {
        setShowPages(false)
        setNumPages(0); // 重置页数
        // 这里可以添加代码来重新加载 PDF，例如创建新的 Document 实例
    }, [file]);

    // 问题：当所有页面加载成功后再显示内容出来
    function onPageRenderSuccess(pageIndex) {
        // 确保pageIndex是从1开始的
        const pagesRendered = [...Array(numPages)].map((_, index) => index === pageIndex ? true : false);
        if (pagesRendered.every(page => page === true)) {
            setShowPages(true); // 所有页面都渲染完成
        }
    }

    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
        setShowPages(true)
    }

    function loading() {
        return (
            <div className="inline-block w-5 h-5 border-4 border-t-gray-500 border-solid rounded-full animate-spin"></div>
        )

    }
    return (
        <div className='p-10 flex flex-wrap justify-center'>
            <Document
                file={file}
                loading={loading}
                onLoadSuccess={onDocumentLoadSuccess}
                renderMode="canvas"
                externalLinkRel="_blank"
            >
                {showPages &&
                    <div className="flex flex-wrap justify-center gap-4">
                        {Array.from({ length: numPages }, (_, index) => {
                            const degree = rotate[index] || 0; // 获取旋转角度 问题当270转0时
                            return (
                                <div
                                    key={`page_${index + 1}`}
                                    className="grid grid-col-6 gap-4 items-center relative bg-white p-3 mx-auto min-h-full cursor-pointer overflow-hidden"
                                    onClick={() => rotatePage(index + 1)}
                                >
                                    <div className="absolute cursor-pointer z-30 top-1 right-1 p-1 border rounded-full bg-orange-500 hover:scale-105 justify-end md:mx-auto my-auto ">
                                        <RefreshCw className="stroke-white stroke-2 size-4" />
                                    </div>
                                    <div
                                        style={{
                                            transform: `rotate(${degree}deg)`, // 应用旋转
                                            width: 'auto', // 容器宽度自适应
                                            height: 'auto', // 容器高度自适应
                                        }}
                                        className='duration-150 transition-transform z-20 transform-cpu'
                                    >
                                        <Page
                                            pageNumber={index + 1}
                                            scale={scale} // 调整缩放比例以适应容器
                                            rotate={0} // 通过CSS旋转，这里设置为0
                                            className="w-full h-full overflow-hidden"
                                            onRenderSuccess={() => onPageRenderSuccess(index + 1)}
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
                }
            </Document >
        </div >
    );

};


export default PdfViewer;