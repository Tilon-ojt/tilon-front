import { useDispatch } from "react-redux";
import "./InsightList.css";
import { OPEN_PAGE, SELECT_INSIGHT } from "../../../reducer/Insight";

function InsightList({ insights }) {
  const dispatch = useDispatch();

  const clickInsight = (insight) => {
    dispatch({ type: SELECT_INSIGHT, payload: insight }); // 선택된 항목 저장
    dispatch({ type: OPEN_PAGE }); // 페이지 열기
  };

  return (
    <div>
      {insights.map((insight) => (
        <div key={insight.id}>
          <div
            className="insight-list"
            onClick={() => clickInsight(insight)} // 클릭 시 데이터 전달
          >
            <p>no.{insight.number}</p>
            <h3>{insight.title}</h3>
            <span>INSIGHT</span>
            <span>|</span>
            <span>{insight.date}</span>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default InsightList;
