import GalleryGrid from "./GalleryGrid";

export default function Gallery() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center py-14 bg-diner-cream">
      <h1 className="text-4xl font-bold text-diner-coffee mb-4 text-center">Gallery</h1>
      <p className="text-lg text-diner-coffee/80 max-w-xl text-center mb-6">A peek at our colorful space, comfort food, coffee moments, hand-painted mural, and happy regulars.</p>
      <GalleryGrid />
    </div>
  );
}

