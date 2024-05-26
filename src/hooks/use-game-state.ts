import { useCallback, useState } from "react"
import { Matrix } from "../lib/matrix.ts"
import { getBombMatrix, getNeighbors, reveal } from "../lib/utils.ts"

export function useGameState(lines: number, columns: number, bombs: number) {
  const [hasStarted, setHasStarted] = useState(false)
  const [hasLost, setHasLost] = useState(false)
  const [bombsMatrix, setBombsMatrix] = useState(() => new Matrix(lines, columns, false))
  const [neighbors, setNeighbors] = useState(() => new Matrix(lines, columns, 0))
  const [revealed, setRevealed] = useState(() => new Matrix(lines, columns, false))

  const open = useCallback((line: number, column: number) => {
    if (hasLost) return

    if (!hasStarted) {
      const _bombsMatrix = getBombMatrix(lines, columns, bombs, line, column)
      const _neighbors = getNeighbors(_bombsMatrix)

      setBombsMatrix(_bombsMatrix)
      setNeighbors(_neighbors)

      reveal(revealed, _neighbors, line, column)
      setRevealed(revealed.clone())
      setHasStarted(true)
      return
    }

    reveal(revealed, neighbors, line, column)
    setRevealed(revealed.clone())

    if (bombsMatrix.get(line, column)) setHasLost(true)

  }, [lines, columns, bombs, hasStarted, hasLost, neighbors, revealed, bombsMatrix])

  return {
    open,
    neighbors,
    revealed,
    bombsMatrix,
    hasLost,
  }
}