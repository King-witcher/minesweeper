import { Matrix } from "./matrix.ts"

/**
 * Sets a cell as revealed. If this cell has no neighbor bombs, recursively reveals each neighbor.
 * @param revealed The previous revealed matrix that will be modified.
 * @param neighbors A matrix that maps how many neighbors bombs each cell has.
 * @param line Line of the cell to be marked as revealed.
 * @param column Column of the cell to be marked as revealed.
 */
export function reveal(
  revealed: Matrix<boolean>,
  neighbors: Matrix<number>,
  line: number,
  column: number
): void {
  if (revealed.get(line, column) === null) return
  if (revealed.get(line, column)) return
  revealed.set(line, column, true)
  if (neighbors.get(line, column)) return

  const deltas = [-1, 0, 1]
  deltas.forEach(x => deltas.forEach(y =>
    reveal(revealed, neighbors, line + x, column + y)
  ))
}

/**
 * Gets a neighbors matrix that maps how many neighbor bombs each cell has.
 * @param bombs The bombs matrix that maps which cell has a bomb.
 */
export function getNeighbors(bombs: Matrix<boolean>): Matrix<number> {
  const neighbors = new Matrix(bombs.lines, bombs.columns, 0)
  bombs.forEach((hasBomb, line, column) => {
    if (hasBomb) {
      const deltas = [-1, 0, 1]
      deltas.forEach(x => deltas.forEach(y => {
        const currentValue = neighbors.get(line + x, column + y)
        if (currentValue === null) return
        neighbors.set(line + x, column + y, currentValue + 1)
      }))
    }
  })

  return neighbors
}


/**
 * Gets a new bombs matrix where no bombs can be closer than 2 units from the initial click.
 * @param lines
 * @param columns
 * @param bombs
 * @param initialLine Line of the initial click
 * @param initialColumn Column of the initial click
 */
export function getBombMatrix(
  lines: number,
  columns: number,
  bombs: number,
  initialLine: number,
  initialColumn: number,
) {

  const result = new Matrix<boolean>(lines, columns, false)
  bombs = Math.min(lines * columns - 9, bombs)
  let i = bombs
  while (i--) {
    const line = Math.floor(Math.random() * lines)
    const column = Math.floor(Math.random() * columns)

    if (Math.abs(line - initialLine) <= 1 && Math.abs(column - initialColumn) <= 1) {
      i++
      continue
    }

    if (result.get(line, column)) {
      i++
      continue
    }

    result.set(line, column, true)
  }
  return result
}