import Markdown from 'markdown-it';
import hljs from 'highlight.js';

export default new Markdown(({
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        const retVal = hljs.highlight(lang, str, true).value;
        return `<pre class="hljs"><code>${retVal}</code></pre>`;
      } catch (e) {
        //
      }
    }
    return ''; // use external default escaping
  }
}));
