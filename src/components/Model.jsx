import React from 'react'
import { createPortal } from 'react-dom'
import { AiOutlineClose } from 'react-icons/ai'

const Model = ({ onCLose, isOpen, children }) => {
    return createPortal(
        <>
            {
                isOpen &&
                <>
                    <div className="grid place-items-center backdrop-blur-sm absolute top-0 z-40 h-screen w-screen">
                        <div className='relative z-50 m-auto min-h-[200px] min-w-[340px] bg-white p-4'>
                            <div className="flex justify-end">
                                <AiOutlineClose onClick={onCLose} />
                            </div>
                            {children}
                        </div>
                    </div>
                </>
            }
        </>,
        document.getElementById("modal-root")
    );
}

export default Model
