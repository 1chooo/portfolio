"use client";

import React, { useRef } from "react";
import { sendGTMEvent } from "@next/third-parties/google";

import { BlurFade } from "@/components/magicui/blur-fade";

import { Send } from "lucide-react";

interface TalkToHugoProps {
  web3formsAccessKey: string;
}

function TalkToHugo({ web3formsAccessKey }: TalkToHugoProps) {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    sendGTMEvent({ event: "message submit", value: inputRef.current?.value });

    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", web3formsAccessKey);

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
    <BlurFade inView delay={0.4} direction="up">
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
    </BlurFade>
  );
}

export { TalkToHugo };
export default TalkToHugo;
