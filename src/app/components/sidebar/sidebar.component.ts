import { AfterViewChecked, Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { slideUp } from "src/app/composables/slideUp.js";
import { slideToggle } from 'src/app/composables/slideToggle.js';
import { AppMenuService } from 'src/app/service/app-menus.service';
import { AppSettings } from 'src/app/service/app-settings.services';
import { RouterLinkActive } from '@angular/router';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss']
})


export class SidebarComponent implements AfterViewChecked {
	expandCollapseSubmenu(e: any, currentMenu: any, allMenu: any, active: any) {
		e.preventDefault();
		var targetItem = (e.target).closest('.menu-item');
		var target = <HTMLElement>targetItem.querySelector('.menu-submenu');
		slideToggle(target);
		this.calculateFloatSubMenuPosition.emit();
	}

	menus: any[] = [];

	@ViewChild('sidebarScrollbar', { static: false }) private sidebarScrollbar: ElementRef | undefined;
	@Output() appSidebarMinifiedToggled = new EventEmitter<boolean>();
	@Output() hideMobileSidebar = new EventEmitter<boolean>();
	@Output() setPageFloatSubMenu = new EventEmitter();
	@Output() calculateFloatSubMenuPosition = new EventEmitter();

	@Output() appSidebarMobileToggled = new EventEmitter<boolean>();
	@Input() appSidebarTransparent: any;
	@Input() appSidebarGrid: any;
	@Input() appSidebarFixed: any;
	@Input() appSidebarMinified: any;

	appSidebarFloatSubMenu: any;
	appSidebarFloatSubMenuHide: any;
	appSidebarFloatSubMenuHideTime = 250;
	appSidebarFloatSubMenuTop: any;
	appSidebarFloatSubMenuLeft = '60px';
	appSidebarFloatSubMenuRight: any;
	appSidebarFloatSubMenuBottom: any;
	appSidebarFloatSubMenuArrowTop: any;
	appSidebarFloatSubMenuArrowBottom: any;
	appSidebarFloatSubMenuLineTop: any;
	appSidebarFloatSubMenuLineBottom: any;
	appSidebarFloatSubMenuOffset: any;

	mobileMode: any;
	desktopMode: any;
	scrollTop: any;



	toggleNavProfile(e: any) {
		e.preventDefault();

		var targetSidebar = <any>document.querySelector('.app-sidebar:not(.app-sidebar-end)');
		var targetMenu = e.target.closest('.menu-profile');
		var targetProfile = <any>document.querySelector('#appSidebarProfileMenu');
		var expandTime = (targetSidebar && targetSidebar.getAttribute('data-disable-slide-animation')) ? 0 : 250;

		if (targetProfile && targetProfile.style) {
			if (targetProfile.style.display == 'block') {
				targetMenu.classList.remove('active');
			} else {
				targetMenu.classList.add('active');
			}
			slideToggle(targetProfile, expandTime);
			targetProfile.classList.toggle('expand');
		}
	}

	toggleAppSidebarMinified() {
		this.appSidebarMinifiedToggled.emit(true);
		this.scrollTop = 40;
	}

	toggleAppSidebarMobile() {
		this.appSidebarMobileToggled.emit(true);
	}

	calculateAppSidebarFloatSubMenuPosition() {
		var targetTop = this.appSidebarFloatSubMenuOffset.top;
		var direction = document.body.style.direction;
		var windowHeight = window.innerHeight;

		setTimeout(() => {
			let targetElm = <any>document.querySelector('.app-sidebar-float-submenu-container');
			let targetSidebar = <any>document.getElementById('sidebar');
			var targetHeight = targetElm.offsetHeight;
			this.appSidebarFloatSubMenuRight = 'auto';
			this.appSidebarFloatSubMenuLeft = (this.appSidebarFloatSubMenuOffset.width + targetSidebar.offsetLeft) + 'px';

			if ((windowHeight - targetTop) > targetHeight) {
				this.appSidebarFloatSubMenuTop = this.appSidebarFloatSubMenuOffset.top + 'px';
				this.appSidebarFloatSubMenuBottom = 'auto';
				this.appSidebarFloatSubMenuArrowTop = '20px';
				this.appSidebarFloatSubMenuArrowBottom = 'auto';
				this.appSidebarFloatSubMenuLineTop = '20px';
				this.appSidebarFloatSubMenuLineBottom = 'auto';
			} else {
				this.appSidebarFloatSubMenuTop = 'auto';
				this.appSidebarFloatSubMenuBottom = '0';

				var arrowBottom = (windowHeight - targetTop) - 21;
				this.appSidebarFloatSubMenuArrowTop = 'auto';
				this.appSidebarFloatSubMenuArrowBottom = arrowBottom + 'px';
				this.appSidebarFloatSubMenuLineTop = '20px';
				this.appSidebarFloatSubMenuLineBottom = arrowBottom + 'px';
			}
		}, 0);
	}

	showAppSidebarFloatSubMenu(menu: any, e: any) {
		if (this.appSettings.appSidebarMinified) {
			clearTimeout(this.appSidebarFloatSubMenuHide);

			this.appSidebarFloatSubMenu = menu;
			this.appSidebarFloatSubMenuOffset = e.target.getBoundingClientRect();
			this.calculateAppSidebarFloatSubMenuPosition();
		}
	}

	hideAppSidebarFloatSubMenu() {
		this.appSidebarFloatSubMenuHide = setTimeout(() => {
			this.appSidebarFloatSubMenu = '';
		}, this.appSidebarFloatSubMenuHideTime);
	}

	remainAppSidebarFloatSubMenu() {
		clearTimeout(this.appSidebarFloatSubMenuHide);
	}

	appSidebarSearch(e: any) {
		var targetValue = e.target.value;
		targetValue = targetValue.toLowerCase();

		if (targetValue) {
			var elms = [].slice.call(document.querySelectorAll('.app-sidebar:not(.app-sidebar-end) .menu > .menu-item:not(.menu-profile):not(.menu-header):not(.menu-search), .app-sidebar:not(.app-sidebar-end) .menu-submenu > .menu-item'));
			if (elms) {
				elms.map(function (elm: any) {
					elm.classList.add('d-none');
				});
			}
			var elms = [].slice.call(document.querySelectorAll('.app-sidebar:not(.app-sidebar-end) .has-text'));
			if (elms) {
				elms.map(function (elm: any) {
					elm.classList.remove('has-text');
				});
			}
			var elms = [].slice.call(document.querySelectorAll('.app-sidebar:not(.app-sidebar-end) .expand'));
			if (elms) {
				elms.map(function (elm: any) {
					elm.classList.remove('expand');
				});
			}
			var elms = [].slice.call(document.querySelectorAll('.app-sidebar:not(.app-sidebar-end) .menu > .menu-item:not(.menu-profile):not(.menu-header):not(.menu-search) > .menu-link, .app-sidebar .menu-submenu > .menu-item > .menu-link'));
			if (elms) {
				elms.map(function (elm: any) {
					var targetText = elm.textContent;
					targetText = targetText.toLowerCase();
					if (targetText.search(targetValue) > -1) {
						var targetElm = elm.closest('.menu-item');
						if (targetElm) {
							targetElm.classList.remove('d-none');
							targetElm.classList.add('has-text');
						}

						var targetElm = elm.closest('.menu-item.has-sub');
						if (targetElm) {
							var targetElm = targetElm.querySelector('.menu-submenu .menu-item.d-none');
							if (targetElm) {
								targetElm.classList.remove('d-none');
							}
						}

						var targetElm = elm.closest('.menu-submenu');
						if (targetElm) {
							targetElm.style.display = 'block';

							var targetElm = targetElm.querySelector('.menu-item:not(.has-text)');
							if (targetElm) {
								targetElm.classList.add('d-none');
							}

							var targetElm = elm.closest('.has-sub:not(.has-text)');
							if (targetElm) {
								targetElm.classList.remove('d-none');
								targetElm.classList.add('expand');

								var targetElm = targetElm.closest('.has-sub:not(.has-text)');
								if (targetElm) {
									targetElm.classList.remove('d-none');
									targetElm.classList.add('expand');
								}
							}
						}
					}
				});
			}
		} else {
			var elms = [].slice.call(document.querySelectorAll('.app-sidebar:not(.app-sidebar-end) .menu > .menu-item:not(.menu-profile):not(.menu-header):not(.menu-search).has-sub .menu-submenu'));
			if (elms) {
				elms.map(function (elm: any) {
					elm.removeAttribute('style');
				});
			}

			var elms = [].slice.call(document.querySelectorAll('.app-sidebar:not(.app-sidebar-end) .menu > .menu-item:not(.menu-profile):not(.menu-header):not(.menu-search)'));
			if (elms) {
				elms.map(function (elm: any) {
					elm.classList.remove('d-none');
				});
			}

			var elms = [].slice.call(document.querySelectorAll('.app-sidebar:not(.app-sidebar-end) .menu-submenu > .menu-item'));
			if (elms) {
				elms.map(function (elm: any) {
					elm.classList.remove('d-none');
				});
			}

			var elms = [].slice.call(document.querySelectorAll('.app-sidebar:not(.app-sidebar-end) .expand'));
			if (elms) {
				elms.map(function (elm: any) {
					elm.classList.remove('expand');
				});
			}
		}
	}

	@HostListener('scroll', ['$event'])
	onScroll(event: any) {
		this.scrollTop = (this.appSettings.appSidebarMinified) ? event.srcElement.scrollTop + 40 : 0;
		if (typeof (Storage) !== 'undefined') {
			localStorage.setItem('sidebarScroll', event.srcElement.scrollTop);
		}
	}

	@HostListener('window:resize', ['$event'])
	onResize(event: any) {
		if (window.innerWidth <= 767) {
			this.mobileMode = true;
			this.desktopMode = false;
		} else {
			this.mobileMode = false;
			this.desktopMode = true;
		}
	}

	ngAfterViewChecked() {
		if (typeof (Storage) !== 'undefined' && localStorage['sidebarScroll']) {
			if (this.sidebarScrollbar && this.sidebarScrollbar.nativeElement) {
				this.sidebarScrollbar.nativeElement.scrollTop = localStorage['sidebarScroll'];
			}
		}
	}

	ngAfterViewInit() {
		var handleSidebarMenuToggle = function (menus: any[], expandTime: number) {
			menus.map(function (menu: {
				nextElementSibling: any; onclick: (e: any) => void;
			}) {
				menu.onclick = function (e: { preventDefault: () => void; }) {
					e.preventDefault();
					var target = this.nextElementSibling;

					menus.map(function (m: { nextElementSibling: any; }) {
						var otherTarget = m.nextElementSibling;
						if (otherTarget !== target) {
							slideUp(otherTarget, expandTime);
							otherTarget.closest('.menu-item').classList.remove('expand');
							otherTarget.closest('.menu-item').classList.add('closed');
						}
					});

					var targetItemElm = target.closest('.menu-item');

					if (targetItemElm.classList.contains('expand') || (targetItemElm.classList.contains('active') && !target.style.display)) {
						targetItemElm.classList.remove('expand');
						targetItemElm.classList.add('closed');
						slideToggle(target, expandTime);
					} else {
						targetItemElm.classList.add('expand');
						targetItemElm.classList.remove('closed');
						slideToggle(target, expandTime);
					}
				}
			});
		};

		var targetSidebar = document.querySelector('.app-sidebar:not(.app-sidebar-end)');
		var expandTime = (targetSidebar && targetSidebar.getAttribute('data-disable-slide-animation')) ? 0 : 300;
		var disableAutoCollapse = (targetSidebar && targetSidebar.getAttribute('data-disable-auto-collapse')) ? 1 : 0;

		var menuBaseSelector = '.app-sidebar .menu > .menu-item.has-sub';
		var submenuBaseSelector = ' > .menu-submenu > .menu-item.has-sub';

		// menu
		var menuLinkSelector = menuBaseSelector + ' > .menu-link';
		var menus = [].slice.call(document.querySelectorAll(menuLinkSelector));
		handleSidebarMenuToggle(menus, expandTime);

		// submenu lvl 1
		var submenuLvl1Selector = menuBaseSelector + submenuBaseSelector;
		var submenusLvl1 = [].slice.call(document.querySelectorAll(submenuLvl1Selector + ' > .menu-link'));
		handleSidebarMenuToggle(submenusLvl1, expandTime);

		// submenu lvl 2
		var submenuLvl2Selector = menuBaseSelector + submenuBaseSelector + submenuBaseSelector;
		var submenusLvl2 = [].slice.call(document.querySelectorAll(submenuLvl2Selector + ' > .menu-link'));
		handleSidebarMenuToggle(submenusLvl2, expandTime);

	}


	ngOnInit() {
		this.menus = this.appMenuService.getAppMenus();
	}

	constructor(private eRef: ElementRef, public appSettings: AppSettings, private appMenuService: AppMenuService) {
		if (window.innerWidth <= 767) {
			this.mobileMode = true;
			this.desktopMode = false;
		} else {
			this.mobileMode = false;
			this.desktopMode = true;
		}
	}
}


