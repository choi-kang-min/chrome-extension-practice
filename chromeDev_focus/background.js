chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
      text: "OFF",
    });
  });

  const extensions = 'https://developer.chrome.com/docs/extensions'
  const webstore = 'https://developer.chrome.com/docs/webstore'
  

  // 사용자가 확장 액션을 클릭했을 떄
  chrome.action.onClicked.addListener(async (tab) => {
    if (tab.url.startsWith(extensions) || tab.url.startsWith(webstore)) { // 만약 url과 일치한 조건이라면
      // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
      const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
      // Next state will always be the opposite
      const nextState = prevState === 'ON' ? 'OFF' : 'ON'
  
      // Set the action badge to the next state
      await chrome.action.setBadgeText({
        tabId: tab.id,
        text: nextState,
      });    if (nextState === "ON") {
        // 사용자가 이걸 킬 때 css 실행
        await chrome.scripting.insertCSS({
          files: ["focus-mode.css"],
          target: { tabId: tab.id },
        });
      } else if (nextState === "OFF") {
        // 반대로 끄면
        await chrome.scripting.removeCSS({
          files: ["focus-mode.css"],
          target: { tabId: tab.id },
        });
      }
    }
  });