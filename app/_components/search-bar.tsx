import { Search } from "lucide-react";

export function SearchBar() {
  return (
    <div className="flex items-center gap-3 bg-white border border-gray-300 rounded-lg px-4 py-3 shadow-sm">
      
      {/* Icon */}
      <Search className="w-5 h-5 text-gray-400" />

      {/* Input */}
      <input
        type="text"
        placeholder="Search by city, attraction, or interest"
        className="flex-1 outline-none text-gray-700 placeholder-gray-400"
      />
    </div>
  );
}
