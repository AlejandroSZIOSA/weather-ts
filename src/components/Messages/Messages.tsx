import { type FC, type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Messages: FC<Props> = ({ children }) => {
  return <div>{children}</div>;
};

export default Messages;
