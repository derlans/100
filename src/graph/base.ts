export interface GraphOpations{
  accuracy?: number
  name?: string
}
export class Graph {
  private _accuracy: number
  public name: string
  constructor(graphOpations?: GraphOpations) {
    const { accuracy = 0.0001, name = 'Graph' } = graphOpations ?? {}
    this._accuracy = 0.0001
    this.accuracy = accuracy
    this.name = name
  }

  public set accuracy(accuracy: number) {
    if (accuracy < 0) throw new Error('accuracy must be greater than 0')
    this._accuracy = accuracy
  }

  public get accuracy() {
    return this._accuracy
  }

  public isEquel(a: number, b: number) {
    return Math.abs(a - b) < this.accuracy
  }
}
