import { useEffect, useState } from "react";

import { getAIReport } from "../services/aiService";

export default function AIInsights() {
  const [report, setReport] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await getAIReport();

        setReport(res.data.report);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  return (
    <div>
      <h1>AI Financial Insights</h1>

      {loading ? <p>Generating Report...</p> : <pre>{report}</pre>}
    </div>
  );
}
