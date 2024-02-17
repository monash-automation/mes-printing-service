import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { useUserStore } from '@/lib/states.ts';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';

function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  return <Button onClick={() => loginWithRedirect()}>Log In</Button>;
}

function LogoutButton() {
  const { logout } = useAuth0();
  const reset = useUserStore((state) => state.reset);

  return (
    <Button
      onClick={() => {
        logout({ logoutParams: { returnTo: window.location.origin } }).then(
          () => reset(),
        );
      }}
    >
      Log Out
    </Button>
  );
}

export default function Profile() {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();
  const updateAccessToken = useUserStore((state) => state.updateAccessToken);
  const updateId = useUserStore((state) => state.updateId);

  useEffect(() => {
    const fetchToken = () =>
      getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        },
      });

    if (user?.sub) {
      updateId(user.sub);
      fetchToken().then((token) => {
        updateAccessToken(token);
      });
    }
  }, [user?.sub, updateId, updateAccessToken, getAccessTokenSilently]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (!isAuthenticated || !user) {
    return <LoginButton />;
  }

  return (
    <div className="flex w-60 justify-around gap-2">
      <HoverCard>
        <HoverCardTrigger>
          <Button variant="link">{user.email}</Button>
        </HoverCardTrigger>
        <HoverCardContent>
          <div className="flex justify-between space-x-2">
            <Avatar>
              <AvatarImage src={user.picture} />
              <AvatarFallback>{user.name}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">{user.name}</h4>
              <p className="text-sm">Admin</p>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>

      <LogoutButton />
    </div>
  );
}
