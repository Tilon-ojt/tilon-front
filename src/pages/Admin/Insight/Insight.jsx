import InsightList from "./InsightList";
import "./Insight.css";
import { useSelector } from "react-redux";
import InsightPage from "./InsightPage";

function Insight() {
  const insights = [
    { id: 1, number: "12345", title: "TitleTitleTitleTitle", date: "2024-12-04 오전 11:36" },
    { id: 2, number: "67890", title: "Another Title", date: "2024-12-05 오후 2:20" },
    // 추가 데이터
  ];

  const isShow = useSelector((state) => state.insightPage.insightShow);

  return (
    <div className="insight-container">
      <h1>INSIGHT</h1>
      <hr />
      {isShow ? <InsightPage /> : <InsightList insights={insights} />}
    </div>
  );
}

export default Insight;
