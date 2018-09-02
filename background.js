const colors = {
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

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({colors}, () => {
    console.log("The colors have been defined.", colors);
  });
});

chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
  chrome.declarativeContent.onPageChanged.addRules([{
    conditions: [new chrome.declarativeContent.PageStateMatcher({
      pageUrl: {hostEquals: 'localhost'},
    })
    ],
    actions: [new chrome.declarativeContent.ShowPageAction()]
  }]);
});