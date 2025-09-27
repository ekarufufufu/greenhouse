import { useEffect, useState } from "react";
import { db } from "../firebase";
import { ref, onValue, set } from "firebase/database";

export default function ManualSprinklerCard() {
  const [status, setStatus] = useState("OFF");

  useEffect(() => {
    const relayRef = ref(db, "greenhouse/relay");
    onValue(relayRef, (snapshot) => {
      if (snapshot.exists()) {
        setStatus(snapshot.val());
      }
    });
  }, []);

  const toggleSprinkler = () => {
    const newStatus = status === "ON" ? "OFF" : "ON";
    set(ref(db, "greenhouse/relay"), newStatus);
  };

  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-4">Manual Sprinkler</h2>
      <div className="card-content">
        <button
          onClick={toggleSprinkler}
          className={`w-full py-2 rounded-lg font-medium transition ${
            status === "ON"
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-gray-500 hover:bg-gray-600 text-white"
          }`}
        >
          {status === "ON" ? "Turn OFF" : "Turn ON"}
        </button>
        <p className="mt-2 text-sm opacity-75">Current: {status}</p>
      </div>
    </div>
  );
}
