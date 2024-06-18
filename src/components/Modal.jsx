
import React, { useState, useEffect, useRef } from 'react';



const MyModal = (props) => {
    const [active, setActive] = useState(false);

    useEffect(() => {
        setActive(props.active);

    } ,[props.active])

    const closeModal = () => {
        const parentModal = document.querySelector('.modal');
        // setActive(false)
        // MyModal.querySelector('iframe').setAttribut('src', '')
        // console.log(active);
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
        // if (props.onClose) props.onClose();
    
    }
    
    return (

        <div className='relative m-4 min-w-[80%] flex items-end flex-col-reverse rounded-lg  font-sans text-base font-light leading-relaxed text-blue-gray-500 bg-black antialiased shadow-2xl min-h-[70%] '>
            {props.children}
            {/* <p>modal content</p> */}
            <div className='bg-red-500 py-2 px-4 rounded-xl me-5 mt-2'>
                <button onClick={closeModal}>close</button>
                
            </div>

        </div>
    )
}

export default MyModal;


