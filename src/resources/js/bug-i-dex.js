(function () {
  const messagesEl = document.getElementById('chatbot-messages');
  const form = document.getElementById('chatbot-form');
  const input = document.getElementById('chatbot-input');
  const history = [];

  function addMessage(role, text) {
    const div = document.createElement('div');
    div.className = 'msg ' + role;
    div.textContent = text;
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    addMessage('user', text);
    history.push({ role: 'user', content: text });
    input.value = '';

    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: history }),
    })
      .then(r => r.json())
      .then(data => {
        if (data.reply) {
          addMessage('assistant', data.reply);
          history.push({ role: 'assistant', content: data.reply });
        } else {
          addMessage('assistant', '(error)');
        }
      })
      .catch(() => addMessage('assistant', '(error)'));
  });
})();
