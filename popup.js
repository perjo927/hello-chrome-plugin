function constructOptions(buttonColors, wrapper) {
  for (const [title, color] of Object.entries(buttonColors)) {
    const div = document.createElement('div');

    let button = document.createElement('button');
    button.style.backgroundColor = color;
    button.setAttribute("id", title);
    button.setAttribute('value', color);

    const buttonHeading = document.createElement('span');
    buttonHeading.innerHTML = title;
    div.appendChild(buttonHeading);
    div.appendChild(button);              
  
    button.onclick = element => {
      const color = element.target.value;
    
      chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        const [firstTab] = tabs;
        chrome.tabs.executeScript(
          firstTab.id,
          {
            code: `
              document.body.style.backgroundColor = "${color}";
            `
          });
      });
    };

    wrapper.appendChild(div);
  }
}

const wrapper = document.getElementById('wrapper');

chrome.storage.sync.get('colors', data => { 
  const { colors } = data;
  constructOptions(colors, wrapper);
}); 