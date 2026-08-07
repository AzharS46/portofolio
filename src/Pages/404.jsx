import React from "react"
import { Helmet } from "react-helmet-async"
import { Home, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <Helmet>
        <title>404 | Page Not Found</title>
      </Helmet>

      <div className="text-center px-4">
        {/* 404 Number */}
        <div className="relative mb-8">
          <h1 className="text-[8rem] sm:text-[12rem] font-bold leading-none select-none">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent opacity-20">
              404
            </span>
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Page Not Found
              </p>
              <p className="text-gray-400 text-sm sm:text-base max-w-md">
                The page you're looking for doesn't exist or has been moved.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          <Link to="/">
            <button className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-xl opacity-50 blur-md group-hover:opacity-90 transition-all duration-500" />
              <div className="relative flex items-center gap-2 px-6 py-3 bg-dark rounded-lg border border-white/10">
                <Home className="w-4 h-4 text-white" />
                <span className="text-sm font-medium text-white">Go Home</span>
              </div>
            </button>
          </Link>
          
          <button onClick={() => window.history.back()} className="group relative">
            <div className="relative flex items-center gap-2 px-6 py-3 glass rounded-lg">
              <ArrowLeft className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
              <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">Go Back</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
