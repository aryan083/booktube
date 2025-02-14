// "use client"

// import type React from "react"
// import { createContext, useState, useContext, useRef, useEffect } from "react"
// import Image from "next/image"
// import Link from "next/link"

// // Utility function for class names
// const cn = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(" ")

// // Context for mouse enter state
// const MouseEnterContext = createContext<[boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined>(undefined)

// // Hook to use the mouse enter context
// const useMouseEnter = () => {
//   const context = useContext(MouseEnterContext)
//   if (context === undefined) {
//     throw new Error("useMouseEnter must be used within a MouseEnterProvider")
//   }
//   return context
// }

// // CardContainer component
// const CardContainer: React.FC<{
//   children?: React.ReactNode
//   className?: string
//   containerClassName?: string
// }> = ({ children, className = "", containerClassName = "" }) => {
//   const containerRef = useRef<HTMLDivElement>(null)
//   const [isMouseEntered, setIsMouseEntered] = useState(false)

//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (!containerRef.current) return
//     const { left, top, width, height } = containerRef.current.getBoundingClientRect()
//     const x = (e.clientX - left - width / 2) / 25
//     const y = (e.clientY - top - height / 2) / 25
//     containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`
//   }

//   const handleMouseEnter = () => setIsMouseEntered(true)

//   const handleMouseLeave = () => {
//     setIsMouseEntered(false)
//     if (containerRef.current) {
//       containerRef.current.style.transform = "rotateY(0deg) rotateX(0deg)"
//     }
//   }

//   return (
//     <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
//       <div
//         className={cn("py-20 flex items-center justify-center", containerClassName)}
//         style={{ perspective: "1000px" }}
//       >
//         <div
//           ref={containerRef}
//           onMouseEnter={handleMouseEnter}
//           onMouseMove={handleMouseMove}
//           onMouseLeave={handleMouseLeave}
//           className={cn("flex items-center justify-center relative transition-all duration-200 ease-linear", className)}
//           style={{ transformStyle: "preserve-3d" }}
//         >
//           {children}
//         </div>
//       </div>
//     </MouseEnterContext.Provider>
//   )
// }

// // CardBody component
// export const CardBody: React.FC<{
//   children: React.ReactNode
//   className?: string
// }> = ({ children, className = "" }) => {
//   return (
//     <div className={cn("h-96 w-96 transform-style-preserve-3d", className)}>
//       {children}
//     </div>
//   )
// }

// // CardItem component
// const CardItem: React.FC<{
//   as?: React.ElementType
//   children: React.ReactNode
//   className?: string
//   translateX?: number
//   translateY?: number
//   translateZ?: number
//   rotateX?: number
//   rotateY?: number
//   rotateZ?: number
//   [key: string]: any
// }> = ({
//   as: Tag = "div",
//   children,
//   className = "",
//   translateX = 0,
//   translateY = 0,
//   translateZ = 0,
//   rotateX = 0,
//   rotateY = 0,
//   rotateZ = 0,
//   ...rest
// }) => {
//   const ref = useRef<HTMLDivElement>(null)
//   const [isMouseEntered] = useMouseEnter()

//   useEffect(() => {
//     if (!ref.current) return
//     if (isMouseEntered) {
//       ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`
//     } else {
//       ref.current.style.transform = "translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)"
//     }
//   }, [isMouseEntered, translateX, translateY, translateZ, rotateX, rotateY, rotateZ])

//   return (
//     <Tag ref={ref} className={cn("w-fit transition duration-200 ease-linear", className)} {...rest}>
//       {children}
//     </Tag>
//   )
// }

// // Main component
// export default function ThreeDCardDemo() {
//   return (
//     <CardContainer className="inter-var">
//       <CardBody className="bg-gray-50 relative dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
//         <CardItem translateZ={50} className="text-xl font-bold text-neutral-600 dark:text-white">
//           Make things float in air
//         </CardItem>
//         <CardItem as="p" translateZ={60} className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
//           Hover over this card to unleash the power of CSS perspective
//         </CardItem>
//         {/* <CardItem translateZ={100} className="w-full mt-4">
//           <Image
//             src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fHx8fA%3D%3D"
//             height={1000}
//             width={1000}
//             className="h-60 w-full object-cover rounded-xl shadow-xl"
//             alt="thumbnail"
//           />
//         </CardItem> */}
//         <div className="flex justify-between items-center mt-20">
//           <CardItem
//             translateZ={20}
//             as={Link}
//             href="https://twitter.com/mannupaaji"
//             target="_blank"
//             className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
//           >
//             Try now →
//           </CardItem>
//           <CardItem
//             translateZ={20}
//             as="button"
//             className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
//           >
//             Sign up
//           </CardItem>
//         </div>
//       </CardBody>
//     </CardContainer>
//   )
// }
