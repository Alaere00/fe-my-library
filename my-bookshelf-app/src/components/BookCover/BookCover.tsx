export function BookCover({ src, title }: { src?: string; title: string }) {

  if (!src) {
    return (
      <div
        className="book-cover-fallback"
      >
        {title}
      </div>
    )
  }

  return (
    <img
      className="book-cover-image"
      src={src}
      alt={`Cover of ${title}`}
    />
  )
}