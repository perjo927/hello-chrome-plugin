const page = document.getElementById('wrapper');
const buttonColors = {
  one: '#aaa',
  two: '#bbb',
  three: '#ccc',
  four: '#ddd',
  five: '#eee',
  six: '#fff',
  seven: '#000',
  eight: '#111',
  nine: '#222',
  ten: '#333',
  eleven: '#444',
  twelve: '#555'  
};

function constructOptions(colors) {
    for (const [title, color] of Object.entries(colors)) {
        const div = document.createElement('div');
        let button = document.createElement('button');
        button.style.backgroundColor = color;
        button.setAttribute("id", title);
        const buttonHeading = document.createElement('span');
        buttonHeading.innerHTML = title;
        div.appendChild(buttonHeading);
        div.appendChild(button);        
      
        button.addEventListener('click', () => {
            chrome.storage.sync.set({colors}, () => {
                console.log(`colors are ${colors}`);
            })
        });
        page.appendChild(div);
    }
}

constructOptions(buttonColors);