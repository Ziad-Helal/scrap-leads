import { Content_Container } from "@/components/layouts/wrapers";
import {
  AdvancedFilters_Modal,
  ExportAsXLSX_Modal,
  SubscriptionInfo_Modal,
} from "@/components/modals";
import { ColorTheme_Toggler } from "@/components/togglers";
import { Link } from "react-router-dom";

export const Page_MainLayout_Header = () => {
  return (
    <header>
      <Content_Container>
        <div className="flex items-center justify-between py-1">
          <Link to="/">
            <h1 className="font-medium text-3xl md:text-4xl">Scrap Leads</h1>
          </Link>
          <div className="flex items-center justify-center gap-2">
            <ColorTheme_Toggler />
            <ExportAsXLSX_Modal />
            <AdvancedFilters_Modal />
            <SubscriptionInfo_Modal />
          </div>
        </div>
      </Content_Container>
    </header>
  );
};
