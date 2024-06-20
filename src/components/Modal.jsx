
import React, { useState, useEffect, useRef } from 'react';

const MyModal = (props) => {
    const [active, setActive] = useState(false);

    useEffect(() => {
        setActive(props.active);

    } ,[props.active])

    const closeModal = () => {
        const parentModal = document.querySelector(`#${props.id}`);
        console.log(parentModal);
        parentModal.classList.remove('fixed');
        parentModal.classList.add('hidden');
        parentModal.querySelector('iframe').setAttribute('src', '')

    }

    return(
        <div id={props.id} className={`modal grid inset-0 w-screen h-screen place-items-center bg-black bg-opacity-50 z-[999] transition-all duration-300 ${active ? 'fixed' : 'hidden'}`} onClick={closeModal} >
            {props.children}
        </div>
    )
}

export const ModalContent = (props) => {
    
    const contentRef = useRef(null);


    const closeModal = () => {
 
        contentRef.current.parentNode.classList.remove('fixed');
        contentRef.current.parentNode.classList.add('hidden');
        if (props.onClose) props.onClose();
    
    }
    
    return (

        <div ref={contentRef} className='modal_content relative m-4 min-w-[80%] flex items-end flex-col-reverse rounded-lg  font-sans text-base font-light leading-relaxed text-blue-gray-500  antialiased shadow-2xl min-h-[70%] '>
            
            {props.children}
            {/* <p>modal content</p> */}
            <div className='mb-3  my-2' >
                <button onClick={closeModal} className='py-1 px-1 '>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10">
                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>

                </button>
                
            </div>

        </div>
    )
}

export default MyModal;


