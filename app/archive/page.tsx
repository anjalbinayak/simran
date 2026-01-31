import Link from "next/link"
import { ArrowLeft, Heart, Calendar, FileText } from "lucide-react"
import fs from "fs"
import path from "path"
import matter from "gray-matter"

interface Letter {
  slug: string
  title: string
  date: string
  excerpt?: string
}

function getLetters(): Letter[] {
  const lettersDirectory = path.join(process.cwd(), "letters")
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(lettersDirectory)) {
    fs.mkdirSync(lettersDirectory, { recursive: true })
    return []
  }
  
  const files = fs.readdirSync(lettersDirectory)
  const mdFiles = files.filter((file) => file.endsWith(".md"))
  
  const letters = mdFiles.map((filename) => {
    const filePath = path.join(lettersDirectory, filename)
    const fileContents = fs.readFileSync(filePath, "utf8")
    const { data, content } = matter(fileContents)
    
    // Get first 100 chars of content as excerpt
    const excerpt = content.replace(/[#*_`]/g, "").slice(0, 100).trim() + "..."
    
    return {
      slug: filename.replace(".md", ""),
      title: data.title || filename.replace(".md", "").replace(/-/g, " "),
      date: data.date || "No date",
      excerpt,
    }
  })
  
  // Sort by date, newest first
  return letters.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export default function ArchivePage() {
  const letters = getLetters()
  
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link 
            href="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <Heart className="w-5 h-5 text-primary" />
        </div>
      </header>
      
      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">Our Collection</p>
          <h1 className="font-serif text-4xl md:text-6xl font-light text-foreground mb-4">
            Love Letters Archive
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Every letter is a piece of my heart, written just for you
          </p>
        </div>
        
        {letters.length === 0 ? (
          <div className="text-center py-20">
            <FileText className="w-16 h-16 text-muted-foreground/30 mx-auto mb-6" />
            <p className="text-muted-foreground text-lg mb-2">No letters yet</p>
            <p className="text-muted-foreground/70 text-sm">
              Add markdown files to the /letters folder to see them here
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {letters.map((letter, index) => (
              <Link
                key={letter.slug}
                href={`/archive/${letter.slug}`}
                className="block group"
              >
                <article 
                  className="bg-card border border-border/50 rounded-2xl p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h2 className="font-serif text-xl md:text-2xl text-foreground group-hover:text-primary transition-colors mb-2">
                        {letter.title}
                      </h2>
                      {letter.excerpt && (
                        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                          {letter.excerpt}
                        </p>
                      )}
                      <div className="flex items-center gap-2 text-muted-foreground/70 text-sm">
                        <Calendar className="w-4 h-4" />
                        <time>{letter.date}</time>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <Heart className="w-4 h-4 text-primary" />
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
