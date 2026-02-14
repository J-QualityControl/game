export function HistoryTimeline({ events }: { events: Array<{ id: string; eventType: string; eventTime: string }> }) {
  if (events.length === 0) return <p>No history found.</p>;
  return (
    <ol>
      {events.map((e) => (
        <li key={e.id}>{e.eventTime}: {e.eventType}</li>
      ))}
    </ol>
  );
}
