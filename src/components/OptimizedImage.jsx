const OptimizedImage = ({ src, alt, className, type = 'backdrop' }) => {
    const baseUrl = 'https://image.tmdb.org/t/p/';
    const sizes = {
      backdrop: 'w1280',
      poster: 'w780',
      still: 'w300'
    };
    
    // Gunakan Cloudinary atau Imgix jika ada
    const optimizedUrl = `https://res.cloudinary.com/dnzfbfvo3/image/fetch/q_auto,f_auto/${baseUrl}${sizes[type]}${src}`;
    
    return (
      <img
        src={optimizedUrl}
        alt={alt}
        className={className}
        loading="lazy"
        decoding="async"
      />
    );
  };
  
  export default OptimizedImage;