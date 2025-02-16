import React from "react";
import { MoreVertical } from "lucide-react";
export function InfoButton() {
  return <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100">
      <MoreVertical size={20} className="text-gray-600" />
    </button>;
}