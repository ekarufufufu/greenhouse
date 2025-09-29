import { useEffect, useState } from "react";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";

export default function PhMonitoringCard() {
  const [ph, setPh] = useState(null);
  const [time, setTime] = useState(null);

  useEffect(() => {
    const phRef = ref(db, "greenhouse/ph");
    const timeRef = ref(db, "greenhouse/time");

    onValue(phRef, (snapshot) => {
      setPh(snapshot.val());
    });

    onValue(timeRef, (snapshot) => {
      setTime(snapshot.val());
    });
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-4 w-full">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
        Monitoring pH
      </h2>
      <p className="text-gray-600 dark:text-gray-300">
        pH: <span className="font-bold">{ph ? ph.toFixed(2) : "..."}</span>
      </p>
      <p className="text-gray-600 dark:text-gray-300">
        Terakhir Update: <span className="font-mono">{time || "..."}</span>
      </p>
    </div>
  );
}
