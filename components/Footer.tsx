import { FaWhatsapp } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { socialMedia } from "@/data";
import MagicButton from "./MagicButton";

const WHATSAPP_NUMBER = "2349165586474";
const EMAIL = "thatdevelopergirlcobham@gmail.com";

const Footer = () => {
  return (
    <footer className="w-full pt-20 pb-10">
      <div className="w-full absolute left-0 -bottom-72 min-h-96">
        <img
          src="/footer-grid.svg"
          alt=""
          className="w-full h-full opacity-50"
        />
      </div>

      <div className="flex flex-col items-center">
        <h1 className="heading lg:max-w-[45vw] font-display font-bold">
          Ready to bring your <span className="text-purple">vision</span> to life?
        </h1>
        <p className="text-white-200 md:mt-10 my-5 text-center">
          Reach out to me today and let&apos;s discuss how I can help you
          achieve your goals.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
          >
            <MagicButton
              title="Chat on WhatsApp"
              icon={<FaWhatsapp />}
              position="left"
              otherClasses="!bg-[#161A31]"
            />
          </a>

          <a href={`mailto:${EMAIL}`}>
            <MagicButton
              title="Send an email"
              icon={<MdEmail />}
              position="left"
            />
          </a>
        </div>

        <a
          href={`mailto:${EMAIL}`}
          className="flex items-center gap-2 mt-6 text-white-200 hover:text-purple transition-colors text-sm md:text-base"
        >
          <MdEmail size={18} />
          {EMAIL}
        </a>
      </div>

      <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
        <p className="md:text-base text-sm md:font-normal font-light font-sans">
          Copyright © thatdevelopergirlcobham
        </p>

        <div className="flex items-center md:gap-3 gap-6">
          {socialMedia.map((info) => (
            <a
              key={info.id}
              href={(info as any).href}
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
            >
              <img src={info.img} alt="social" width={20} height={20} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
