import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationStart, Router } from '@angular/router';
import { AppSettings } from './service/app-settings.services';
import { AppVariablesService } from './service/app-variables.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private titleService: Title, private router: Router, private renderer: Renderer2, public appSettings: AppSettings, private appVariablesService: AppVariablesService) {
    router.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        if (window.innerWidth < 768) {
          this.appSettings.appSidebarMobileToggled = false;
          this.appSettings.appSidebarEndMobileToggled = false;
        }
      }
    });
  }

  // window scroll
  appHasScroll: any;

  appVariables = this.appVariablesService.getAppVariables();

  ngOnInit() {
    // page settings
    if (this.appSettings.appDarkMode) {
      this.onAppDarkModeChanged(true);
    }

    if (localStorage) {
      if (localStorage['appDarkMode']) {
        this.appSettings.appDarkMode = (localStorage['appDarkMode'] === 'true') ? true : false;
        if (this.appSettings.appDarkMode) {
          this.onAppDarkModeChanged(true);
        }
      }
      if (localStorage['appHeaderFixed']) {
        this.appSettings.appHeaderFixed = (localStorage['appHeaderFixed'] === 'true') ? true : false;
      }
      if (localStorage['appHeaderInverse']) {
        this.appSettings.appHeaderInverse = (localStorage['appHeaderInverse'] === 'true') ? true : false;
      }
      if (localStorage['appSidebarFixed']) {
        this.appSettings.appSidebarFixed = (localStorage['appSidebarFixed'] === 'true') ? true : false;
      }
      if (localStorage['appSidebarMinified']) {
        this.appSettings.appSidebarMinified = (localStorage['appSidebarMinified'] === 'true') ? true : false;
      }
      if (localStorage['appSidebarGrid']) {
        this.appSettings.appSidebarGrid = (localStorage['appSidebarGrid'] === 'true') ? true : false;
      }
      if (localStorage['appGradientEnabled']) {
        this.appSettings.appGradientEnabled = (localStorage['appGradientEnabled'] === 'true') ? true : false;
      }
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const doc = document.documentElement;
    const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    if (top > 0 && this.appSettings.appHeaderFixed) {
      this.appHasScroll = true;
    } else {
      this.appHasScroll = false;
    }
  }

  // set page minified
  onAppSidebarMinifiedToggled(val: boolean): void {
    this.appSettings.appSidebarMinified = !this.appSettings.appSidebarMinified;
    if (localStorage) {
      localStorage['appSidebarMinified'] = this.appSettings.appSidebarMinified;
    }
  }

  // set app sidebar end toggled
  onAppSidebarEndToggled(val: boolean): void {
    this.appSettings.appSidebarEndToggled = !this.appSettings.appSidebarEndToggled;
  }

  // hide mobile sidebar
  onAppSidebarMobileToggled(val: boolean): void {
    this.appSettings.appSidebarMobileToggled = !this.appSettings.appSidebarMobileToggled;
  }

  // toggle right mobile sidebar
  onAppSidebarEndMobileToggled(val: boolean): void {
    this.appSettings.appSidebarEndMobileToggled = !this.appSettings.appSidebarEndMobileToggled;
  }

  onAppDarkModeChanged(val: boolean): void {
    if (this.appSettings.appDarkMode) {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-bs-theme');
    }
    this.appVariables = this.appVariablesService.getAppVariables();
    this.appVariablesService.variablesReload.emit();
    document.dispatchEvent(new CustomEvent('theme-change'));
  }

  onAppThemeChanged(val: boolean): void {
		const newTheme = 'theme-' + this.appSettings.appTheme;
		for (let x = 0; x < document.body.classList.length; x++) {
			if ((document.body.classList[x]).indexOf('theme-') > -1 && document.body.classList[x] !== newTheme) {
				document.body.classList.remove(document.body.classList[x]);
			}
		}
		document.body.classList.add(newTheme);
		this.appVariables = this.appVariablesService.getAppVariables();
		this.appVariablesService.variablesReload.emit();
	}
}

