window.renderHouses = function () {
    const totalHouses = 114;
  
    // Define members here:
    const members = [50, 70, 72, 74, 78, 82, 84, 86, 94, 100, 110];
  
    const container = document.getElementById("house-container");
    if (!container) return;
  
    for (let i = 1; i <= totalHouses; i++) {
      const status = members.includes(i) ? "member" : "not-member";
      const span = document.createElement("span");
      span.className = "house";
      span.dataset.number = i;
      span.dataset.status = status;
      container.appendChild(span);
    }
  
    document.querySelectorAll('.house').forEach(el => {
      const number = el.dataset.number || '';
      const status = el.dataset.status || 'member';
      const color = status === 'not-member' ? '#ea9999' : '#b3ea99';
  
      const svg = `
        <svg viewBox="0 0 120 100" xmlns="http://www.w3.org/2000/svg"
             width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
          <rect x="20" y="40" width="80" height="50" fill="${color}" stroke="#000" stroke-width="4"/>
          <polygon points="15,40 60,5 105,40" fill="${color}" stroke="#000" stroke-width="4"/>
          <text x="60" y="65" text-anchor="middle" dominant-baseline="middle"
                fill="#333" font-size="32" font-weight="bold">${number}</text>
        </svg>
      `;
      el.innerHTML = svg;
    });
  }
  
  window.initMailchimpForm = function () {
    const mcForm = document.getElementById('mc-form');
    const mcMsg = document.getElementById('mc-message');
    const iframe = document.querySelector('iframe[name="hidden_iframe"]');
  
    if (mcForm && mcMsg && iframe) {
      iframe.addEventListener('load', () => {
        const emailField = mcForm.querySelector('input[name="EMAIL"]');
        if (emailField && emailField.value.trim() !== '') {
          mcMsg.classList.remove('d-none');
          mcForm.reset();
          setTimeout(() => mcMsg.classList.add('d-none'), 5000);
        }
      });
    }
  };
  