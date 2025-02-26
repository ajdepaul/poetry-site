import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import { marked, RendererObject } from 'marked';

const window = new JSDOM('').window;
const purify = DOMPurify(window);

const renderer: RendererObject = {
  link: (href, title, text) => {
    return `<a href=${href} class="underline"${title ? ` title="${title}"` : ''}>${text}</a>`;
  },
  listitem: (text, task, checked) => {
    return `<li>- ${text}</li>`;
  }
};

marked.use({ renderer });

export async function renderMarkdown(dirtyMarkdown: string) {
  return purify.sanitize(await marked.parse(dirtyMarkdown));
}
