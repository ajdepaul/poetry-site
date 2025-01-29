import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import { marked, RendererObject } from 'marked';

const window = new JSDOM('').window;
const purify = DOMPurify(window);

const renderer: RendererObject = {
  link: (href, title, text) => {
    return `<a href=${href} class="underline"${title ? ` title="${title}"` : ''}>${text}</a>`;
  }
};

marked.use({ renderer });

export async function renderMarkdown(dirtyMarkdown: string) {
  return purify.sanitize(await marked.parse(dirtyMarkdown));
}
