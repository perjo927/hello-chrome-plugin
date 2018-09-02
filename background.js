const colors = {
  one: '#aaaaaa',
  two: '#bbbbbb',
  three: '#cccccc',
  four: '#dddddd',
  five: '#eeeeee',
  six: '#ffffff',
  seven: '#000000',
  eight: '#111111',
  nine: '#222222',
  ten: '#333333',
  eleven: '#444444',
  twelve: '#555555'  
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