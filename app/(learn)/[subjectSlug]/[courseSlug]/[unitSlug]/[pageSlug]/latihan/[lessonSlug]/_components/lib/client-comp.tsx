"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
const ClientSideMathField = dynamic(() => import("./math-editor"), {
  ssr: false
})

export default function CComp() {
  const [value, setValue] = useState("");
  console.log(value);
  
  return (
    <ClientSideMathField value="f(x)" onChange={setValue}/>
  );
}