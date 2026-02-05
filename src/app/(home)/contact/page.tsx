"use client";

import React, { useEffect, useRef } from "react";
import { Send } from "lucide-react";
import PageTitle from "@/components/page-title";
import config from "@/config";
import { sendGTMEvent } from "@next/third-parties/google";

const { title } = config;

import "@/styles/contact/map-box.css";

/**
 * TODO: #341 still need to update with another method to avoid client side not available metadata
 * export const metadata: Metadata = {
 *   title: `Contact | ${title}`,
 * };
 */

function Contact() {
  useEffect(() => {
    document.title = `Contact | ${title}`;
  }, [title]);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    sendGTMEvent({ event: "message submit", value: inputRef.current?.value });

    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append(
      "access_key",
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "",
    );

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <article>
      <PageTitle title="Contact Me" />
      <section className="mb-[10px]">
        <div className="mapbox" data-mapbox="true">
          <figure>
            <iframe
              title="map address"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1653.447790694502!2d-118.29153251133746!3d34.02089114329221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c7fb61e73c2d%3A0xe6fd0a5832af7b29!2sUSC%20Viterbi%20School%20of%20Engineering!5e0!3m2!1sen!2stw!4v1749014215095!5m2!1sen!2stw"
              width="400"
              height="300"
              loading="lazy"
            ></iframe>
          </figure>
        </div>

        <h3 className="text-white-2 text-2xl font-bold mb-[20px]">
          Contact Form
        </h3>
        <form onSubmit={onSubmit} className="form">
          <div className="input-wrapper">
            <input
              type="text"
              name="Full Name"
              className="form-input"
              placeholder="Full name"
              required
            />
            <input
              type="email"
              name="Email"
              className="form-input"
              placeholder="Email address"
              required
            />
          </div>
          <textarea
            name="Message"
            className="form-input"
            placeholder="Your Message"
            required
            ref={inputRef}
          ></textarea>
          <button
            className="form-btn"
            type="submit"
            disabled={result === "Sending...."}
          >
            <Send />
            <span>
              {result === ""
                ? "Send Message"
                : result === "Sending...."
                  ? "Sending..."
                  : result === "Form Submitted Successfully"
                    ? "Message Sent!"
                    : result}
            </span>
          </button>
        </form>
      </section>
    </article>
  );
}

export default Contact;
