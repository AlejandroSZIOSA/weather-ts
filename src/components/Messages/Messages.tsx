import { type FC, type ReactNode } from "react";

type Props = {
  children?: ReactNode;
  variant?: "fail" | "input-fail";
};

const Messages: FC<Props> = ({ children, variant = "fail" }) => {
  return <div>{children}</div>;
};

export default Messages;
