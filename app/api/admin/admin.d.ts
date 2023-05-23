export interface AdminAuth {
  admin: Admin;
  token: string; 
}

interface Admin {
  id: string;
  created: string;
  updated: string;
  avatar: number;
  email: string;   
}