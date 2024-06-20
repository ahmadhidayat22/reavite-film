

const HeroDetail = (props) => {
    const picture = 'https://image.tmdb.org/t/p/original/lLh39Th5plbrQgbQ4zyIULsd0Pp.jpg'
    const smallPic = 'https://image.tmdb.org/t/p/w500/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg'
    const credit= 'https://image.tmdb.org/t/p/w500/coC58ANiDbqRIyle5zEl9QDektf.jpg'
    return(
        <div className="relative h-full w-full ">

            <img
                src={picture}
                alt="image 1"
                className="h-full w-full object-cover"
            />

            <div className="absolute bottom-0 left-0  w-full bg-gradient-to-t  from-black from-50% inset-0 flex justify-center items-center ">
                
                <div className="flex justify-center  gap-16" >

                    <div className=" rounded-md overflow-hidden">
                        <img src={smallPic} alt="" className="max-w-80 h-full "/>
                    </div>
                    
                    <div className=" w-2/6  flex flex-col gap-3 ">
                        <h1 className="font-extrabold text-5xl ">Godzilla x Kong: The New Empire</h1>
                        <div>
                            <span className="border py-1 px-2 rounded-xl">Acting</span>
                        </div>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum voluptates, quasi tenetur adipisci fuga non quas, dolorem aspernatur minima eum fugit error corporis eius culpa praesentium labore ex molestias incidunt?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque voluptatum modi perspiciatis eius veniam corrupti reprehenderit assumenda. Incidunt, provident dolor? Magni numquam, voluptatibus culpa modi facilis reiciendis autem. Labore, quo?</p>
                        
                        
                    
                        <h3 className="font-extrabold ">Casts</h3>
                        <div className=" rounded  flex justify-start gap-3 px-2 py-3 ">
                            <div className=" w-28 text-center">
                                <img src={credit} alt="" className="w-full rounded"/>
                                <p>Rebecca Hallawdawd</p>
                            </div>
                           
                            <div className=" w-28 text-center">
                                <img src={credit} alt="" className="w-full rounded"/>
                                <p>Rebecca Hallawdawd</p>
                            </div>
                           
                            <div className=" w-28 text-center">
                                <img src={credit} alt="" className="w-full rounded"/>
                                <p>Rebecca Hallawdawd</p>
                            </div>
                           

                        </div>

                    </div>
                </div>


            </div>
            
        </div>


    )

    

}

export default HeroDetail;
