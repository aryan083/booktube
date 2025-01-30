import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import './components/pdf_upload/MultiPDFUpload.css';

import PDFUpload from './components/pdf_upload/MultiPDFUpload.jsx';
// import './components/pdf_upload/PDFUpload.css';
// import './PDFUpload.css';

function App() {
  return (
    <div className="App">
      <PDFUpload />
    </div>
  );
}

export default App;