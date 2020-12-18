export interface HTMLElementEvent extends Event {
  target: HTMLElement & EventTarget;
}

export interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
