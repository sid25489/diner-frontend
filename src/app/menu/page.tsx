import dynamic from "next/dynamic";

const MenuGrid = dynamic(() => import("./MenuGrid"), { ssr: false });

export default function Menu() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center pt-12 pb-24">
      <h1 className="text-4xl font-bold text-diner-coffee mb-3">Menu</h1>
      <p className="text-base text-diner-coffee/80 mb-8 text-center max-w-xl">Discover our American classics and Latin favorites, great coffee, cocktails, and more. <span className='font-semibold'>All items available until 3PM.</span></p>
      <MenuGrid />
    </div>
  );
}

