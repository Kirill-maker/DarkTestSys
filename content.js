
new MutationObserver(() => {
    document.querySelectorAll('*').forEach(el => {
        if(getComputedStyle(el).backgroundColor === 'rgb(255, 255, 255)') {
            el.style.setProperty('background', '#1a1a1a', 'important');
        }
    });
}).observe(document.body, {
    subtree: true,
    attributes: true,
    attributeFilter: ['style']
});

const statusColors = {
    '+': '#4CAF50',
    '-': '#F44336',
    'OK': '#4CAF50',
    'TL': '#E91E63',
    'ML': '#E91E63'
  };
  
  function styleTables() {

    document.querySelectorAll('td').forEach(td => {
      const content = td.textContent.trim();
      
      if (/^\+/.test(content)) {
        td.style.setProperty('color', statusColors['+'], 'important');
      } else if (content === '-') {
        td.style.setProperty('color', statusColors['-'], 'important');
      }
    });
  
    
    document.querySelectorAll('td:nth-child(6)').forEach(td => {
      const status = td.textContent.trim().toUpperCase();
      const colorKey = Object.keys(statusColors).find(key => 
        status.includes(key.toUpperCase())
      );
      td.style.setProperty('color', colorKey ? statusColors[colorKey] : '#F44336', 'important');
    });
  }
  

  const observer = new MutationObserver((mutations) => {
    mutations.forEach(() => setTimeout(styleTables, 100));
  });
  
  observer.observe(document.body, {
    subtree: true,
    childList: true,
    attributes: true,
    characterData: true
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    styleTables();
    setTimeout(styleTables, 500); 
  });

  