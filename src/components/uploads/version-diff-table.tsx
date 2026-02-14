export type VersionDiff = {
  addedCount: number;
  removedCount: number;
  changedCount: number;
  mappingChangedCount: number;
};

export function VersionDiffTable({ diff }: { diff: VersionDiff | null }) {
  if (!diff) return <p>No diff loaded.</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>Added</th>
          <th>Removed</th>
          <th>Changed</th>
          <th>Mapping Changed</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{diff.addedCount}</td>
          <td>{diff.removedCount}</td>
          <td>{diff.changedCount}</td>
          <td>{diff.mappingChangedCount}</td>
        </tr>
      </tbody>
    </table>
  );
}
