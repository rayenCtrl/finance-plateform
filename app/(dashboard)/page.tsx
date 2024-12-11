import { SignOutButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <SignOutButton>
      <button className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition">
        Sign Out
      </button>
    </SignOutButton>
  );
}