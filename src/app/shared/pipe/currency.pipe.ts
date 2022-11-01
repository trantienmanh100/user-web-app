import { Pipe, PipeTransform } from '@angular/core';

/**
 * Display VND
 *
 * @author manh
 * @date 2022-11/1
 * @export
 * @class CurrencyVndPipe
 * @implements {PipeTransform}
 * @howToUse
 * ```
 *     <some-element>{{ product?.price | vnd }}</some-element>
 * ```
 */
@Pipe({ name: 'vnd' })
export class CurrencyVndPipe implements PipeTransform {
  symbol = ' đ';

  transform(value: string): string {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + this.symbol;
  }
}
