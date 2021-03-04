export function injectStyle(content, className) {
  if (typeof window === 'undefined') {
    return;
  }
  if (!content.toString().trim()) {
    return;
  }

  const style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  style.setAttribute('class', className);
  style.innerHTML = content;
  document.head.appendChild(style);
}
