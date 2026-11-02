export function BookCover({ src, title }: { src?: string; title: string }) {

  if (!src) {
    return (
      <div
        style={{
          width: '85%',
          height: 260,
          display: 'grid',
          placeItems: 'center',
          textAlign: 'center',
          background: '#e5e7eb',
          color: '#6b7280',
          borderRadius: 4,
          fontSize: 14,
        }}
      >
        {title}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={`Cover of ${title}`}
      style={{ width: '100%', height: 260 }}
    />
  )
}