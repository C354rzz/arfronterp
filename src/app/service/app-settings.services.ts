import { Injectable } from "@angular/core";
@Injectable({
    providedIn: "root"
})
export class AppSettings {

    public appTheme: string = '';
    public appCover: string = '';
    public appDarkMode: boolean = false;
    public appEmpty: boolean = false;
    public appGradientEnabled: boolean = false;
    public appBodyWhite: boolean = false;
    public appThemePanelNone: boolean = false;

    public appBoxedLayout: boolean = false;
    public appHeaderNone: boolean = false;
    public appHeaderFixed: boolean = true;
    public appHeaderInverse: boolean = false;
    public appHeaderMegaMenu: boolean = false;
    public appHeaderLanguageBar: boolean = false;
    public appHeaderMegaMenuMobileToggled: boolean = false;
    public appTopMenu: boolean = false;
    public appFooter: boolean = false;

    public appSidebarEnd: boolean = false;
    public appSidebarTwo: boolean = false;
    public appSidebarNone: boolean = false;
    public appSidebarGrid: boolean = false;
    public appSidebarWide: boolean = false;
    public appSidebarLight: boolean = false;
    public appSidebarFixed: boolean = true;
    public appSidebarSearch: boolean = false;
    public appSidebarMinified: boolean = false;
    public appSidebarCollapsed: boolean = false;
    public appSidebarTransparent: boolean = false;
    public appSidebarMobileToggled: boolean = false;
    public appSidebarRightCollapsed: boolean = false;
    public appSidebarEndToggled: boolean = false;
    public appSidebarEndMobileToggled: boolean = false;

    public appContentClass: string = '';
    public appContentFullHeight: boolean = false;
    public appContentFullWidth: boolean = false;
}