import React, { useState } from 'react'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSJ2YXIoLS1yZWFkaW5nLW11dGVkKSIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgb3BhY2l0eT0iLjMiIGZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iMy43Ij48cmVjdCB4PSIxNiIgeT0iMTYiIHdpZHRoPSI1NiIgaGVpZ2h0PSI1NiIgcng9IjYiLz48cGF0aCBkPSJtMTYgNTggMTYtMTggMzIgMzIiLz48Y2lyY2xlIGN4PSI1MyIgY3k9IjM1IiByPSI3Ii8+PC9zdmc+'

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false)

  const handleError = () => {
    setDidError(true)
  }

  const { src, alt, style, className, ...rest } = props

  return didError ? (
    <div
      className={`inline-block bg-muted text-center align-middle ${className ?? ''}`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <svg 
          width="88" 
          height="88" 
          xmlns="http://www.w3.org/2000/svg" 
          stroke="var(--reading-muted)" 
          strokeLinejoin="round" 
          opacity="0.3" 
          fill="none" 
          strokeWidth="3.7"
        >
          <rect x="16" y="16" width="56" height="56" rx="6"/>
          <path d="m16 58 16-18 32 32"/>
          <circle cx="53" cy="35" r="7"/>
        </svg>
      </div>
    </div>
  ) : (
    <img src={src} alt={alt} className={className} style={style} {...rest} onError={handleError} />
  )
}