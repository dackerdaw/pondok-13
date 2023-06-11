import { useState } from "react";
import dynamic from "next/dynamic";
import { MDXRemote } from 'next-mdx-remote/rsc'
import MathInput from "@/ui/math-input";

// const ClientSideMathInput = dynamic(() => import("@/ui/math-input"), {
//   ssr: false
// })

const articleComponents = {
  table: (props: any) => (
    <table {...props} className="article-table">
      {props.children}
    </table>
  ),
}

export default function ClientWrapper(props: any) {
  
  return (
    // <>
    //   {/* @ts-expect-error Async Server Component */}
    //   <MDXRemote
    //     {...props}
    //     components={{ ...articleComponents, ...(props.components || {}) }}
    //   />
    // </>
 
    <MathInput value="f(x)= \frac{\placeholder[numerator][x]{}}{\placeholder[denominator]{y}}" readOnly />
  );
}