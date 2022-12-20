export interface ICheckbox {
  value?: string;
  label?: string;
}
export class Checkbox implements ICheckbox {
  constructor(
    public value ?: string,
    public label ?: string,
  )
  {
    this.label =label;
    this.value= value
  }

}
