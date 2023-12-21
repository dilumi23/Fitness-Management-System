import React from "react";
import emailjs from "emailjs-com";

// import './ContactUs.css';

export default function Email() {
  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "gmail",
        "template_ef5o6xh",
        e.target,
        "user_4hQlVwKm1eUwsRWPbvFHE"
      )
      .then(
        (result) => {
          console.log(result.text);
          alert("Email Sent");
        },
        (error) => {
          console.log(error.text);
        }
      );
  }

  return (
    <form className="contact-form" onSubmit={sendEmail}>
      <input type="hidden" name="contact_number" />
      <label>Name</label>
      <br />
      <input type="text" name="user_name" />
      <br />
      <label>Email</label>
      <br />
      <input type="email" name="user_email" /> <br />
      <label>Message</label>
      <br />
      <textarea name="message" /> <br />
      <br />
      <input type="submit" value="Send" />
    </form>
  );
}
