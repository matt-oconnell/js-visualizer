import Markdown from 'markdown-it';
import hljs from 'highlight.js';

const md = new Markdown(({
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        const retVal = hljs.highlight(lang, str, true).value;
        return `<pre class="hljs"><code>${retVal}</code></pre>`;
      } catch (e) { /**/ }
    }
    return '';
  }
}));

export default (code) => {
  const wrappedCode = `\`\`\`js
${code}`;
  return md.render(wrappedCode);
};
