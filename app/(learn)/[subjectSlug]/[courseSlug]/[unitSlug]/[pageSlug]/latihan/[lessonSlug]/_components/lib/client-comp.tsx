"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
const ClientSideMathField = dynamic(() => import("./dynamic-field"), {
  ssr: false
})

export default function CComp() {
  const [value, setValue] = useState("");
  
  return (
    <ClientSideMathField value="f(x)" onChange={setValue}/>
  );
}