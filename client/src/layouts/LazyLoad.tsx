import { lazy, Suspense } from "react";
import LoadingPage from "../components/LoadingPage";
const LazyLoad = ({ pageName }: { pageName: string }) => {
  const LazyLoadPage = lazy(
    async () => await import(/* @vite-ignore */ `${pageName}.tsx`)
  );
  return (
    <Suspense fallback={<LoadingPage />}>
      <LazyLoadPage />
    </Suspense>
  );
};
export default LazyLoad;
