import { createRoot } from "react-dom/client";
import { ThemeProvider } from "next-themes";
import "./index.css";
import "dropzone/dist/dropzone.css";
import App from "./App.tsx";
import "preline";
import { IStaticMethods } from "preline/preline";
import ClickSpark from './components/ClickSpark.tsx'
// import Dropzone from "dropzone";

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

createRoot(document.getElementById("root")!).render(<>
  <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>


<ClickSpark
  sparkColor='#fff'
  sparkSize={10}
  sparkRadius={15}
  sparkCount={8}
  duration={500}
>
<App />

</ClickSpark>
  </ThemeProvider>
  </>
);

// Initialize Preline
// document.addEventListener('DOMContentLoaded', () => {
//   import('preline/preline').then((HSStaticMethods) => {
//     HSStaticMethods.default.init()
//   })
// })
