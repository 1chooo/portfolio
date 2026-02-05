import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Loading() {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div className="blog-posts">
        <Skeleton height={50} className="mb-4" />
        <ul className="blog-posts-list">
          {Array.from({ length: 4 }).map((_, index) => (
            <li key={index} className="blog-post-item skeleton">
              <Skeleton height={200} className="blog-banner-skeleton" />
              <div className="blog-content-skeleton">
                <Skeleton width={100} className="mb-2" />
                <Skeleton height={24} className="blog-title-skeleton" />
                <Skeleton count={3} className="blog-summary-skeleton" />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-center mt-4">
        <Skeleton width={200} height={40} className="items-center" />
      </div>
    </SkeletonTheme>
  );
}

export default Loading;
