export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-diner-cream">
      <main className="w-full max-w-3xl px-6 py-24 sm:px-12 md:px-24 bg-white shadow-diner rounded-2xl flex flex-col items-center gap-10">
        <h1 className="text-5xl sm:text-6xl md:text-7xl text-diner-coffee font-bold text-center tracking-tight mb-4">
          American Diner Classics
          <br />
          <span className="text-diner-terracotta italic">with a Latin Twist</span>
        </h1>
        <p className="text-xl text-diner-coffee/80 text-center max-w-lg mb-6">A cozy daytime eatery serving breakfast, lunch, and fusion favorites in a space full of color, good vibes, and coffee aroma.</p>
        <div className="flex flex-col md:flex-row gap-6 mb-6 w-full justify-center">
          <a href="/order" className="bg-diner-coffee text-diner-cream rounded-full px-8 py-4 font-semibold shadow hover:bg-diner-terracotta hover:text-white transition-all text-lg">Order Online</a>
          <a href="/menu" className="border-2 border-diner-coffee text-diner-coffee rounded-full px-8 py-4 font-semibold hover:bg-diner-coffee hover:text-diner-cream transition-all text-lg">View Menu</a>
          <a href="/contact" className="border-2 border-diner-terracotta text-diner-terracotta rounded-full px-8 py-4 font-semibold hover:bg-diner-terracotta hover:text-white transition-all text-lg">Visit Us</a>
        </div>
        <div className="flex flex-wrap justify-center gap-8 mt-2">
          <div className="flex items-center gap-2">
            <span className="text-3xl">☕</span>
            <span className="font-medium text-lg">Great Coffee</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-3xl">⚡</span>
            <span className="font-medium text-lg">Fast Service</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-3xl">🎨</span>
            <span className="font-medium text-lg">Local Specialties</span>
          </div>
        </div>
      </main>
    </div>
  );
}
