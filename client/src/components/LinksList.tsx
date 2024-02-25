import { Link } from "react-router-dom";
import LinkCard from "./LinkCard";
const LinksList = ({ links }: { links: Link[] }) => {
  return (
    <div className="mt-5 w-[80%] mx-auto ">
      {links.length > 0 ? (
        <ul className="flex flex-col gap-2 ">
          {links?.map((link: Link) => (
            <LinkCard link={link} key={link.id} />
          ))}
        </ul>
      ) : (
        <div className="text-center">
          <h2 className="text-xl">Links empty</h2>
          <Link to="/create" className="underline">
            Create new
          </Link>
        </div>
      )}
    </div>
  );
};
export default LinksList;
