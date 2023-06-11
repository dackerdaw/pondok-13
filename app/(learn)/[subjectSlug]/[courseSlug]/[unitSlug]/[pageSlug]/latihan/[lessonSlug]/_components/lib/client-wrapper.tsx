"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
const ClientSideMathInput = dynamic(() => import("./math-input"), {
  ssr: false
})

export default function ClientWrapper() {
  const [value, setValue] = useState("");
  console.log(value);
  
  return (
    <ClientSideMathInput value="f(x)= \frac{\placeholder[numerator][x]{}}{\placeholder[denominator]{y}}" onChange={setValue} readOnly />
  );
}