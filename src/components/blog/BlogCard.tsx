import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { BlogPost } from "@/lib/blog"

export function BlogCard({
  post,
  basePath = "/blog",
}: {
  post: BlogPost
  basePath?: string
}) {
  return (
    <Link href={`${basePath}/${post.slug}`}>
      <Card className="overflow-hidden card-white hover:shadow-lg transition-shadow duration-300">
        <div className="relative aspect-[3/2] w-full">
          <img
            src={post.heroImage}
            alt={post.title}
            className="object-cover w-full h-full"
          />
          <Badge className="absolute top-3 left-3 bg-saferaho-blue">
            {post.category}
          </Badge>
        </div>
        <div className="p-6">
          <p className="text-sm text-saferaho-gray mb-2">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <h3 className="text-xl font-semibold mb-2 line-clamp-2">{post.title}</h3>
          <p className="text-saferaho-gray text-sm line-clamp-3">{post.excerpt}</p>
        </div>
      </Card>
    </Link>
  )
}
