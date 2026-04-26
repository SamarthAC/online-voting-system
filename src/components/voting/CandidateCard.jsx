import { CheckCircle2, ShieldCheck } from 'lucide-react'
import Button from '../ui/Button.jsx'

function CandidateCard({ candidate, onVote, isSubmitting, disabled, isSelected }) {
  return (
    <article
      className={`rounded-2xl border bg-white/70 p-5 shadow-md shadow-slate-900/5 transition duration-300 ${
        disabled ? 'border-slate-200' : 'hover:-translate-y-1 hover:border-teal-300 hover:shadow-lg'
      }`}
    >
      <div className="mb-4 grid grid-cols-2 gap-2">
        <div className="rounded-xl border border-slate-200 bg-white/85 p-1">
          <img
            src={candidate.partySymbol}
            alt={`${candidate.name} party symbol`}
            className="h-30 w-full rounded-lg object-cover"
          />
          <p className="mt-1 text-center text-[10px] font-semibold uppercase tracking-wide text-slate-500">
            Party
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white/85 p-1">
          <img
            src={candidate.photo}
            alt={`${candidate.name} candidate portrait`}
            className="h-32 w-full rounded-lg object-cover"
          />
          <p className="mt-1 text-center text-[10px] font-semibold uppercase tracking-wide text-slate-500">
            Candidate
          </p>
        </div>
      </div>

      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">{candidate.name}</h3>
          <p className="mt-1 text-sm text-slate-500">{candidate.subtitle}</p>
          <p className="mt-1 text-xs font-medium text-teal-700">{candidate.party}</p>
        </div>
        <span className="rounded-lg bg-teal-50 p-2 text-teal-600">
          {isSelected ? <CheckCircle2 className="h-5 w-5" /> : <ShieldCheck className="h-5 w-5" />}
        </span>
      </div>

      <div className="mt-5">
        <Button
          onClick={() => onVote(candidate)}
          disabled={disabled || isSubmitting}
          className="w-full"
        >
          {isSubmitting ? 'Submitting Vote...' : isSelected ? 'Selected Candidate' : 'Vote Now'}
        </Button>
      </div>
    </article>
  )
}

export default CandidateCard
