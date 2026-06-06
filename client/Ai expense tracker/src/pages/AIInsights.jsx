import { useEffect, useState } from "react";

import { getAIReport, getHistory } from "../services/aiService";

export default function AIInsights() {
  const [report, setReport] = useState("");

  const [score, setScore] = useState(0);

  const [cached, setCached] = useState(false);

  const [history, setHistory] = useState([]);

  const [loading, setLoading] = useState(false);

  const generateReport = async () => {
    try {
      setLoading(true);

      const res = await getAIReport();

      setReport(res.data.report);

      setScore(res.data.financialScore);

      setCached(res.data.cached);

      fetchHistory();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await getHistory();

      setHistory(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div>
      <h1>AI Financial Insights</h1>

      <button onClick={generateReport}>
        {loading ? "Generating..." : "Generate Monthly Report"}
      </button>

      {report && (
        <>
          <h2>
            Financial Score:
            {score}/100
          </h2>

          {cached && <p>Using saved monthly report</p>}

          <pre>{report}</pre>
        </>
      )}

      <hr />

      <h2>Previous Reports</h2>

      <table border="1">
        <thead>
          <tr>
            <th>Month</th>

            <th>Year</th>

            <th>Score</th>
          </tr>
        </thead>

        <tbody>
          {history.map((item) => (
            <tr key={item._id}>
              <td>{item.month}</td>

              <td>{item.year}</td>

              <td>{item.financialScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// import { useEffect, useState } from "react";

// import { getAIReport, getHistory } from "../services/aiService";

// export default function AIInsights() {
//   const [report, setReport] = useState("");

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchReport = async () => {
//       try {
//         const res = await getAIReport();

//         setReport(res.data.report);
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReport();
//   }, []);

//   return (
//     <div>
//       <h1>AI Financial Insights</h1>

//       {loading ? <p>Generating Report...</p> : <pre>{report}</pre>}
//     </div>
//   );
// }
