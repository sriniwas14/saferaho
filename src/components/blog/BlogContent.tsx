import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import rehypeSlug from "rehype-slug"

export function BlogContent({ content }: { content: string }) {
  return (
    <div className="prose prose-lg max-w-none prose-headings:text-saferaho-navy prose-a:text-saferaho-blue prose-strong:text-saferaho-navy">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug, rehypeHighlight]}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
