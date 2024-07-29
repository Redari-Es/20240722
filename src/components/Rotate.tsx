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
    const [rotate, setRotate] = useState<number[]>([])
    // const [rotate, setRotate] = useState<number[]>(new Array(100).fill(0));
    const [degree, setDegree] = useState(0)

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

    function rotateDegree(pageNumber: number) {
        const degree = rotate[pageNumber - 1];
        setDegree(degree)
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
                <PdfViewer file={file} scale={scale} rotate={rotate} rotatePage={rotatePage} numPages={numPages} setNumPages={setNumPages} degree={degree} />
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

async function downloadPdf(file, rotate) {
    // 加载 PDF 文档
    const loadingTask = pdfjsLib.getDocument({ url: file });
    const pdfDoc = await loadingTask.promise;
    const numPages = pdfDoc.numPages;

    const a4Width = 595; // A4 宽度，单位为像素
    const a4Height = 842; // A4 高度，单位为像素
    const pdf = new jsPDF({
        orientation: 'p', // 'p' 表示纵向，'l' 表示横向
        unit: 'px',
        format: [a4Width, a4Height]
    });

    for (let i = 1; i <= numPages; i++) {
        // 获取PDF页面
        const page = await pdfDoc.getPage(i);
        // 获取页面的尺寸
        const viewport = page.getViewport({ scale: 1.0 });
        const rotatePage = rotate[i - 1] || 0; // 获取旋转角度
        const scale = Math.min((a4Width / viewport.width), (a4Height / viewport.height));
        const scaledViewport = page.getViewport({ scale: scale });

        // 创建一个画布以绘制页面
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // 根据旋转角度调整 canvas 尺寸
        let newWidth, newHeight;
        if (rotatePage === 90 || rotatePage === 270) {
            newWidth = a4Height;
            newHeight = a4Width;
        } else {
            newWidth = a4Width;
            newHeight = a4Height;
        }

        /*
        // 根据A4尺寸设置canvas大小
        canvas.height = Math.round(scaledViewport.height);
        canvas.width = Math.round(scaledViewport.width);

        // 渲染页面到canvas
        await page.render({
            canvasContext: ctx,
            viewport: scaledViewport
        }).promise;

        // 将canvas转换为图片
        const imgData = canvas.toDataURL('image/png');

        // 添加到jsPDF文档
        pdf.addImage(imgData, 'PNG', 0, 0, scaledViewport.width, scaledViewport.height);

        // 添加新页面
        if (i < numPages) {
            pdf.addPage();
        }
        */
        canvas.width = newWidth;
        canvas.height = newHeight;

        // 保存当前的绘图状态
        ctx.save();
        // 移动画布到中心
        ctx.translate(newWidth / 2, newHeight / 2);
        // 旋转画布
        ctx.rotate(rotatePage * Math.PI / 180);
        // 移动回绘制的页面位置
        ctx.translate(-viewport.width / 2, -viewport.height / 2);

        // 渲染页面到 canvas
        await page.render({
            canvasContext: ctx,
            viewport: page.getViewport({ scale: newWidth / viewport.width })
        }).promise;

        await page.render({
            canvasContext: ctx,
            viewport: scaledViewport
        }).promise;
        // 恢复之前的绘图状态
        ctx.restore();

        // 将 canvas 转换为图片
        const imgData = canvas.toDataURL('image/png');

        // 添加到 jsPDF 文档
        pdf.addImage(imgData, 'PNG', 0, 0, scaledViewport.width, scaledViewport.height);

        // 添加新页面
        if (i < numPages) {
            pdf.addPage();
        }
        // 清理
        canvas.remove();
    }

    pdf.save('rotated_document.pdf');
}

export default Rotate
