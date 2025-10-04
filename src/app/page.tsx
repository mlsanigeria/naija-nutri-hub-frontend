import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#222222] px-4">
      <main className="w-full max-w-md text-center">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Take a picture of your food, Learn it. Make it.</h1>
        </header>
        <div className="space-y-4">
          <Link 
            href="/signup" 
            className="block w-full bg-[#FF7A50] hover:bg-[#FF7A50]/90 text-white py-3 px-6 rounded-md text-center font-medium transition-colors"
          >
            Sign up
          </Link>
          <Link 
            href="/login" 
            className="block w-full border border-[#444444] text-white hover:bg-[#444444] py-3 px-6 rounded-md text-center font-medium transition-colors"
          >
            Log in
          </Link>
        </div>
      </main>
    </div>
  );
}
