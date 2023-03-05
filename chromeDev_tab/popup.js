const tabs = await chrome.tabs.query({
    url: [
      "https://developer.chrome.com/docs/webstore/*",
      "https://developer.chrome.com/docs/extensions/*",
    ],
  }); 
  const collator = new Intl.Collator();
  // 탭 이름을 오름차순 정렬
tabs.sort((a, b) => collator.compare(a.title, b.title));

const template = document.getElementById("li_template");
// 탬플레이트 하나 추가
const elements = new Set();
for (const tab of tabs) { // tabs 틀에서 나온 tab
  const element = template.content.firstElementChild.cloneNode(true);

  const title = tab.title.split("-")[0].trim(); // - 를 기준으로 앞에 있는 단어를 가져옴(인접한 공백도 지움)

  const pathname = new URL(tab.url).pathname.slice("/docs".length);
  // docs 문구 뒤에 오는 문장

  element.querySelector(".title").textContent = title; // 제목(타이틀 이름)
  element.querySelector(".pathname").textContent = pathname; // 부제목(주소)
  element.querySelector("a").addEventListener("click", async () => { // a 태그를 누르면 그 창/탭으로 이동함
    // 창과 활성 탭에 초점
    await chrome.tabs.update(tab.id, { active: true });
    await chrome.windows.update(tab.windowId, { focused: true });
  });

  elements.add(element);
}
document.querySelector("ul").append(...elements);
const button = document.querySelector("button"); // 버튼
button.addEventListener("click", async () => {
  const tabIds = tabs.map(({ id }) => id); // 아이디 추출
  const group = await chrome.tabs.group({ tabIds }); // 그룹으로 묶음
  await chrome.tabGroups.update(group, { title: "DOCS" }); // 그룹으로 묶음(그룸 이름 : DOCS)
});