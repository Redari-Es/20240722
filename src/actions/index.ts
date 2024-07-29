"use client"
import * as pdfjsLib from 'pdfjs-dist';
import { jsPDF } from 'jspdf';


export async function downloadPdf(file, rotate) {
    // 加载 PDF 文档
    const pdfDoc = await pdfjsLib.getDocument({ url: file }).promise;
    const numPages = pdfDoc.numPages;
    const pdf = new jsPDF();

    // A4纸张的标准尺寸（毫米）
    const A4_WIDTH = 210;
    const A4_HEIGHT = 297;

    for (let i = 1; i <= numPages; i++) {
        // 获取PDF页面
        const page = await pdfDoc.getPage(i);
        const originalViewport = page.getViewport({ scale: 1.0 });
        const rotatePage = (rotate[i - 1] || 0)%360 // 获取旋转角度

        // 创建一个画布以绘制页面
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // 根据旋转角度调整 canvas 尺寸
        let newWidth, newHeight;
        if (rotatePage === 90 || rotatePage === 270) {
            newWidth = originalViewport.height;
            newHeight = originalViewport.width;
        } else {
            newWidth = originalViewport.width;
            newHeight = originalViewport.height;
        }

        canvas.width = newWidth;
        canvas.height = newHeight;

        // 保存当前的绘图状态
        ctx.save();
        // 移动画布到中心
        ctx.translate(newWidth / 2, newHeight / 2);
        // 移动回绘制的页面位置
        ctx.translate(-newWidth / 2, -newHeight / 2);

        // 重新计算viewport参数
        const adjustedViewport = page.getViewport({
            scale: 1,
            rotation: rotatePage
        });

        // 渲染页面到 canvas
        await page.render({
            canvasContext: ctx,
            viewport: adjustedViewport
        }).promise;

        // 恢复之前的绘图状态
        ctx.restore();

        // 将 canvas 转换为图片
        const imgData = canvas.toDataURL('image/png');

        // 根据页面内容的长宽选择A4纸张的方向
        let orientation;
        let imgWidth, imgHeight;
        if (newWidth > newHeight) { // 页面内容较宽
            orientation = 'l'; // 横向
            imgWidth = A4_HEIGHT; // A4横向的高度
            imgHeight = A4_WIDTH; // A4横向的宽度
        } else { // 页面内容较高或相等
            orientation = 'p'; // 纵向
            imgWidth = A4_WIDTH; // A4纵向的宽度
            imgHeight = A4_HEIGHT; // A4纵向的高度
        }

        // 计算图像的缩放比例
        const scaleX = imgWidth / newWidth;
        const scaleY = imgHeight / newHeight;
        const scale = Math.min(scaleX, scaleY);

        // 计算图像调整后的尺寸
        const adjustedWidth = newWidth * scale;
        const adjustedHeight = newHeight * scale;

        // 如果不是第一页，添加新页面
        if(i > 0) {
            pdf.addPage([imgWidth, imgHeight], orientation);
            console.log(i, imgWidth,imgHeight,orientation)
        }

        // 在页面上居中绘制图像
        const x = (imgWidth - adjustedWidth) / 2;
        const y = (imgHeight - adjustedHeight) / 2;

        // 添加图片到页面
        pdf.addImage(imgData, 'PNG', x, y, adjustedWidth, adjustedHeight);

        // 清理
        canvas.remove();
    }
    // 清除第一空白页
        pdf.deletePage(1)

    // 保存并下载 PDF
    pdf.save('rotated_document.pdf');
}