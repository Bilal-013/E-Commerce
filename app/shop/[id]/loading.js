export default function Loading() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto animate-pulse">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          <div className="aspect-[4/5] bg-gray-200 rounded-xl"></div>

          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            
            <div className="space-y-4 mb-10">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>

            <div className="h-12 bg-gray-200 rounded w-full mb-12"></div>
            
            <div className="h-40 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
