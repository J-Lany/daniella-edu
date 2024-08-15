export function select(className, context) {
  const root = context ?? this.shadowRoot;
  const node = className ? root.querySelector(className) : null;
  return node ?? root;
}

export function addListeners([node, event, listener]) {
  const element = typeof node === "function" ? node() : node;
  element?.addEventListener(event, listener);
}

export function removeListeners([node, event, listener]) {
  const element = typeof node === "function" ? node() : node;
  element?.removeEventListener(event, listener);
}
