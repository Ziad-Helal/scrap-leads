import { Page_MainLayout_Header } from "@/components/layouts/pages/main";
import { Content_Container } from "@/components/layouts/wrapers";
import { Outlet } from "react-router-dom";

export const Page_MainLayout = () => {
  return (
    <>
      <Page_MainLayout_Header />
      <Content_Container>
        <Outlet />
      </Content_Container>
    </>
  );
};

export * from "./header";
