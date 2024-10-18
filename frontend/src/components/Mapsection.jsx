export default function MapSection() {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left side: Map Image */}
            <div className="md:w-1/2 w-full flex justify-center">
              <img
                src="/earth.png"  // Replace this with your actual map image source
                alt="Map Location"
                className="object-cover w-full h-auto md:w-[400px] sm:h-[400px]"
              />
            </div>
  
            {/* Right side: Information */}
            <div className="md:w-1/2 w-full">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Find Us Anywhere!
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                With car rental services available in multiple locations, we make sure you can find a ride wherever you are.
                Whether you&apos;re planning a road trip or need a car for business, our locations are spread across major cities and towns, making it easier for you to drive in style.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                Our rental points are conveniently located near airports, downtowns, and travel hubs. Look for us at your destination and start your journey with confidence.
              </p>
              <p className="text-lg text-gray-700">
                Check the map for available car rental stations near you, or use our search tool to find the nearest location for your next ride.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
  