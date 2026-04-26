import { useEffect, useMemo, useState } from 'react'
import { RefreshCw } from 'lucide-react'
import AppShell from '../components/layout/AppShell.jsx'
import LoadingSpinner from '../components/ui/LoadingSpinner.jsx'
import Alert from '../components/ui/Alert.jsx'
import Button from '../components/ui/Button.jsx'
import ResultBar from '../components/results/ResultBar.jsx'
import { CANDIDATES } from '../constants/candidates.js'
import { getVoteResults } from '../services/voteService.js'

function ResultsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [results, setResults] = useState({ tally: {}, totalVotes: 0 })

  const topVoteCount = useMemo(
    () => Math.max(...Object.values(results.tally), 0),
    [results.tally],
  )

  async function fetchResults() {
    try {
      setIsLoading(true)
      setErrorMessage('')
      const latest = await getVoteResults()
      setResults(latest)
    } catch (error) {
      setErrorMessage(error.message || 'Unable to load vote results.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    let isMounted = true

    async function loadInitialResults() {
      try {
        const latest = await getVoteResults()
        if (isMounted) {
          setResults(latest)
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(error.message || 'Unable to load vote results.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadInitialResults()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <AppShell
      title="Voting Results"
      subtitle="Real-time count from Firestore. Refresh any time to fetch latest votes."
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="rounded-xl bg-white/75 px-4 py-3">
            <p className="text-xs uppercase tracking-wide text-slate-500">Total Votes</p>
            <p className="text-2xl font-semibold text-slate-800">{results.totalVotes}</p>
          </div>
          <Button onClick={fetchResults} disabled={isLoading} variant="secondary">
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        <Alert type="error" message={errorMessage} />

        {isLoading ? (
          <div className="rounded-2xl border border-white/70 bg-white/70 py-10">
            <LoadingSpinner label="Fetching results..." />
          </div>
        ) : (
          <div className="space-y-4">
            {CANDIDATES.map((candidate) => {
              const votes = results.tally[candidate.id] || 0
              const percentage = results.totalVotes > 0 ? (votes / results.totalVotes) * 100 : 0

              return (
                <ResultBar
                  key={candidate.id}
                  candidateName={candidate.name}
                  votes={votes}
                  percentage={percentage}
                  isLeading={votes > 0 && votes === topVoteCount}
                />
              )
            })}
          </div>
        )}
      </div>
    </AppShell>
  )
}

export default ResultsPage
