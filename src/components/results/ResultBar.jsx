function ResultBar({ candidateName, votes, percentage, isLeading }) {
  return (
    <div className="rounded-xl border border-white/70 bg-white/70 p-4">
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="font-semibold text-slate-700">
          {candidateName}
          {isLeading ? (
            <span className="ml-2 rounded-full bg-teal-100 px-2 py-1 text-xs text-teal-700">
              Leading
            </span>
          ) : null}
        </p>
        <p className="text-sm font-semibold text-slate-600">{votes} votes</p>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="mt-2 text-right text-xs font-semibold text-slate-500">{percentage.toFixed(1)}%</p>
    </div>
  )
}

export default ResultBar
