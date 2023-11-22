import React from "react";
import { BsFacebook, BsLinkedin, BsInstagram } from "react-icons/Bs";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="px-6 center md:justify-evenly py-4 flex flex-wrap bg-[#F8F8F8] text-[#555555] text-s">
          <div className="support p-4">
            <h4 className="text-lg text-black">Support</h4>
            <p>StudyStayCover</p>
            <p>Anti-discrimination</p>
            <p>Support for disabilities</p>
            <p>Cancellation options</p>
            <p>Report neighborhood problems</p>
          </div>

          <div className="hosting p-4">
            <h4 className="text-lg text-black">Hosting</h4>
            <p>Rent out your accommodation</p>
            <p>StudyStayCover for hosts</p>
            <p>Host resources</p>
            <p>Community forum</p>
          </div>
          <div className="studystay p-4">
            <h4 className="text-lg text-black">StudyStay</h4>
            <p>Press room</p>
            <p>New features</p>
            <p>Job opportunities</p>
            <p>Investors</p>
            <p>Emergency housing with StudyStay</p>
          </div>
        </div>
        <div className="copyright px-8 py-2 flex justify-evenly items-center bg-[#F8F8F8] border-t-2">
          © 2023 StudyStay AB. · Privacy · Terms · Site Map · Company
          Information
          <div className="socials flex">
            <BsFacebook size={22} className="mr-4" />
            <BsInstagram size={22} className="mr-4" />
            <BsLinkedin size={22} className="mr-4" />
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
