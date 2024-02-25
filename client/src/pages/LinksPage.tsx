import { useQuery } from "@tanstack/react-query";
import LinksList from "../components/LinksList";
import { useHttp } from "../hooks/use.http";
const LinksPage = () => {
  const { request } = useHttp();
  const { data, isLoading } = useQuery({
    queryKey: ["links"],
    queryFn: () => request("links", "GET"),
  });
  return (
    <section className="py-2 flex-grow flex flex-col">
      <div className="container mx-auto">
        {!isLoading && <LinksList links={data?.links} />}
      </div>
    </section>
  );
};
export default LinksPage;
