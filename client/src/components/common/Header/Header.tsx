import Logo from '../Logo';
import HeaderLink from './HeaderLink';

export default function Header() {
  const userState = 'login';

  return (
    <header
      className="
        flex
        justify-between
        items-center
        bg-[url('/assets/img/bg_wood_yellow.png')] 
        bg-contain
        h-[64px] 
        border-b-[8px] 
        border-border-10
        shadow-outer/down 
        px-[15px]
        ">
      <Logo size="small" />
      <ul className="flex gap-[10px]">
        <li>
          <HeaderLink location="/garden/1" content="activity" title="garden" />
        </li>
        <li>
          <HeaderLink location="/board" content="activity" title="community" />
        </li>
        <li>
          <HeaderLink location="/leafs/1" content="activity" title="leafCard" />
        </li>
        {userState === 'login' ? (
          <li>
            <img
              src="/assets/img/bg_default.png"
              alt="profile_img"
              className="rounded-[50%] border-brown-50 border-[3px] w-[44px] h-[44px]"
            />
          </li>
        ) : (
          <li>
            <HeaderLink location="/signin" content="auth" title="signin" />
          </li>
        )}
      </ul>
    </header>
  );
}
