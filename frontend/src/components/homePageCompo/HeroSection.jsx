import { Link } from "react-router-dom";
import Heading from "./HeadingComponent";
export default function HeroComponent(){
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background (looping & muted) */}
        <video
          autoPlay
          loop
          muted
          className=" absolute z-0 w-auto min-w-full min-h-full max-w-none object-cover"
        >
          <source
            src="https://videos.pexels.com/video-files/1448735/1448735-uhd_2732_1440_24fps.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* Content (centered with semi-transparent overlay) */}
        <div className="absolute inset-0  bg-opacity-40 z-10"></div>

        <div className="relative z-20 text-center px-4 text-white">
          {/* Heading Here */}
          <Heading/>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Join our movement to promote clean energy, reduce waste, and create
            a greener planet for future generations.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/get-involved"
              className="  px-6 py-3 text-red-200 bg-green-500 hover:bg-green-600 rounded-lg text-lg font-semibold transition-colors"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              Get Involved
            </Link>
            <Link
              to="/help-form"
              className="px-6 py-3 bg-gray-100 hover:bg-gray-300 rounded-lg text-lg font-semibold transition-colors"
              style={{
                color: "green",
                textDecoration: "none",
              }}
            >
              Need Help ?? 
            </Link>
          </div>
        </div>
      </section>
    )
}