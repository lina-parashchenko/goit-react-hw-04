import "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({ onClick }) {
  return (
    <div className="load-more-wrapper">
      <button className="load-more-button" onClick={onClick}>
        Load more
      </button>
    </div>
  );
}
