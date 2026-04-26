import { AlertCircle, CheckCircle2 } from 'lucide-react'

function Alert({ type = 'info', message }) {
  if (!message) {
    return null
  }

  const isError = type === 'error'
  const Icon = isError ? AlertCircle : CheckCircle2

  return (
    <div
      className={`fade-up flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${
        isError
          ? 'border-red-200 bg-red-50/85 text-red-700'
          : 'border-emerald-200 bg-emerald-50/85 text-emerald-700'
      }`}
      role="alert"
    >
      <Icon className="mt-0.5 h-4 w-4 shrink-0" />
      <p>{message}</p>
    </div>
  )
}

export default Alert
