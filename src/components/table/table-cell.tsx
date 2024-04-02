import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface ITableCellProps extends ComponentProps<"td"> {}

export function TableCell({ children, className, ...rest }: ITableCellProps) {
  return (
    <td {...rest} className={twMerge("py-3 px-4 text-sm text-zinc-300", className)}>
      {children}
    </td>
  );
}
