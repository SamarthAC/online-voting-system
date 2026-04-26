import { Loader2, ShieldCheck, UserRoundPlus } from 'lucide-react'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Input from '../components/ui/Input.jsx'
import Button from '../components/ui/Button.jsx'
import Alert from '../components/ui/Alert.jsx'
import {
  loginWithEmail,
  resendVerificationEmail,
  signupWithEmail,
} from '../services/authService.js'
import { useAuth } from '../hooks/useAuth.jsx'

function AuthPage() {
  const navigate = useNavigate()
  const { isAuthenticated, isLoading, user } = useAuth()
  const [isSignupMode, setIsSignupMode] = useState(false)
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  function updateField(event) {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  function resetMessages() {
    setErrorMessage('')
    setSuccessMessage('')
  }

  async function handleSubmit(event) {
    event.preventDefault()
    resetMessages()

    try {
      setIsSubmitting(true)
      if (isSignupMode) {
        await signupWithEmail(formData.email, formData.password)
        setSuccessMessage(
          'Account created. Verification email sent. Open your inbox, verify, then sign in.',
        )
        setIsSignupMode(false)
      } else {
        await loginWithEmail(formData.email, formData.password)
        setSuccessMessage('Login successful. Redirecting...')
        navigate('/vote', { replace: true })
      }
    } catch (error) {
      const fallbackMessage =
        isSignupMode
          ? 'Unable to create account right now. Please try again.'
          : 'Invalid email or password.'
      const rawMessage = error.message || fallbackMessage
      const code = error.code ? ` (${error.code})` : ''
      setErrorMessage(`${rawMessage}${code}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleResendVerification() {
    try {
      resetMessages()
      if (!user) {
        throw new Error('Sign up first so we can resend your verification email.')
      }

      await resendVerificationEmail(user)
      setSuccessMessage('Verification email sent again. Please check your inbox.')
    } catch (error) {
      setErrorMessage(error.message || 'Unable to resend verification email.')
    }
  }

  if (!isLoading && isAuthenticated && !user?.emailVerified) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 py-8">
        <div className="glass-card fade-up w-full max-w-md rounded-3xl px-6 py-8 sm:px-8">
          <h1 className="text-2xl text-slate-800">Verify Your Email</h1>
          <p className="mt-2 text-sm text-slate-600">
            Your account is created. Verification is optional for login, but you can verify now.
          </p>
          <p className="mt-2 text-xs text-slate-500">
            If you cannot find the email, check spam/junk and click resend.
          </p>

          <div className="mt-5 space-y-3">
            <Button type="button" onClick={handleResendVerification} className="w-full">
              Resend Verification Email
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/vote', { replace: true })}
              className="w-full"
            >
              Continue To Voting
            </Button>
          </div>

          <div className="mt-4">
            <Alert type="error" message={errorMessage} />
            <Alert type="success" message={successMessage} />
          </div>
        </div>
      </div>
    )
  }

  if (!isLoading && isAuthenticated) {
    return <Navigate to="/vote" replace />
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="glass-card fade-up w-full max-w-md rounded-3xl px-6 py-8 sm:px-8">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-900/20">
            {isSignupMode ? (
              <UserRoundPlus className="h-7 w-7" />
            ) : (
              <ShieldCheck className="h-7 w-7" />
            )}
          </div>
          <h1 className="text-2xl text-slate-800">
            {isSignupMode ? 'Create your account' : 'Welcome back'}
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Secure login for your cloud voting dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="email"
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={updateField}
            placeholder="name@example.com"
            required
            name="email"
          />
          <Input
            id="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={updateField}
            placeholder="Minimum 6 characters"
            required
            name="password"
          />

          <Alert type="error" message={errorMessage} />
          <Alert type="success" message={successMessage} />

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                {isSignupMode ? 'Creating account...' : 'Signing in...'}
              </span>
            ) : isSignupMode ? (
              'Create Account'
            ) : (
              'Sign In'
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => {
              setIsSignupMode((current) => !current)
              resetMessages()
            }}
            className="text-sm font-semibold text-teal-700 transition hover:text-teal-600"
          >
            {isSignupMode ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
