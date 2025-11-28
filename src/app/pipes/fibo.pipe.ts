import { Pipe, PipeTransform } from '@angular/core';
import memo from 'memo-decorator';

export const fibonnaci = (n: number): number =>
  n <= 1 ? 1 : fibonnaci(n-1) + fibonnaci(n-2);

@Pipe({
  name: 'fibo',
  pure: true
})
export class FiboPipe implements PipeTransform {
  @memo()
  transform(n: number): number {
    console.log("Calcul de fibo de %d", n)
    return fibonnaci(n);
  }
}