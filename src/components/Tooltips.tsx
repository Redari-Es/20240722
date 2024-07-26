import React, { Children, ReactNode } from 'react'

type Props = {
    children: ReactNode,
    content: string,

}

const Tooltips = ({ children, content }: Props) => {
    return (
        <div className="relative inline-block group">
            <div>{children}</div>
            <div
                className="absolute z-10 invisible group-hover:visible bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-1 py-1 bg-gray-900 text-white text-xs font-base rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 tracking-tighter whitespace-nowrap"
                aria-hidden="true"
            >
                {content}
                <div className="absolute left-1/2 top-full transform -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-gray-900"></div>
            </div>
        </div>
    );
};

export default Tooltips