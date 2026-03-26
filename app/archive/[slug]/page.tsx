import Link from "next/link"
import { ArrowLeft, Heart, Calendar, ArrowRight } from "lucide-react"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"

interface LetterData {
  title: string
  date: string
  content: string
}

function getLetter(slug: string): LetterData | null {
  const lettersDirectory = path.join(process.cwd(), "letters")
  const filePath = path.join(lettersDirectory, `${slug}.md`)
  
  if (!fs.existsSync(filePath)) {
    return null
  }
  
  const fileContents = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(fileContents)
  
  return {
    title: data.title || slug.replace(/-/g, " "),
    date: data.date || "No date",
    content,
  }
}

function getAllLetterSlugs(): string[] {
  const lettersDirectory = path.join(process.cwd(), "letters")
  
  if (!fs.existsSync(lettersDirectory)) {
    return []
  }
  
  const files = fs.readdirSync(lettersDirectory)
  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(".md", ""))
}

export async function generateStaticParams() {
  const slugs = getAllLetterSlugs()
  return slugs.map((slug) => ({ slug }))
}

export default async function LetterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const letter = getLetter(slug)
  
  if (!letter) {
    notFound()
  }
  
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link 
            href="/archive"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Archive</span>
          </Link>
          <Heart className="w-5 h-5 text-primary" />
        </div>
      </header>
      
      {/* Letter Content */}
      <article className="max-w-3xl mx-auto px-6 py-16">
        {/* Letter Header */}
        <header className="text-center mb-12 pb-12 border-b border-border/30">
          <div className="flex items-center justify-center gap-2 text-primary text-sm mb-4">
            <Calendar className="w-4 h-4" />
            <time>{letter.date}</time>
          </div>
          <h1 className="font-serif text-3xl md:text-5xl font-light text-foreground text-balance leading-tight">
            {letter.title}
          </h1>
        </header>
        
        {/* Letter Body - Rich Text */}
        <div className="prose prose-lg max-w-none
          prose-headings:font-serif prose-headings:font-light prose-headings:text-foreground
          prose-h1:text-4xl prose-h1:mb-8 prose-h1:mt-12
          prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-10
          prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-8
          prose-p:text-foreground/80 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg
          prose-strong:text-foreground prose-strong:font-semibold
          prose-em:text-primary prose-em:font-serif prose-em:text-xl
          prose-blockquote:border-l-4 prose-blockquote:border-primary/50 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-muted-foreground prose-blockquote:font-serif prose-blockquote:text-xl
          prose-ul:text-foreground/80 prose-ul:space-y-2
          prose-ol:text-foreground/80 prose-ol:space-y-2
          prose-li:text-lg
          prose-hr:border-border/30 prose-hr:my-12
          prose-a:text-primary prose-a:no-underline hover:prose-a:underline
        ">
          <ReactMarkdown
            components={{
              // Custom rendering for specific elements
              p: ({ children }) => (
                <p className="text-foreground/80 leading-relaxed mb-6 text-lg">{children}</p>
              ),
              h1: ({ children }) => (
                <h1 className="font-serif text-4xl font-light text-foreground mb-8 mt-12">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="font-serif text-3xl font-light text-foreground mb-6 mt-10">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="font-serif text-2xl font-light text-foreground mb-4 mt-8">{children}</h3>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-primary/50 pl-6 italic text-muted-foreground font-serif text-xl my-8">
                  {children}
                </blockquote>
              ),
              strong: ({ children }) => (
                <strong className="text-foreground font-semibold">{children}</strong>
              ),
              em: ({ children }) => (
                <em className="text-primary font-serif not-italic">{children}</em>
              ),
              hr: () => (
                <hr className="border-border/30 my-12" />
              ),
              ul: ({ children }) => (
                <ul className="space-y-3 my-6 text-foreground/80">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="space-y-3 my-6 text-foreground/80 list-decimal list-inside">{children}</ol>
              ),
              li: ({ children }) => (
                <li className="text-lg flex items-start gap-2">
                  <Heart className="w-4 h-4 text-primary mt-1.5 flex-shrink-0" />
                  <span>{children}</span>
                </li>
              ),
            }}
          >
            {letter.content}
          </ReactMarkdown>
        </div>
        
        {/* Letter Footer */}
        <footer className="mt-16 pt-12 border-t border-border/30 text-center">
          <p className="text-muted-foreground font-serif text-xl italic mb-6">
            Forever yours
          </p>
          <div className="flex items-center justify-center gap-1 text-primary">
            <Heart className="w-5 h-5 fill-primary" />
            <Heart className="w-6 h-6 fill-primary" />
            <Heart className="w-5 h-5 fill-primary" />
          </div>
        </footer>
      </article>
      
      {/* Navigation */}
      <div className="max-w-3xl mx-auto px-6 pb-16">
        <Link 
          href="/archive"
          className="flex items-center justify-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <span>Read more letters</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </main>
  )
}
