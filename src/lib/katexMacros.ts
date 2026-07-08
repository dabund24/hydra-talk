export function vecFour(a: string, b: string, c: string, d: string): string {
  return `\\begin{pmatrix}${a}\\\\${b}\\\\${c}\\\\${d}\\end{pmatrix}`;
}

export function vecTwo(a: string, b: string): string {
  return `\\begin{pmatrix}${a}\\\\${b}\\end{pmatrix}`;
}

export function matTwoByTwo(a: string, b: string, c: string, d: string): string {
  return `\\begin{pmatrix}${a} & ${b}\\\\${c} & ${d}\\end{pmatrix}`;
}
