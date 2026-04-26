import candidate1 from '../assets/candidates/candidate1.png'
import candidate1Symbol from '../assets/candidates/Bharatiya_Janata_Party.svg'
import candidate1PersonalSymbol from '../assets/candidates/modi-personal.svg'
import candidate2 from '../assets/candidates/candidate2.png'
import candidate2Symbol from '../assets/candidates/Indian_National_Congress.svg'
import candidate2PersonalSymbol from '../assets/candidates/rahul-personal.svg'
import candidate3 from '../assets/candidates/candidate3.png'
import candidate3PartySymbol from '../assets/candidates/Indian_Election_Symbol_Lader.svg'
import candidate3PersonalSymbol from '../assets/candidates/kejriwal-personal.svg'

export const CANDIDATES = [
  {
    id: 'candidate-a',
    name: 'Rahul Sharma',
    subtitle: 'Progress & Innovation',
    party: 'Jan Shakti Party',
    photo: candidate1,
    partySymbol: candidate1Symbol,
    personalSymbol: candidate1PersonalSymbol,
  },
  {
    id: 'candidate-b',
    name: 'Priya Reddy',
    subtitle: 'Community & Stability',
    party: "People's Unity Party",
    photo: candidate2,
    partySymbol: candidate2Symbol,
    personalSymbol: candidate2PersonalSymbol,
  },
  {
    id: 'candidate-c',
    name: 'Arjun Patel',
    subtitle: 'Future & Sustainability',
    party: "National Growth Party",
    photo: candidate3,
    partySymbol: candidate3PartySymbol,
    personalSymbol: candidate3PersonalSymbol,
  },
]
