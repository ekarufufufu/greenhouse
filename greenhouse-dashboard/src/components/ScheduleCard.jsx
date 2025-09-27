import { useState } from "react";
import { ref, set } from "firebase/database";
import { db } from "../firebase";

export default function ScheduleCard() {
  const [start, setStart] = useState("06:00");
  const [end, setEnd] = useState("06:15");
  const [enabled, setEnabled] = useState(false);

  const saveSchedule = () => {
    set(ref(db, "greenhouse/schedule"), {
      enabled,
      startTime: start,
      endTime: end,
    });
  };

  return (
    <div className="p-4 rounded-2xl shadow bg-white">
      <h2 className="text-xl font-bold">Sprinkler Schedule</h2>

      <div className="mt-2">
        <label className="block text-sm">Start Time</label>
        <input
          type="time"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          className="border rounded p-1"
        />
      </div>

      <div className="mt-2">
        <label className="block text-sm">End Time</label>
        <input
          type="time"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          className="border rounded p-1"
        />
      </div>

      <div className="mt-2 flex items-center gap-2">
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => setEnabled(e.target.checked)}
        />
        <span>Enable Schedule</span>
      </div>

      <button
        onClick={saveSchedule}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow"
      >
        Save
      </button>
    </div>
  );
}
