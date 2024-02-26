import { useQuery } from "@tanstack/react-query";
import LinksList from "../components/LinksList";
import { useHttp } from "../hooks/use.http";
import { Link } from "react-router-dom";
const LinksPage = () => {
  const { get } = useHttp();
  const { data, isLoading } = useQuery({
    queryKey: ["links"],
    queryFn: () => get("links"),
  });
  return (
    <section className="py-2 flex-grow flex flex-col">
      <div className="container mx-auto">
        {!isLoading && data?.links?.length > 0 ? (
          <LinksList links={data?.links} />
        ) : (
          <div className="text-center">
            <h2 className="text-2xl mt-2">Links Empty</h2>
            <Link to="/create" className="text-lg hover:underline">
              Create New
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
export default LinksPage;
