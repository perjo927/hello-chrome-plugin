let state = {};

const watchColorPicker = event => {
  const color = event.target.value;
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

const constructOptions = (buttonColors, wrapper) => {
  for (const [title, color] of Object.entries(buttonColors)) {
    const div = document.createElement('div');

    let input = document.createElement('input');
    input.setAttribute('type', 'color');
    input.setAttribute("id", title);
    input.setAttribute('value', color);
    input.addEventListener("input", watchColorPicker, false);

    const inputLabel = document.createElement('label');
    inputLabel.innerHTML = title;
    inputLabel.setAttribute("for", title);

    div.appendChild(inputLabel);
    div.appendChild(input);              

    wrapper.appendChild(div);
  }
}

const generateConfig = element => {
  const config = document.getElementById("config")
  config.innerHTML = "Copied to clipboard: " + JSON.stringify(state);
  navigator.clipboard.writeText("Howdy, partner!").then(function() {
    console.log("Copied to clipboard successfully!");
  }, function() {
    console.error("Unable to write to clipboard. :-(");
  });
}

const wrapper = document.getElementById('wrapper');

chrome.storage.sync.get('colors', data => { 
  const { colors } = data;
  state = colors;
  constructOptions(colors, wrapper);
}); 

const generateButton = document.getElementById("generateConfig");
generateButton.onclick = generateConfig;

// TODO
chrome.tabs.query({active: true, currentWindow: true}, tabs => {
  const [firstTab] = tabs;
  chrome.tabs.executeScript(
    firstTab.id,
    {
      code: `
        function main () {
          // ...
          console.log(window);
          // ...
        }

        var script = document.createElement('script');
        script.appendChild(document.createTextNode('('+ main +')();'));
        (document.body || document.head || document.documentElement).appendChild(script);
      `
    });
});
