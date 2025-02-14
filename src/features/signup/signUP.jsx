export default function SignUp() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white shadow-2xl rounded-lg p-8 w-96 flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Sign Up
        </h2>

        {/* Name Input */}
        <input
          type="text"
          placeholder="Full Name..."
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        {/* Email Input */}
        <input
          type="email"
          placeholder="Enter email..."
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Create Password..."
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        {/* Confirm Password Input */}
        <input
          type="password"
          placeholder="Confirm Password..."
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        {/* Sign Up Button */}
        <button className="w-full bg-indigo-500 text-white py-2 rounded-md shadow-md hover:bg-indigo-600 transition-all">
          Sign Up
        </button>

        {/* Redirect to Sign In */}
        <p className="text-sm text-center text-indigo-500">
          Already have an account?
          <a href="/" className="hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
