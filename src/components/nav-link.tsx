import { ComponentProps } from "react";

interface INavLinkProps extends ComponentProps<"a"> {
  children: React.ReactNode;
  isActive?: boolean;
}

export function NavLink({ children, isActive, ...rest }: INavLinkProps) {
  return (
    <a className={`font-medium text-sm ${isActive && "text-zinc-200"}`} {...rest}>
      {children}
    </a>
  );
}
