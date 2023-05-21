import { AdminAuth } from "./admin";
import { notFound } from "next/navigation";

import 'server-only'

export default async function adminAuth() {
  const email = process.env.POCKETBASE_ADMIN_EMAIL ? process.env.POCKETBASE_ADMIN_EMAIL : ''
  const password = process.env.POCKETBASE_ADMIN_PASSWORD ? process.env.POCKETBASE_ADMIN_PASSWORD : ''

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "identity": email,
    "password": password
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    next: { revalidate: 86400 }
  };

  const res = await fetch(`${process.env.POCKETBASE_URL}/api/admins/auth-with-password`, requestOptions);
  
  if (!res.ok) {
    throw new Error('Something went wrong!');
  }
  
  const admin = (await res.json()) as AdminAuth
  
  if (!admin) {
    notFound();
  }
  
  return admin;
}