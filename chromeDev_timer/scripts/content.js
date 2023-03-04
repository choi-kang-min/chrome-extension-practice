const article = document.querySelector("article");
// .HTML 파일 안에 article 태그가 있어야 함
if (article) {
  const text = article.textContent;
  const wordMatchRegExp = /[^\s]+/g; // Regular expression
  const words = text.matchAll(wordMatchRegExp);
  console.log(words);
  // matchAll returns an iterator, convert to array to get word count
  const wordCount = [...words].length;
  console.log(wordCount);
  const readingTime = Math.round(wordCount / 200);

  console.log(readingTime);
  const badge = document.createElement("p");
  // article 태그 안에 p 태그를 만들어 내용을 출력함
  badge.classList.add("color-secondary-text", "type--caption");
  badge.textContent = `${readingTime} min read`;

  // Support for API reference docs
  const heading = article.querySelector("h1");
  // Support for article docs with date
  const date = article.querySelector("time")?.parentNode;

  (date ?? heading).insertAdjacentElement("afterend", badge);
}