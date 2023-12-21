import { IconExternalLink } from "@tabler/icons-react";
import { FC } from "react";

export const Navbar: FC = () => {
  return (
    <div className="flex border-s-3 border-gray-300 py-2 px-8 items-center justify-between">
      <div className="font-bold text-2xl flex items-center">
        <img 
          src="vector-cricket-logo-svg-ai.jpg" 
          alt=""
          className="mr-7 h-10" // Adjust the margin and height as needed
        />
        <a className="hover:opacity-50">
          Your AI Assistant
        </a>
      </div>
      <div>
        <a
          className="flex items-center hover:opacity-50"
          href="https://www.cricbuzz.com/"
          target="_blank"
          rel="noreferrer"
        >
          <div className="hidden sm:flex">CrickBuzz.com</div>
          <IconExternalLink className="ml-1" size={20} />
        </a>
      </div>
    </div>
  );
};
