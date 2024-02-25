import { Link } from "react-router-dom";
const PageNotFound = () => {
  return (
    <section className="text-center">
      <h2 className="text-xl  pt-5">PageNotFound 404</h2>
      <Link to="/" className="inline-block mt-1">
        Back
      </Link>
    </section>
  );
};
export default PageNotFound;
