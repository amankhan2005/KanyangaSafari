import { useEffect } from "react";
import { brand } from "@/data/site";

/** Sets a unique document title and meta description for each page. */
export function usePageMeta(title: string, description: string, { absolute = false } = {}) {
  useEffect(() => {
    document.title = absolute ? title : `${title} — ${brand.name}`;
    let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!tag) {
      tag = document.createElement("meta");
      tag.name = "description";
      document.head.appendChild(tag);
    }
    tag.content = description;
  }, [title, description, absolute]);
}
