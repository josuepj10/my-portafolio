import React from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

interface SocialProps {
  containerStyles?: string;
  iconStyles?: string;
}

const socials = [
  { icon: <FaGithub />, path: "" },
  { icon: <FaLinkedin />, path: "" },
  { icon: <FaInstagram />, path: "" },
];

export const Social: React.FC<SocialProps> = ({
  containerStyles = "",
  iconStyles = "",
}) => {
  return (
    <div className={containerStyles}>
      {socials.map((item, index) => (
        <Link key={index} href={item.path} className={iconStyles}>
          {item.icon}
        </Link>
      ))}
    </div>
  );
};
