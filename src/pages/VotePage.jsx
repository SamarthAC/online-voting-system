import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCheck, Loader2 } from 'lucide-react'
import AppShell from '../components/layout/AppShell.jsx'
import CandidateCard from '../components/voting/CandidateCard.jsx'
import VoteConfirmModal from '../components/voting/VoteConfirmModal.jsx'
import Alert from '../components/ui/Alert.jsx'
import LoadingSpinner from '../components/ui/LoadingSpinner.jsx'
import { CANDIDATES } from '../constants/candidates.js'
import { castVote, getUserVote } from '../services/voteService.js'
import { useAuth } from '../hooks/useAuth.jsx'

function VotePage() {
  const { user } = useAuth()
  const [isCheckingVote, setIsCheckingVote] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [userVote, setUserVote] = useState(null)
  const [pendingCandidate, setPendingCandidate] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    async function fetchVoteStatus() {
      if (!user?.uid) {
        return
      }

      try {
        setIsCheckingVote(true)
        const vote = await getUserVote(user.uid)
        setUserVote(vote)
      } catch (error) {
        setErrorMessage(error.message || 'Unable to check voting status.')
      } finally {
        setIsCheckingVote(false)
      }
    }

    fetchVoteStatus()
  }, [user?.uid])

  function handleVoteClick(candidate) {
    if (!user?.uid || userVote) {
      return
    }

    setPendingCandidate(candidate)
  }

  function closeVoteConfirmation() {
    if (isSubmitting) {
      return
    }

    setPendingCandidate(null)
  }

  async function confirmVote() {
    if (!user?.uid || userVote) {
      return
    }
    if (!pendingCandidate) {
      return
    }

    setErrorMessage('')
    setSuccessMessage('')

    try {
      setIsSubmitting(true)
      await castVote(user.uid, pendingCandidate.id)
      setUserVote({ userId: user.uid, candidateId: pendingCandidate.id })
      setSuccessMessage(
        `Vote confirmed for ${pendingCandidate.name}. Thank you for participating!`,
      )
      setPendingCandidate(null)
    } catch (error) {
      setErrorMessage(error.message || 'Unable to submit your vote.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AppShell
      title="Cast Your Vote"
      subtitle="Each account can vote once. Your selection is securely stored in the cloud."
    >
      <div className="space-y-6">
        <Alert type="error" message={errorMessage} />
        <Alert type="success" message={successMessage} />

        {isCheckingVote ? (
          <div className="rounded-2xl border border-white/70 bg-white/65 py-10">
            <LoadingSpinner label="Checking your voting status..." />
          </div>
        ) : (
          <>
            {userVote ? (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/90 p-4 text-emerald-700">
                <p className="inline-flex items-center gap-2 font-semibold">
                  <CheckCheck className="h-5 w-5" />
                  You have already voted.
                </p>
                <p className="mt-2 text-sm">
                  Your selected candidate:
                  <span className="ml-2 font-semibold">
                    {CANDIDATES.find((candidate) => candidate.id === userVote.candidateId)?.name}
                  </span>
                </p>
              </div>
            ) : null}

            <div className="grid gap-4 md:grid-cols-3">
              {CANDIDATES.map((candidate) => (
                <CandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  isSubmitting={isSubmitting}
                  disabled={Boolean(userVote)}
                  isSelected={candidate.id === userVote?.candidateId}
                  onVote={handleVoteClick}
                />
              ))}
            </div>

            <div className="flex justify-end">
              <Link to="/results" className="secondary-btn">
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                View Live Results
              </Link>
            </div>
          </>
        )}
      </div>

      <VoteConfirmModal
        candidate={pendingCandidate}
        voterEmail={user?.email || 'Current User'}
        onCancel={closeVoteConfirmation}
        onConfirm={confirmVote}
        isSubmitting={isSubmitting}
      />
    </AppShell>
  )
}

export default VotePage
