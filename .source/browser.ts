// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"changelog.mdx": () => import("../content/docs/changelog.mdx?collection=docs"), "faq.mdx": () => import("../content/docs/faq.mdx?collection=docs"), "index.mdx": () => import("../content/docs/index.mdx?collection=docs"), "langganan.mdx": () => import("../content/docs/langganan.mdx?collection=docs"), "panduan/index.mdx": () => import("../content/docs/panduan/index.mdx?collection=docs"), "perintah/admin/index.mdx": () => import("../content/docs/perintah/admin/index.mdx?collection=docs"), "perintah/boombox/index.mdx": () => import("../content/docs/perintah/boombox/index.mdx?collection=docs"), "perintah/engagement/index.mdx": () => import("../content/docs/perintah/engagement/index.mdx?collection=docs"), "perintah/marketplace/index.mdx": () => import("../content/docs/perintah/marketplace/index.mdx?collection=docs"), "perintah/roleplay/index.mdx": () => import("../content/docs/perintah/roleplay/index.mdx?collection=docs"), "perintah/scripter/index.mdx": () => import("../content/docs/perintah/scripter/index.mdx?collection=docs"), "perintah/security/index.mdx": () => import("../content/docs/perintah/security/index.mdx?collection=docs"), }),
};
export default browserCollections;