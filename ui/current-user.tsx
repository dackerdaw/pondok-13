import { app } from '@/lib/firebase/firebase-config';
import Image from 'next/image';
import { Button, IconButton, Spinner } from '@material-tailwind/react';
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const login = () => {
  signInWithPopup(auth, provider)
};
const logout = () => {
  signOut(auth);
};

export default function CurrentUser() {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  if (user) {
    return (
      <div className='flex items-center gap-2'>
        <p>Halo {user.displayName} 👋</p>
        <IconButton onClick={logout} className="bg-[#ea4335] rounded hover:shadow-[#ea4335]/20 focus:shadow-[#ea4335]/20 active:shadow-[#ea4335]/10">
          <ArrowLeftOnRectangleIcon className='w-6 h-6' />
        </IconButton>
      </div>
    );
  }
  return (
    <Button
      size="lg"
      variant="outlined"
      color="blue-gray"
      className="flex items-center gap-3"
      onClick={login}
    >
      <Image height={24} width={24} src="/icons/google.svg" alt="metamask" className="h-6 w-6" />
      Login dengan Google
    </Button>
  );
};