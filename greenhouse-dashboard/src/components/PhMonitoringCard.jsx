import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";

export default function PhMonitoringCard() {
  const [ph, setPh] = useState(null);
  const [time, setTime] = useState("");

  useEffect(() => {
    const phRef = ref(db, "greenhouse");
    onValue(phRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setPh(data.ph);
        setTime(data.time);
      }
    });
  }, []);

  return (
    <div className="p-4 rounded-2xl shadow bg-white">
      <h2 className="text-xl font-bold">pH Monitoring</h2>
      <p className="mt-2 text-base">Latest pH: {ph ?? "--"}</p>
      <p className="text-sm text-gray-500">Updated: {time}</p>
    </div>
  );
}
