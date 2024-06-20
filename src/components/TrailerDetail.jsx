import React, { useRef } from 'react'

const TrailerDetail = () => {

    const vframe = useRef(null);
    return (
        <div className=' mx-20 flex flex-col mb-96'>
            <div className='ps-4 pb-10 text-2xl font-bold '>
                <h1>Trailer </h1>

            </div>
            <div className='w-full h-[65rem] '>
            <iframe className='w-full h-full'
                    title='Youtube player'
                    sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'

                    src={`https://www.youtube.com/embed/LEjhY15eCx0?autoplay=0`}>
            </iframe>
            </div>
        </div>


    )
}

export default TrailerDetail