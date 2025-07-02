

const HeroSkeleton = () => {
    return (
      <div className="relative h-[80vh] lg:h-full w-full bg-gray-800 animate-pulse">
        <div className="absolute inset-0 flex h-full w-full overflow-hidden">
          <div className="xl:w-4/6 lg:w-[50%] w-[80%] h-[70%] my-auto flex items-start flex-col xl:gap-3 gap-0 justify-center md:mx-14 xl:mx-28 lg:mx-20 px-3 mx-auto md:w-[55%]">
            {/* Skeleton untuk judul */}
            <div className="h-12 w-3/4 bg-gray-700 rounded mb-4"></div>
            
            {/* Skeleton untuk rating */}
            <div className="flex gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-5 w-5 bg-gray-700 rounded"></div>
              ))}
            </div>
            
            {/* Skeleton untuk deskripsi */}
            <div className="w-full mb-4">
              <div className="h-4 w-full bg-gray-700 rounded mb-2"></div>
              <div className="h-4 w-5/6 bg-gray-700 rounded mb-2"></div>
              <div className="h-4 w-4/6 bg-gray-700 rounded mb-2"></div>
            </div>
            
            {/* Skeleton untuk genre */}
            <div className="flex flex-wrap gap-2 mb-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-6 w-20 bg-gray-700 rounded-full"></div>
              ))}
            </div>
            
            {/* Skeleton untuk tombol */}
            <div className="h-12 w-32 bg-gray-700 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  };
  
  export default HeroSkeleton;