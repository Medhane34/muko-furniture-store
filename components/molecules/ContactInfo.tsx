"use client";
import React from "react";

const ContactInfo = () => (
  <div className="mt-6 space-y-1">
    <p className="text-sm text-gray-400">
      Email:{" "}
      <a href="mailto:info@mukofurniture.com" className="hover:text-primary">
        info@mukohomecenter.com
      </a>
    </p>
    <p className="text-sm text-gray-400">
      Phone:{" "}
      <a href="tel:+251911227104" className="hover:text-primary">
        (+251)911 22 71 04
      </a>
    </p>
    <p className="text-sm text-gray-400">Addis Ababa, Ethiopia</p>
  </div>
);

export default ContactInfo;
