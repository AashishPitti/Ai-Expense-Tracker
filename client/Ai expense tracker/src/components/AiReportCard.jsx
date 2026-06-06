export default function AIReportCard({ report }) {
  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid gray",
      }}
    >
      <h2>AI Report</h2>

      <pre>{report}</pre>
    </div>
  );
}
