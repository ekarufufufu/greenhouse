import PhMonitoringCard from "./PhMonitoringCard";
import ManualSprinklerCard from "./ManualSprinklerCard";
import ScheduleCard from "./ScheduleCard";

export default function Dashboard() {
  return (
    <div className="p-6">
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold">🌱 Dashboard Greenhouse</h1>
        <p className="text-gray-600">Monitoring & Control</p>
      </header>

      <main className="grid gap-6 md:grid-cols-3">
        <PhMonitoringCard />
        <ManualSprinklerCard />
        <ScheduleCard />
      </main>
    </div>
  );
}
