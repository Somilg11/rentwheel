import { motion } from 'framer-motion'

function Hero() {
  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-6xl px-4">
        <div className="flex flex-col md:flex-row items-center justify-center mt-32 sm:mt-10">
          <motion.div 
            className="md:w-1/2 mb-8 md:mb-0 text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
              Drive in Style,<br />
              <span className="text-blue-600">Anytime, Anywhere</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Experience the freedom of the open road with our premium car rental service. From compact cars to luxury SUVs, we&apos;ve got your journey covered.
            </p>
            <a
              href="/vehicles"
              className="inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-full text-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
            >
              Explore Now
            </a>
          </motion.div>
          <motion.div 
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img
              src="./hero.png"
              alt="Luxury car rental"
              width={400}
              height={300}
            //   className="rounded-lg shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero;
