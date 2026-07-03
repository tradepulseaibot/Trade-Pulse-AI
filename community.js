(function() {
  console.log('community.js minimal loaded');

  function start() {
    const chatColumn = document.getElementById('communityChatColumn');
    if (chatColumn) {
      chatColumn.innerHTML = '<div class="community-chat-card"><div class="chat-msg-body">✅ Community works!</div></div>';
      document.getElementById('onlineCount') && (document.getElementById('onlineCount').textContent = '1,256 Online');
    } else {
      console.warn('communityChatColumn not found – check your HTML');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
