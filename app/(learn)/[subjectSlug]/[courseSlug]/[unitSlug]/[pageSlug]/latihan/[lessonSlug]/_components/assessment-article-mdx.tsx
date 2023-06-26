"use client";

import { MDXRemote } from 'next-mdx-remote/rsc'

const articleComponents = {
  table: (props: any) => (
    <table {...props} className="article-table">
      {props.children}
    </table>
  ),
}

export function AssessmentArticleMDX(props: any) {
  return (
    <>
      {/* @ts-expect-error Async Server Component */}
      <MDXRemote
        {...props}
        components={{ ...articleComponents, ...(props.components || {}) }}
      />
    </>
  )
}