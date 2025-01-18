import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { GiTakeMyMoney } from "react-icons/gi";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer bg-neutral text-neutral-content mt-4">
  <aside className="px-16 ">
  
    <Link to={'/'} className="btn btn-ghost normal-case text-xl">
                    <GiTakeMyMoney className="text-yellow-500"></GiTakeMyMoney>
                            <span className="text-3xl">  Earnify</span>
                    </Link>
                    <p className="text-sm text-gray-400 mt-4">
  © 2025 Earnify. All Rights Reserved. <br /> Built  by the Earnify Team.
</p>
  </aside>
  <nav className="">
    <h6 className="footer-title "> Follow us on social media for the latest updates, tips, and exclusive content.</h6>
    <div className="grid grid-flow-col gap-4">
    <Link to={"https://github.com/"} className="btn btn-ghost normal-case text-xl">
  <FaGithub className=""></FaGithub>
   Github
 </Link>
 <Link to={"https://www.facebook.com/"} className="btn btn-ghost normal-case text-xl">
                    <FaFacebook className=""></FaFacebook>
                            FaceBook
                    </Link>
 <Link to={"https://www.linkedin.com/feed/"} className="btn btn-ghost normal-case text-xl">
  <FaLinkedin className=""></FaLinkedin>
  LinkedIn
  </Link>
    </div>
  </nav>
</footer>
  );
};

export default Footer;
