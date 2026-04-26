import {
  collection,
  doc,
  getDoc,
  getDocs,
  runTransaction,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from '../firebase.js'
import { CANDIDATES } from '../constants/candidates.js'

const votesCollection = collection(db, 'votes')

export async function getUserVote(userId) {
  const voteRef = doc(db, 'votes', userId)
  const voteSnap = await getDoc(voteRef)
  if (!voteSnap.exists()) {
    return null
  }

  return voteSnap.data()
}

export async function castVote(userId, candidateId) {
  const voteRef = doc(db, 'votes', userId)

  await runTransaction(db, async (transaction) => {
    const voteSnapshot = await transaction.get(voteRef)

    if (voteSnapshot.exists()) {
      throw new Error('You have already voted. Duplicate votes are not allowed.')
    }

    transaction.set(voteRef, {
      userId,
      candidateId,
      createdAt: serverTimestamp(),
    })
  })
}

export async function getVoteResults() {
  const tally = CANDIDATES.reduce((accumulator, candidate) => {
    accumulator[candidate.id] = 0
    return accumulator
  }, {})

  const voteSnap = await getDocs(votesCollection)
  voteSnap.forEach((voteDoc) => {
    const vote = voteDoc.data()
    if (tally[vote.candidateId] !== undefined) {
      tally[vote.candidateId] += 1
    }
  })

  const totalVotes = Object.values(tally).reduce(
    (sum, currentCount) => sum + currentCount,
    0,
  )

  return { tally, totalVotes }
}
