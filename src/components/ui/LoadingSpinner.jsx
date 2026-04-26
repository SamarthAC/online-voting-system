function LoadingSpinner({ label = 'Loading...' }) {
  return (
    <div className="flex items-center justify-center gap-3">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-teal-300 border-t-teal-600" />
      <p className="text-sm font-medium text-slate-600">{label}</p>
    </div>
  )
}

export default LoadingSpinner
