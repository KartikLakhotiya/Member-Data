import './App.css'
import Navbar from './components/navbar'
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from './components/ui/toaster'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from "framer-motion";
import { Button } from './components/ui/button';
import Sidebar from './components/Sidebar';
import { AllMembers } from './pages/AllMembers';
import { FetchMember } from './pages/FetchMember';
import { AddMember } from './pages/AddMember';
import { DataTableDemo } from './components/DataTable';
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
          <Route path='/datatable' element={<DataTableDemo/>} />
          <Route path='/edit-member/:id' element={<EditMember/>} />
        </Routes>
      </Router>

    </motion.div>
      </ThemeProvider>
  )
}

export default App
