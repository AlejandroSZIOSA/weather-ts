import { type FC, type ReactNode } from "react";

type Props = {
  children?: ReactNode;
  variant?: "fail" | "input-validation";
};

const Message: FC<Props> = ({ children, variant = "fail" }) => {
  return <div>{children}</div>;
};

export default Message;
