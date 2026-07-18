import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Home from './pages/Home'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Demo from './pages/Demo'
import Generator from './pages/Generator'
import OAuthSuccess from './pages/OAuthSuccess'
import ProtectedRoute from './components/ProtectedRoute'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/Reset'
function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/generator" element={<ProtectedRoute><Generator /></ProtectedRoute>} />
          <Route path="/oauth-success" element={<OAuthSuccess />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />  
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App