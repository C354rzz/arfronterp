import { Component, EventEmitter, Input, OnDestroy, Output, Renderer2 } from '@angular/core';
import { AppSettings } from 'src/app/service/app-settings.services';

declare var slideToggle: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {
  @Input() appSidebarTwo: any;
	@Output() appSidebarEndToggled = new EventEmitter<boolean>();
	@Output() appSidebarMobileToggled = new EventEmitter<boolean>();
	@Output() appSidebarEndMobileToggled = new EventEmitter<boolean>();
	
  toggleAppSidebarMobile() {
		this.appSidebarMobileToggled.emit(true);
  }
  
	toggleAppSidebarEnd() {
		this.appSidebarEndToggled.emit(true);
	}
	
  toggleAppSidebarEndMobile() {
		this.appSidebarEndMobileToggled.emit(true);
  }

	toggleAppTopMenuMobile() {
		var target = document.querySelector('.app-top-menu');
		if (target) {
			slideToggle(target);
		}
	}

	toggleAppHeaderMegaMenuMobile() {
	  this.appSettings.appHeaderMegaMenuMobileToggled = !this.appSettings.appHeaderMegaMenuMobileToggled;
	}

	ngOnDestroy() {
	  this.appSettings.appHeaderMegaMenuMobileToggled = false;
	}

  constructor(private renderer: Renderer2, public appSettings: AppSettings) {
  }
}

