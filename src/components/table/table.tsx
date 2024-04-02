import { ComponentProps } from "react";

interface ITableProps extends ComponentProps<"table"> {}

export function Table({ children, ...rest }: ITableProps) {
  return (
    <div className="border border-white/10 rounded-lg">
      <table className="w-full" {...rest}>
        {children}
      </table>
    </div>
  );
}
