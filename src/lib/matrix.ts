export class Matrix<T> {
  constructor(public readonly lines: number, public readonly columns: number, initialValue: T) {
    this.matrix = Array.from({ length: lines * columns}, () => initialValue)
  }

  private readonly matrix: T[]

  get(line: number, column: number): T | null {
    if (line < 0 || line >= this.lines || column < 0 || column >= this.columns)
      return null

    return this.matrix[this.columns * line + column]
  }

  set(line: number, column: number, value: T) {
    if (line < 0 || line >= this.lines || column < 0 || column >= this.columns)
      return

    this.matrix[this.columns * line + column] = value
  }

  /**
   * Iterates over each entry of the matrix.
   * @param predicate Predicate that receives the current element, line and column.
   */
  forEach(predicate: (value: T, line: number, column: number) => void) {
    for (let line = 0; line < this.lines; line++)
      for (let column = 0; column < this.columns; column++)
        predicate(this.get(line, column)!, line, column)
  }

  /** Calls a defined callback function on each element of a matrix, and returns an array that contains the results. */
  map<Mapped>(predicate: (value: T, line: number, column: number) => Mapped): Mapped[] {
    return this.matrix.map((value, index) => (
      predicate(value, Math.floor(index / this.columns), index % this.columns)
    ))
  }

  clone(): Matrix<T> {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this)
  }
}
