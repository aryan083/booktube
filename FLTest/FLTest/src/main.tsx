
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'next-themes'
import './index.css'
import App from './App.tsx'
import 'preline'
import { IStaticMethods } from 'preline/preline'

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods
  }
}

createRoot(document.getElementById('root')!).render(
  
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <App />
    </ThemeProvider>
  
)

// Initialize Preline
// document.addEventListener('DOMContentLoaded', () => {
//   import('preline/preline').then((HSStaticMethods) => {
//     HSStaticMethods.default.init()
//   })
// })
