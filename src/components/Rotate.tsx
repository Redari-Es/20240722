"use client"
import { ZoomIn, ZoomOut } from 'lucide-react'
import Tooltips from './Tooltips'
import PdfViewer from './PdfViewer'
import * as pdfjsLib from 'pdfjs-dist';
import { jsPDF } from 'jspdf';
import { useEffect, useState } from 'react'

type Props = {
    file: any,
    setFile: any,
    setIsFileUpload: any,
}

const Rotate = ({ file, setFile, setIsFileUpload }: Props) => {
    const [scale, setScale] = useState(0.5)
    const [numPages, setNumPages] = useState<number>();
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [rotate, setRotate] = useState<number[]>(new Array(100).fill(0));

    // 监听文件变化，重新加载 PDF
    useEffect(() => {
        if (file) {
            setNumPages(0); // 重置页数
            // 这里可以添加代码来重新加载 PDF，例如创建新的 Document 实例
        }
    }, [file]);

    function zoomIn() {
        // 放大操作，但不超过1
        setScale(Math.min(1, scale + 0.1))
        console.log("zoomIn:", scale)
    }

    function zoomOut() {
        // 缩小操作，但不低于0.1
        setScale(Math.max(0.1, scale - 0.1))
        console.log("zoomOut:", scale)
    }

    const handleRemove = () => {
        setFile("")
        setIsFileUpload(false)
    }

    useEffect(() => {
        // 每当 rotate 更新后，这个回调函数会被执行
        console.log('Rotate state has been updated:', rotate);
        // 这里可以执行需要响应 rotate 更新的操作
    }, [rotate]); // 依赖数组中包含 rotate



    function rotatePage(pageNumber: number) {
        setRotate(prevRotate => {
            const newRotate = [...prevRotate];
            newRotate[pageNumber - 1] = (newRotate[pageNumber - 1] + 90) % 360;
            return newRotate;
        });
    }


    function rotateAllPages() {
        // 定义旋转的角度增量
        const rotationIncrement = 90;
        // 计算所有页面新的旋转状态
        setRotate(prevRotate => {
            // 使用 map 生成新的旋转数组，每个页面都相对于当前状态旋转90度
            const newRotate = prevRotate.map((currentRotation) => {
                return (currentRotation + rotationIncrement) % 360;
            });
            return newRotate;
        });
    }

    async function downloadPdf(file, rotate) {
        // 加载 PDF 文档
        const loadingTask = pdfjsLib.getDocument({ url: file });
        const pdfDoc = await loadingTask.promise;
        const numPages = pdfDoc.numPages;
        const pdf = new jsPDF();

        for (let i = 1; i <= numPages; i++) {
            // 获取PDF页面
            const page = await pdfDoc.getPage(i);
            // 获取页面的尺寸，并设置A4尺寸的视口
            const viewport = page.getViewport({ scale: 1.0 });
            const scale = Math.min((595 / viewport.width), (842 / viewport.height));
            const scaledViewport = page.getViewport({ scale: scale });

            // 创建一个画布以绘制页面
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // 根据A4尺寸设置canvas大小
            canvas.height = Math.round(scaledViewport.height);
            canvas.width = Math.round(scaledViewport.width);

            // 渲染页面到canvas
            const renderTask = page.render({
                canvasContext: ctx,
                viewport: scaledViewport
            });
            await renderTask.promise;

            // 将canvas转换为图片
            const imgData = canvas.toDataURL('image/png');
            // 添加到jsPDF文档
            pdf.addImage(imgData, 'PNG', 0, 0, scaledViewport.width, scaledViewport.height);

            // 由于canvas使用了像素尺寸，可能需要调整页面添加的位置以适应A4纸大小
            if (i % 2 === 1) {
                // 第1页和第3页...开始新的页面
                pdf.addPage([595, 842]);
            } else {
                // 第2页和第4页...在当前页面的下半部分
                pdf.setPage(i / 2);
            }
        }

        // 保存并下载PDF
        pdf.save('rotated_document.pdf');
    }


    return (
        <>
            <div className='flexCenter py-10 flex-col gap-4' >
                {/* Tools */}
                <div className='flexCenter mx-auto space-x-4 font-serif'>
                    <Tooltips content='Rotate all PDF'>
                        <button className='p-2 rounded border bg-orange-500'
                            onClick={rotateAllPages}
                        >
                            <span className='text-white text-nowrap'>Rotate all</span>
                        </button>
                    </Tooltips>
                    <Tooltips content='Remove this PDF and select a new one'>
                        <button className='p-2 rounded border bg-gray-900'
                            onClick={handleRemove}
                        >
                            <span className='text-white text-nowrap'>Remove PDF</span>
                        </button>
                    </Tooltips>
                    <Tooltips content='Zoom in'>
                        <button className='rounded-full bg-white shadow-sm border p-2 hover:scale-105'
                            onClick={zoomIn}
                        >
                            <ZoomIn className='size-5' />
                        </button>
                    </Tooltips>
                    <Tooltips content='Zoom out'>
                        <button className='rounded-full bg-white shadow-sm border p-2 hover:scale-105'
                            onClick={zoomOut}
                        >
                            <ZoomOut className='size-5' />
                        </button>
                    </Tooltips>
                </div>
                {/* Show PDF */}
                <PdfViewer file={file} scale={scale} rotate={rotate} rotatePage={rotatePage} numPages={numPages} setNumPages={setNumPages} />
                {/* Download */}
                <div>
                    <Tooltips content='split and download PDF'>
                        <button className='p-2 mb-10 rounded border bg-orange-500'
                            onClick={() => downloadPdf(file, rotate)}
                        >
                            <span className='text-white'>Download</span>
                        </button>
                    </Tooltips>
                </div>
            </div>
        </>
    )
}

export default Rotate
