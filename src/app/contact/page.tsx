import SectionWrapper from "@/components/SectionWrapper";
import { FaFacebookMessenger, FaPhoneAlt, FaViber } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

const contactDetails = [
  {
    icon: <IoIosMail size={44} />,
    text: "islandersview.inquiry@gmail.com",
  },
  {
    icon: <FaFacebookMessenger size={36} />,
    text: "islandersview",
  },
  {
    icon: <FaViber size={36} />,
    text: "09945678901",
  },
  {
    icon: <FaPhoneAlt size={30} />,
    text: "09945678901",
  },
];

export const metadata = {
  title: "Contact Us",
  description: "Get in touch with us for your dream property.",
};

export default function Page() {
  // bg-gradient-to-t from-primary from-5% to-[#191919] to-40%
  return (
    <main
      className=" 
      bg-[radial-gradient(at_right,_var(--tw-gradient-stops))] to-[#191919] from-primary
      text-white min-h-[80vh]"
    >
      <SectionWrapper>
        <div className="px-2 py-24">
          <div className="text-center">
            <h1 className=" text-5xl font-bold">
              Get In <span className="text-secondary">Touch</span> With Us!
            </h1>
            <p className="mt-4 text-lg">
              Let&apos;s talk about your dream property, on the time you like.
            </p>
          </div>
          <section className=" bg-black bg-opacity-75 rounded-2xl p-10 lg:p-12 mt-16 max-w-[700px] mx-auto">
            <h2 className="text-3xl font-bold text-primary">
              Contact Information
            </h2>
            <div>
              {contactDetails.map((detail, index) => (
                <div
                  key={index}
                  className="flex items-center mt-8 text-xs xs:text-md sm:text-lg"
                >
                  <div className="w-12">{detail.icon}</div>
                  <div>{detail.text}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </SectionWrapper>
    </main>
  );
}
