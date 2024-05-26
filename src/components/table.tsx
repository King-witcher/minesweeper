import { Center, Grid } from "@chakra-ui/react"
import { BombButton } from './bomb-button.tsx'
import { useGameState } from "../hooks/use-game-state.ts"

interface Props {
  lines: number
  columns: number
  bombs: number
}

function Table({ lines, columns, bombs }: Props) {
  const { bombsMatrix, hasLost, revealed, neighbors, open } = useGameState(lines, columns, bombs)

  return (
    <Center h='100dvh'>
      <Grid
        templateColumns={`repeat(${columns}, min-content)`}
        rounded='15px'
        overflow='hidden'
        bg={'#444'}
        border={'2px solid #444'}
        gap='2px'
      >
        {bombsMatrix.map((isBomb, line, column) => (
          <BombButton
            key={`${line}-${column}`}
            isBomb={isBomb}
            hastLost={hasLost}
            isRevealed={revealed.get(line, column)!}
            neighbors={neighbors.get(line, column)!}
            onReveal={() => open(line, column)}
          />
        ))}
      </Grid>
    </Center>
  )
}

export default Table
