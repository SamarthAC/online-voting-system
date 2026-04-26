import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './routes/ProtectedRoute.jsx'
import AuthPage from './pages/AuthPage.jsx'
import VotePage from './pages/VotePage.jsx'
import ResultsPage from './pages/ResultsPage.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route
        path="/vote"
        element={
          <ProtectedRoute>
            <VotePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/results"
        element={
          <ProtectedRoute>
            <ResultsPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
