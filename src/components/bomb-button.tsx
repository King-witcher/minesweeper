import { chakra, } from "@chakra-ui/react"
import { MouseEvent, useState } from "react"

interface Props {
  neighbors: number
  isBomb: boolean
  isRevealed: boolean
  hastLost: boolean
  onReveal: () => void
}

export function BombButton({ neighbors, isBomb, isRevealed, hastLost, onReveal }: Props) {
  const [isFlagged, setIsFlagged] = useState(false)

  function handleFlag(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    if (isRevealed) return
    setIsFlagged(prev => !prev)
  }

  function handleReveal() {
    if (isFlagged || isRevealed || hastLost) return
    onReveal()
  }

  const colorMap: Record<number, string> = {
    1: '#46f',
    2: '#375',
    3: '#f23',
    4: '#04f',
    5: '#920',
    6: '#0ac',
    7: '#000',
    8: '#666'
  }
  
  return (
    <chakra.button
      onClick={handleReveal}
      onContextMenu={handleFlag}
      bg={hastLost && isBomb ? '#e23' : isRevealed ? '#333' : '#666'}
      color={isRevealed && !isBomb ? colorMap[neighbors] || '#eee' : '#eee'}
      opacity={1}
      filter={'none'}
      boxSize={'50px'}
      _hover={isRevealed || isFlagged || hastLost ? undefined : {
        bg: '#777'
      }}
      transition='all 100ms linear'
      cursor={isFlagged ? 'not-allowed' : 'default'}
      fontWeight={800}
      fontSize='20px'
    >
      {!isBomb && isRevealed && neighbors !== 0 && neighbors}
      {isBomb && hastLost && 'B'}
      {isFlagged && !isRevealed && 'F'}
    </chakra.button>
  )
}