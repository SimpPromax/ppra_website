import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center flex flex-col items-center">
        
        {/* Native HTML5 Video Element */}
        <div className="w-full max-w-sm aspect-square mb-6 flex items-center justify-center">
          <video 
            src="src/assets/404 Lottie.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-contain"
          />
        </div>

        {/* Text Details */}
        <h2 className="text-2xl md:text-3xl font-bold text-deep-navy-800 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-500 mb-8 max-w-xs">
          The page you are looking for doesn't exist or has been moved.
        </p>

        {/* Home Button */}
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 bg-clear-navy-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-clear-navy-600 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Back to Home
        </Link>
        
      </div>
    </div>
  )
}