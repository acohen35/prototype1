import React from "react";
import { X } from "lucide-react";
interface ScheduleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  stopName: string;
}
const SCHEDULE_TIMES = ["5:30 AM", "6:00 AM", "6:30 AM", "7:00 AM", "7:30 AM", "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM"];
export function ScheduleDialog({
  isOpen,
  onClose,
  stopName
}: ScheduleDialogProps) {
  if (!isOpen) return null;
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-bold text-lg">{stopName}</h2>
          <button onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <div style={{
        height: "calc(7.5 * 48px)"
      }} className="overflow-y-auto">
          <table className="w-full">
            <tbody>
              {SCHEDULE_TIMES.map((time, index) => <tr key={time} className={index % 2 === 0 ? "bg-[#0B4EA2]" : "bg-white"}>
                  <td className={`py-3 px-4 ${index % 2 === 0 ? "text-white" : "text-black"}`}>
                    {time}
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>;
}