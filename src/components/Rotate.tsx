"use client"
import { ZoomIn, ZoomOut } from 'lucide-react'
import Tooltips from './Tooltips'
import PdfViewer from './PdfViewer'
import { useEffect, useState } from 'react'
import { downloadPdf } from '@/actions'

type Props = {
    file: any,
    setFile: any,
    setIsFileUpload: any,
}

const Rotate = ({ file, setFile, setIsFileUpload }: Props) => {
    const [scale, setScale] = useState(0.5)
    const [numPages, setNumPages] = useState<number>();
    const [rotate, setRotate] = useState<number[]>([])
    // const [rotate, setRotate] = useState<number[]>(new Array(100).fill(0));

    useEffect(() => {
        // 初始化 rotate 数组，确保其长度与 numPages 相等
        setRotate(new Array(numPages).fill(0));
    }, [numPages])

    // Zoom 放大缩小
    const minZoom = 0.1
    const maxZoom = 0.9
    // 根据当前的 scale 值计算按钮的亮度
    const zoomInOpacity = scale === maxZoom ? 'opacity-50' : '';
    const zoomOutOpacity = scale === minZoom ? 'opacity-50' : '';

    function zoomIn() {
        // 放大操作，但不超过1
        setScale(Math.min(maxZoom, scale + 0.1))
    }

    function zoomOut() {
        // 缩小操作，但不低于0.1
        setScale(Math.max(minZoom, scale - 0.1))
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
                    <div className={`${zoomInOpacity}`}>
                        <Tooltips content='Zoom in'>
                            <button className='rounded-full bg-white shadow-sm border p-2 hover:scale-105'
                                onClick={zoomIn}
                            >
                                <ZoomIn className='size-5' />
                            </button>
                        </Tooltips>
                    </div>
                    <div className={`${zoomOutOpacity}`}>
                        <Tooltips content='Zoom out'>
                            <button className='rounded-full bg-white shadow-sm border p-2 hover:scale-105'
                                onClick={zoomOut}
                            >
                                <ZoomOut className='size-5' />
                            </button>
                        </Tooltips>
                    </div>
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
            </div >
        </>
    )
}

export default Rotate
