export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-flex items-center gap-1.5 mb-4">
          <div className="w-2 h-2 bg-[#a749ff] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-[#a749ff] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-[#a749ff] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
        <p className="text-[14px] text-[#555]">Loading...</p>
      </div>
    </div>
  )
}
