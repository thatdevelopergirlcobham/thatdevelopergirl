"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import emailjs from "@emailjs/browser";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting form..."); // Debug log
    setStatus("submitting");

    // Replace these with your actual Service ID, Template ID, and Public Key from EmailJS
    const serviceId = "service_pvmu2sg";
    const templateId = "template_oqbat1j";
    const publicKey = "7pQk7xFbXaGGUxxZ0";

    const templateParams = {
      from_name: formData.name,
      to_name: "Dawn Cobham", // Your name
      from_email: formData.email,
      message: formData.message,
    };

    console.log("Sending email with params:", templateParams); // Debug log

    try {
      emailjs.send(serviceId, templateId, templateParams, publicKey).then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setStatus("success");
          setTimeout(() => {
            setStatus("idle");
            setFormData({ name: "", email: "", message: "" });
            onClose();
          }, 3000);
        },
        (error) => {
          console.error("FAILED...", error); // Use error log
          setStatus("idle");
          alert(`Failed to send message: ${JSON.stringify(error)}`); // Show error in alert
        }
      );
    } catch (error) {
      console.error("Error calling emailjs:", error);
      setStatus("idle");
      alert("An unexpected error occurred.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[5000] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg p-6 m-4 bg-[#13162D] border border-white/10 rounded-2xl shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors"
            >
              <IoClose size={24} />
            </button>

            <h2 className="text-2xl font-bold text-white mb-2">
              Send me a message
            </h2>
            <p className="text-white/60 mb-6">
              I'll get back to you as soon as possible.
            </p>

            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4 text-3xl">
                  ✓
                </div>
                <h3 className="text-xl font-semibold text-white">
                  Message Sent!
                </h3>
                <p className="text-white/60 mt-2">Thanks for reaching out.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-white/80 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple/50 transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-white/80 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple/50 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-white/80 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple/50 transition-all resize-none"
                    placeholder="How can I help you?"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full py-3 px-6 rounded-lg bg-purple hover:bg-purple/90 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {status === "submitting" ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
