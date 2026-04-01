import { type FC, type ReactNode } from "react";

type Props = {
  children?: ReactNode;
  variant?: "fail" | "text-fail";
};

const InputFormMessages: FC<Props> = ({ children, variant = "fail" }) => {
  return <div>{children}</div>;
};

export default InputFormMessages;
