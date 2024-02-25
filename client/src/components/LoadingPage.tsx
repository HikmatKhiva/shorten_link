const LoadingPage = () => {
  return (
    <div className="fixed h-screen w-screen top-0 left-0 z-50 grid place-items-center bg-primary-blue/10">
      <span className="w-10 h-10 border rounded-full border-primary-blue border-t-transparent animate-spin inline-block"></span>
    </div>
  );
};

export default LoadingPage;
