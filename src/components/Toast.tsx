"use client"
import React, { useState, useEffect } from 'react';

export const Toast = ({ message }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true); // 显示 toast
        const timer = setTimeout(() => {
            setShow(false); // 3秒后隐藏 toast
        }, 3000); // 3000毫秒 = 3秒

        return () => clearTimeout(timer); // 清除定时器，防止组件卸载后仍然执行
    }, [message]);

    return (
        <div className={`fixed top-0 right-0 mx-4 mt-4 p-4 bg-red-500 text-white transition duration-300 ease-in-out transform opacity-0 ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}>
            {message}
        </div>
    );
};

