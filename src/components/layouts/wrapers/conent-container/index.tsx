import { FC, ReactNode } from "react";

interface Content_Container_Props {
  children: ReactNode;
}

export const Content_Container: FC<Content_Container_Props> = ({
  children,
}) => {
  return <main className="container grow">{children}</main>;
};
