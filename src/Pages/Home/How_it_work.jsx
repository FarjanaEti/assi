import Lottie from "lottie-react";
import lottieAnimation1 from "../../assets/Animation - 1737625402201.json";
import lottieAnimation2 from "../../assets/Animation - 1737625588591.json";
import lottieAnimation3 from "../../assets/Animation - 1737625677961.json";

const How_it_work = () => {
  return (
    <div className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        {/* Section Header */}
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          How It Works
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Earn money in just three simple steps. It’s easy to get started!
        </p>
      </div>

      {/* Steps */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* Step 1 */}
        <div className="flex flex-col items-center text-center bg-white shadow-lg rounded-lg p-6">
          <div>
          <Lottie className="h-32" animationData={lottieAnimation1} loop autoplay />
          </div>
          <h3 className="mt-4 text-xl font-semibold text-gray-900">Sign Up</h3>
          <p className="mt-2 text-gray-600">
            Create your free account in just a few minutes and get started.
          </p>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center text-center bg-white shadow-lg rounded-lg p-6">
        <div>
          <Lottie className="h-32" animationData={lottieAnimation2} loop autoplay />
          </div>
          <h3 className="mt-4 text-xl font-semibold text-gray-900">
            Browse Tasks
          </h3>
          <p className="mt-2 text-gray-600">
            Pick tasks that match your skills and interests from our list.
          </p>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center text-center bg-white shadow-lg rounded-lg p-6">
        <div>
          <Lottie className="h-32" animationData={lottieAnimation3} loop autoplay />
          </div>
          <h3 className="mt-4 text-xl font-semibold text-gray-900">Get Paid</h3>
          <p className="mt-2 text-gray-600">
            Complete tasks, submit them for approval, and withdraw your earnings.
          </p>
        </div>
      </div>

      {/* Call-to-Action */}
      <div className="mt-12 text-center">
        <a
          href="/register"
          className="inline-block px-6 py-3 bg-cyan-300 text-white text-lg font-medium rounded-lg shadow-md hover:bg-blue-700"
        >
          Get Started Now
        </a>
      </div>
    </div>
  );
};

export default How_it_work;
