document.querySelectorAll('.msg-template').forEach(el => {
  const btn = document.createElement('button');
  btn.className = 'copy-btn';
  btn.textContent = 'Copiar';
  btn.addEventListener('click', () => {
    const tag = el.querySelector('.tag');
    const text = el.textContent
      .replace(btn.textContent, '')
      .replace(tag ? tag.textContent : '', '')
      .trim();
    navigator.clipboard.writeText(text).then(() => {
      btn.textContent = 'Copiado!';
      setTimeout(() => btn.textContent = 'Copiar', 1500);
    });
  });
  el.appendChild(btn);
});
