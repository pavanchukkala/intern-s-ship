"use client";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="relative mb-4">
      <Input
        type="text"
        placeholder="Search for internships..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10 pr-4 py-2 w-full border rounded-xl text-sm"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2" size={20} />
    </div>
  );
}
