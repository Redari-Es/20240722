"use client"
import { Divide, RefreshCw } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs, } from 'react-pdf'; // 导入 Document 和 Page 组件
import { Toast } from './Toast';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString()



const PdfViewer = ({ file, scale, rotate, rotatePage, numPages, setNumPages }) => {

    const [showPages, setShowPages] = useState([]);
    const [pagesRendered, setPagesRendered] = useState<Boolean[]>([]);
    const [allPagesLoaded, setAllPagesLoaded] = useState(false);


    // 监听文件变化，重新加载 PDF
    useEffect(() => {
        setShowPages([]);
        setPagesRendered(new Array(0).fill(false)); // 初始化页面渲染状态数组
        setNumPages(0); // 重置页数
        // setAllPagesLoaded(false); // 重置所有页面加载状态
    }, [file]);
    // 监视所有页面是否加载完毕
    useEffect(() => {
        console.log("All Page", pagesRendered)
        console.log(allPagesLoaded)
    }, [pagesRendered, allPagesLoaded]);

    // 当单个页面渲染成功时更新状态
    function onPageRenderSuccess(pageIndex) {
        setPagesRendered(prevPagesRendered => {
            const newPagesRendered = [...prevPagesRendered];
            newPagesRendered[pageIndex - 1] = true; // 设置当前页面的状态为true

            // 检查所有页面是否都已渲染成功
            if (newPagesRendered.every(loaded => loaded)) {
                setAllPagesLoaded(true); // 只有当所有页面都渲染成功后才设置allPagesLoaded为true
            }
            return newPagesRendered;
        });
    }


    // 当文档加载成功时设置页数
    function onDocumentLoadSuccess({ numPages }) {
        const initialPagesRendered = new Array(numPages).fill(false);
        setPagesRendered(initialPagesRendered);
        setNumPages(numPages);
    }
    function loading() {
        return (
            <div className='flex flexCenter'>
                <div className="z-20 inline-block w-5 h-5 border-4 border-t-gray-500 border-solid rounded-full  ease-in-out animate-spin slow justify-center items-center"
                ></div>
            </div>
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
                {!allPagesLoaded && loading()}
                {showPages &&
                    <div className={`flex flex-wrap justify-center gap-4 ${!allPagesLoaded ? 'hidden' : 'visible'}`}>
                        {Array.from({ length: numPages }, (_, index) => {
                            const degree = rotate[index] || 0; // 获取旋转角度 问题当270转0时
                            return (
                                <div
                                    key={`page_${index + 1}`}
                                    className="grid grid-col-6 gap-4 items-center relative bg-white px-3 pt-3 mx-auto min-h-full cursor-pointer overflow-hidden"
                                    onClick={() => rotatePage(index + 1)}
                                >
                                    <div className="absolute cursor-pointer z-30 top-1 right-1 p-1 border rounded-full bg-orange-500 hover:scale-105 justify-end md:mx-auto my-auto ">
                                        <RefreshCw className="stroke-white stroke-2 size-4" />
                                    </div>
                                    <div>

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
                                        <p className="pb-2 italic font-serif text-base text-center text-ellipsis whitespace-nowrap">
                                            {index + 1}
                                        </p>
                                    </div>
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