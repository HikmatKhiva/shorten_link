import { useState } from "react";
import { FaLink, FaEye } from "react-icons/fa6";
import { CiCalendarDate } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useHttp } from "../hooks/use.http";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
const LinkCard = ({ link }: { link: Link }) => {
  const client = useQueryClient();
  const [linkCode, setLinkCode] = useState<string>("");
  const { deleteLink } = useHttp();
  const handleDelete = async (id: number) => {
    const response = await deleteLink("links/" + id);
    toast.success(response?.message);
    await client.invalidateQueries({ queryKey: ["links"] });
  };
  const handleCopy = (url: Link) => {
    setLinkCode(url.link_code);
    if (navigator) return navigator.clipboard.writeText(url.link_to);
  };
  return (
    <li
      className={` ${
        linkCode === link.link_code ? "bg-primary-blue/90" : "bg-primary-blue"
      } p-3 rounded text-white flex items-center justify-between transition-all duration-300`}
    >
      <div className="flex items-center gap-1">
        <p title={link.link_from} className="cursor-pointer w-[200px] truncate">
          {link.link_from}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <a
          href={link.link_to}
          className="flex gap-2 items-center"
          target="_blank"
          title={link.link_to}
          rel="noopener noreferrer"
        >
          {link.link_to}
        </a>
        <button
          onClick={() => handleCopy(link)}
          title="copy"
          type="button"
          className=""
        >
          <FaLink size={18} />
        </button>
      </div>
      <div className="flex items-center gap-2">
        <p title="view" className="flex gap-1 items-center">
          {link.clicks}
          <FaEye />
        </p>
        |
        <p className="text-xs flex items-center gap-1">
          {new Date(link.date_time).toLocaleString("en-Us", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
          })}
          <CiCalendarDate size={16} />
        </p>
        <button type="button" onClick={() => handleDelete(link?.id)}>
          <MdDelete size={20} />
        </button>
      </div>
    </li>
  );
};
export default LinkCard;
