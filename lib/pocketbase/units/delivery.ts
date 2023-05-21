import { notFound } from "next/navigation";
import adminAuth from "../admin/delivery";
import { UnitList } from "./units";

import 'server-only'

export async function getUnits(q?: string) {
    
  const admin = await adminAuth()
    
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", admin.token);
  
  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    next: { revalidate: 43200 }
  };

  const queryParam = q ? `?${q}` : ''
  const res = await fetch(`${process.env.POCKETBASE_URL}/api/collections/units/records${queryParam}`, requestOptions);
  
  if (!res.ok) {
    throw new Error('Something went wrong!');
  }
  
  const unit = (await res.json()) as UnitList
  
  if (!unit) {
    notFound();
  }
  
  return unit;
}

export async function getUnit(id: string, q?: string) {
    
  const admin = await adminAuth()
    
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", admin.token);
  
  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    next: { revalidate: 43200 }
  };

  const queryParam = q ? `?${q}` : ''
  const res = await fetch(`${process.env.POCKETBASE_URL}/api/collections/units/records/${id}${queryParam}`, requestOptions);
  
  if (!res.ok) {
    throw new Error('Something went wrong!');
  }
  
  const unit = (await res.json()) as UnitList
  
  if (!unit) {
    notFound();
  }
  
  return unit;
}