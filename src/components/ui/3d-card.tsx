"use client"

import { cn } from "@/lib/utils"
import type React from "react"
import { createContext, useState, useContext, useRef, useEffect } from "react"

const MouseEnterContext = createContext<[boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined>(undefined)

export const CardContainer = ({
  children,
  className,
  containerClassName,
}: {
  children?: React.ReactNode
  className?: string
  containerClassName?: string
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMouseEntered, setIsMouseEntered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const { left, width } = containerRef.current.getBoundingClientRect()
    const mouseX = e.clientX - left
    const xRotation = ((mouseX - width / 2) / width) * 10
    containerRef.current.style.transform = `rotateY(${xRotation}deg) scale(1.1)`
  }

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsMouseEntered(true)
    if (!containerRef.current) return
    containerRef.current.style.transition = 'transform 0.2s ease-out'
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    setIsMouseEntered(false)
    containerRef.current.style.transform = `rotateY(0deg) scale(1)`
    containerRef.current.style.transition = 'transform 0.3s ease-out'
  }

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={cn("py-5 flex items-center justify-center", containerClassName)}
        style={{ perspective: "1000px" }}
      >
        {/* Placeholder to maintain space */}
        <div className={cn("invisible", className)}>
          {children}
        </div>
        
        {/* Interactive card with hover effect */}
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn(
            "absolute top-0 left-0 w-full h-full flex items-center justify-center",
            className
          )}
          style={{
            transformStyle: "preserve-3d",
            zIndex: isMouseEntered ? 10 : 1
          }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  )
}

export const CardBody = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className={cn("h-96 w-96 [transform-style:preserve-3d]  [&>*]:[transform-style:preserve-3d]", className)}>
      {children}
    </div>
  )
}

export const CardItem = ({
  as: Tag = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}: {
  as?: React.ElementType
  children: React.ReactNode
  className?: string
  translateX?: number | string
  translateY?: number | string
  translateZ?: number | string
  rotateX?: number | string
  rotateY?: number | string
  rotateZ?: number | string
  [key: string]: any
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isMouseEntered] = useMouseEnter()

  useEffect(() => {
    handleAnimations()
  }, [isMouseEntered])

  const handleAnimations = () => {
    if (!ref.current) return
    if (isMouseEntered) {
      ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`
    } else {
      ref.current.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`
    }
  }

  return (
    <Tag ref={ref} className={cn("w-fit transition duration-200 ease-linear", className)} {...rest}>
      {children}
    </Tag>
  )
}

export const CardImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={cn("w-full h-full object-cover rounded-xl", className)}
    />
  )
}

// Create a hook to use the context
export const useMouseEnter = () => {
  const context = useContext(MouseEnterContext)
  if (context === undefined) {
    throw new Error("useMouseEnter must be used within a MouseEnterProvider")
  }
  return context
}
