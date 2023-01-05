import AccountMenu from "../AccountMenu";
import UserMenu from "../UserMenu";

type Props = {
  children?: React.ReactNode;
};

export default function Navbar({ children }: Props) {
  return (
    <div className="px-4 py-2 bg-white border-b border-gray-200 dark:bg-surface-01dp dark:border-white/10">
      <div className="max-w-screen-lg flex justify-between items-center mx-auto w-full lg:px-4">
        <div className="flex">
          <UserMenu />
          {children && <nav className="flex ml-8 space-x-8">{children}</nav>}
        </div>
        <AccountMenu />
      </div>
    </div>
  );
}
