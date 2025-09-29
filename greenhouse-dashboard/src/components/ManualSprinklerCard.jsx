import { useEffect, useState } from "react";
import { db } from "../firebase";
import { ref, onValue, set } from "firebase/database";

export default function ManualSprinklerCard() {
  const [relay, setRelay] = useState("OFF");

  useEffect(() => {
    const relayRef = ref(db, "greenhouse/relay");
    onValue(relayRef, (snapshot) => {
      setRelay(snapshot.val());
    });
  }, []);

  const toggleRelay = () => {
    const newStatus = relay === "ON" ? "OFF" : "ON";
    set(ref(db, "greenhouse/relay"), newStatus);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-4 w-full">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
        Sprinkler Manual
      </h2>
      <p className="text-gray-600 dark:text-gray-300">
        Status:{" "}
        <span
          className={`font-bold ${
            relay === "ON" ? "text-green-500" : "text-red-500"
          }`}
        >
          {relay}
        </span>
      </p>
      <button
        onClick={toggleRelay}
        className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        {relay === "ON" ? "Turn OFF" : "Turn ON"}
      </button>
    </div>
  );
}
