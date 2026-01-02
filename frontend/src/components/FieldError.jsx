import React from "react";

export default function FieldError({ text }) {
  if (!text) return null;
  return <p className="mt-1 text-xs text-red-600">{text}</p>;
}
