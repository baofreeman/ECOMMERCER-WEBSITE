import { Button } from "../ui";
import Marquee from "../../features/Marquee";
import { FbIcon, InsIcon } from "../../assets/icons";
import { FOOTER_LINK } from "../../constants/option";

const Footer = ({ id }) => {
  return (
    <div id={id} className="z-10 bg-white dark:bg-black">
      <div className="flex h-full items-center px-5 sm:px-3">
        {/* Social Media Links */}
        <div className="flex items-center border-r border-gray-300 rounded-r pr-3">
          <h1 className="text-md sm:text-sm">© 2024</h1>
          <Button size="s" design="link-primary" to={"/"}>
            <FbIcon />
          </Button>
          <Button size="s" design="link-primary" to={"/"}>
            <InsIcon />
          </Button>
        </div>

        {/* Footer Links */}
        <div className="flex w-full items-center overflow-x-auto no-scrollbar">
          {FOOTER_LINK.map((link, index) => (
            <div
              key={index}
              className="border-r border-gray-300 rounded-r px-3 sm:px-2 sm:whitespace-nowrap"
            >
              <Button size="s-link" design="link-basic" to={link.path}>
                <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                  {link.name}
                </span>
              </Button>
            </div>
          ))}
        </div>

        {/* Marquee */}
        <Marquee />
      </div>
    </div>
  );
};

export default Footer;
