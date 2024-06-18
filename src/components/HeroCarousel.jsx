import { useState } from "react";
import {ChevronLeft , ChevronRight} from "react-feather";

const Carousel = ({children : slides}) => {
    const [curr, setCurr] = useState(0);
    const prev = () => setCurr((curr) => (curr === 0 ? slides.length - 1 : curr -1));
    const next = () => setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
        
    return(
        <div className="overflow-hidden relative">
            <div className="flex transition-transform ease-out duration-700" style={{ transform : `translateX(-${curr * 100}% )` }}>{slides}</div>
            
            <div className="absolute inset-0 text-white flex items-center justify-between p-4">
                <button onClick={prev} className="p-2 rounded-full bg-slate-300 ">
                    <ChevronLeft size={40}/>
                </button>
                <button onClick={next}  className="p-2 rounded-full bg-slate-300 ">
                    <ChevronRight size={40}/>
                </button>
            </div>
        </div>
    )
}

export default Carousel;