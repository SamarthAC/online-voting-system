import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import LoadingSpinner from '../components/ui/LoadingSpinner.jsx'

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner label="Checking session..." />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
