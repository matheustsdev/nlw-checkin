import { ComponentProps } from "react";

interface ITableHeaderProps extends ComponentProps<"th"> {}

export function TableHeader({ children, ...rest }: ITableHeaderProps) {
  return (
    <th className="py-3 px-4 text-sm font-semibold text-left" {...rest}>
      {children}
    </th>
  );
}
