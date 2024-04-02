import { ComponentProps } from "react";

interface ITableRowProps extends ComponentProps<"tr"> {}

export function TableRow({ children, ...rest }: ITableRowProps) {
  return (
    <tr {...rest} className="border-b border-white/10 hover:bg-white/5">
      {children}
    </tr>
  );
}
