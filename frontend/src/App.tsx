import './App.css'
import Navbar from './components/navbar'
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from './components/ui/toaster'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from "framer-motion";
import { AllMembers } from './pages/AllMembers';
import { FetchMember } from './pages/FetchMember';
import { AddMember } from './pages/AddMember';
import { EditMember } from './pages/EditMember';

function App() {

  return (
    <ThemeProvider>
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Router>
        <Navbar/>
        <Toaster/>
        <Routes>
          <Route path='/' element={<AllMembers/>} />
          <Route path='/fetch' element={<FetchMember/>} />
          <Route path='/add' element={<AddMember/>} />
          <Route path='/edit-member/:id' element={<EditMember/>} />
        </Routes>
      </Router>

    </motion.div>
      </ThemeProvider>
  )
}

export default App
