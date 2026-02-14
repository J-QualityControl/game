type Mapping = { boxId: string; labelN: string; rackCode?: string | null };

export function RackMappingTable({ rows }: { rows: Mapping[] }) {
  return (
    <table>
      <thead>
        <tr><th>BOX-ID</th><th>LABEL-N</th><th>Rack</th></tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={`${r.boxId}-${r.labelN}`}>
            <td>{r.boxId}</td>
            <td>{r.labelN}</td>
            <td>{r.rackCode ?? "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
