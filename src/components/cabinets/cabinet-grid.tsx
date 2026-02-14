type Slot = { row: number; col: number; status: string; labelN?: string; boxId?: string };

export function CabinetGrid({ slots }: { slots: Slot[] }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Row</th>
          <th>Col</th>
          <th>Status</th>
          <th>Label</th>
          <th>Box</th>
        </tr>
      </thead>
      <tbody>
        {slots.map((slot) => (
          <tr key={`${slot.row}-${slot.col}`}>
            <td>{slot.row}</td>
            <td>{slot.col}</td>
            <td>{slot.status}</td>
            <td>{slot.labelN ?? "-"}</td>
            <td>{slot.boxId ?? "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
