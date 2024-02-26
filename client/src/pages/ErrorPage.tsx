import { useNavigate } from "react-router-dom";
const ErrorPage = () => {
  const navigate = useNavigate();
  const handleRefreshClick = () => navigate("", { replace: true });
  return (
    <main className="grid place-items-center bg-primary-blue/30 h-screen">
      <section className="text-center">
        <h2 className="text-xl text-center text-red-500">
          Error please try again
        </h2>
        <button
          type="button"
          className="bg-green-500 py-1 inline-block mt-2 rounded text-white w-[120px] self-end hover:bg-green-600 transition-all duration-300 cursor-pointer"
          onClick={handleRefreshClick}
        >
          Refresh Page
        </button>
      </section>
    </main>
  );
};
export default ErrorPage;
