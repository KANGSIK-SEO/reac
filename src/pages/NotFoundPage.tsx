import { Link } from "react-router-dom";
export function NotFoundPage() {
  return (
    <div className="not-found">
      <span>404</span>
      <h1>앗, 페이지를 찾을 수 없어요</h1>
      <p>주소가 잘못되었거나 이동한 페이지일 수 있어요.</p>
      <Link className="button button-primary" to="/tasks">태스크 목록으로 돌아가기</Link>
    </div>
  );
}
