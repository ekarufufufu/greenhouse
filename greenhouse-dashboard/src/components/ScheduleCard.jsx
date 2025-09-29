import { useEffect, useState } from "react";
import { db } from "../firebase";
import { ref, onValue, set, update } from "firebase/database";

export default function ScheduleCard() {
  const [enabled, setEnabled] = useState(false);
  const [startTime, setStartTime] = useState("06:00");
  const [endTime, setEndTime] = useState("07:15");

  // Ambil data dari Firebase
  useEffect(() => {
    const scheduleRef = ref(db, "greenhouse/schedule");
    onValue(scheduleRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setEnabled(data.enabled ?? false);
        setStartTime(data.startTime ?? "06:00");
        setEndTime(data.endTime ?? "07:15");
      }
    });
  }, []);

  // Update ke Firebase
  const saveSchedule = () => {
    update(ref(db, "greenhouse/schedule"), {
      enabled,
      startTime,
      endTime,
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-4 w-full">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
        Jadwal Sprinkler
      </h2>

      {/* Enable toggle */}
      <div className="flex items-center space-x-2 mt-2">
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => setEnabled(e.target.checked)}
        />
        <span className="text-gray-700 dark:text-gray-200">Tetapkan Jadwal</span>
      </div>

      {/* Input waktu */}
      <div className="flex flex-col mt-3 space-y-2">
        <label className="text-gray-700 dark:text-gray-200">
          Mulai:
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="ml-2 px-2 py-1 border rounded-lg"
          />
        </label>
        <label className="text-gray-700 dark:text-gray-200">
          Selesai:
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="ml-2 px-2 py-1 border rounded-lg"
          />
        </label>
      </div>

      {/* Save button */}
      <button
        onClick={saveSchedule}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        Simpan Jadwal
      </button>
    </div>
  );
}
