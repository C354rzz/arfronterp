import { Component, OnInit } from '@angular/core';
import { AppMenuService } from 'src/app/service/app-menus.service';
import { Router } from '@angular/router';


declare var slideUp: any;
declare var slideToggle: any;


@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit{
  menus: any[] = [];

  constructor(private appMenuService: AppMenuService, private router: Router) { }
  
  ngOnInit(): void {
    this.menus = this.appMenuService.getAppMenus();
  }

  ngAfterViewInit() {
    setTimeout(() => {
			this.handleTopMenuSubMenu();
      
      window.addEventListener('resize', () => {
				if (window.innerWidth >= 768) {
					var targetElm = document.querySelector('.app-top-menu');
					if (targetElm) {
						targetElm.removeAttribute('style');
					}
					var targetElm2 = document.querySelector('.app-top-menu .menu');
					if (targetElm2) {
						targetElm2.removeAttribute('style');
					}
					var targetElm3 = document.querySelectorAll('.app-top-menu .menu-submenu');
					if (targetElm3) {
						targetElm3.forEach((elm3) => {
							elm3.removeAttribute('style');
						});
					}
					this.handleTopMenuMenuFocus();
				}
				this.handleTopMenuDrag('.app-top-menu');
			});
	
			if (window.innerWidth >= 768) {
				this.handleTopMenuMenuFocus();
				this.handleTopMenuDrag('.app-top-menu');
			}
    }, 50);
  }

  isActive(path: string) {
		return this.router.url === '/'+ path;
	}
	
	isChildActive(menus: any) {
		var active = false;
		if (menus.length > 0) {
			for (let menu of menus) {
				if (this.router.url === '/'+ menu.url) {
					active = true;
				}
			}
		}
		return active;
	}

  handleTopMenuSubMenu() {
    const menuBaseSelector = '.app-top-menu .menu > .menu-item.has-sub';
    const submenuBaseSelector = ' > .menu-submenu > .menu-item.has-sub';

    // Menu - Toggle / Collapse
    const menuLinkSelector = menuBaseSelector + ' > .menu-link';
    const menus = Array.from(document.querySelectorAll<HTMLElement>(menuLinkSelector));
    this.handleTopMenuToggle(menus, true);

    // Menu - Submenu lvl 1
    const submenuLvl1Selector = menuBaseSelector + submenuBaseSelector;
    const submenusLvl1 = Array.from(document.querySelectorAll<HTMLElement>(submenuLvl1Selector + ' > .menu-link'));
    this.handleTopMenuToggle(submenusLvl1);

    // Menu - Submenu lvl 2
    const submenuLvl2Selector = menuBaseSelector + submenuBaseSelector + submenuBaseSelector;
    const submenusLvl2 = Array.from(document.querySelectorAll<HTMLElement>(submenuLvl2Selector + ' > .menu-link'));
    this.handleTopMenuToggle(submenusLvl2);
  }

  handleTopMenuToggle(menus: HTMLElement[], forMobile = false) {
    menus.forEach((menu: HTMLElement) => {
      menu.onclick = (e: MouseEvent) => {
        e.preventDefault();

        if (!forMobile || (forMobile && document.body.clientWidth < 768)) {
          const target = menu.nextElementSibling as HTMLElement | null;
          menus.forEach((m: HTMLElement) => {
            const otherTarget = m.nextElementSibling as HTMLElement | null;
            if (otherTarget && otherTarget !== target) {
              slideUp(otherTarget);
              
              const otherTargetMenuItem = otherTarget.closest('.menu-item') as HTMLElement | null;
              if (otherTargetMenuItem) {
								otherTargetMenuItem.classList.remove('expand');
								otherTargetMenuItem.classList.add('closed');
              }
            }
          });
					if (target) {
          	slideToggle(target);
					}
        }
      };
    });
  }

  handleTopMenuMenuFocus() {
		const targetMenu = document.querySelector('.app-top-menu .menu') as HTMLElement | null;
		if (!targetMenu) {
			return;
		}
		const targetMenuStyle = window.getComputedStyle(targetMenu);
		const bodyStyle = window.getComputedStyle(document.body);
		const targetCss = bodyStyle.getPropertyValue('direction') === 'rtl' ? 'margin-right' : 'margin-left';
		const marginLeft = parseInt(targetMenuStyle.getPropertyValue(targetCss));
		const viewNav = document.querySelector('.app-top-menu') as HTMLElement | null;
		const viewWidth = viewNav ? viewNav.clientWidth : 0;
		let prevWidth = 0;
		let speed = 0;
		let fullWidth = 0;
		const controlPrevObj = targetMenu.querySelector('.menu-control-start') as HTMLElement | null;
		const controlPrevWidth = controlPrevObj ? controlPrevObj.clientWidth : 0;
		const controlNextObj = targetMenu.querySelector('.menu-control-end') as HTMLElement | null;
		const controlNextWidth = controlNextObj ? controlNextObj.clientWidth : 0;
		let controlWidth = 0;

		const elms = Array.from(document.querySelectorAll('.app-top-menu .menu > .menu-item')) as HTMLElement[];
		if (elms.length > 0) {
			let found = false;
			elms.forEach(function (elm) {
				if (!elm.classList.contains('menu-control')) {
					fullWidth += elm.clientWidth;
					if (!found) {
						prevWidth += elm.clientWidth;
					}
					if (elm.classList.contains('active')) {
						found = true;
					}
				}
			});
		}

    let elm = targetMenu.querySelector('.menu-control.menu-control-end') as HTMLElement | null;
		if (elm && prevWidth !== fullWidth && fullWidth >= viewWidth) {
			elm.classList.add('show');
			controlWidth += controlNextWidth;
		} else if (elm) {
			elm.classList.remove('show');
		}

		elm = targetMenu.querySelector('.menu-control.menu-control-start') as HTMLElement | null;
		if (elm && prevWidth >= viewWidth && fullWidth >= viewWidth) {
			elm.classList.add('show');
		} else if (elm) {
			elm.classList.remove('show');
		}

		if (prevWidth >= viewWidth) {
			const finalScrollWidth = prevWidth - viewWidth + controlWidth;
			if (bodyStyle.getPropertyValue('direction') !== 'rtl') {
				targetMenu.style.marginLeft = `-${finalScrollWidth}px`;
			} else {
				targetMenu.style.marginRight = `-${finalScrollWidth}px`;
			}
		}
	}

  handleTopMenuDrag(containerClassName: string) {
		const container = document.querySelector(containerClassName) as HTMLElement | null;
		if (!container) {
			return;
		}
		const menu = container.querySelector('.menu') as HTMLElement | null;
		const menuItem = menu ? Array.from(menu.querySelectorAll('.menu-item:not(.menu-control)')) as HTMLElement[] : [];

		let startX: number | null, scrollLeft: number, mouseDown: boolean;
		let menuWidth = 0;
		let maxScroll = 0;

		menuItem.forEach((element) => {
			menuWidth += element.offsetWidth;
		});

		container.addEventListener('mousedown', (e) => {
			mouseDown = true;
			startX = e.pageX;
			scrollLeft = parseInt(menu?.style.marginLeft || '0', 10);
			maxScroll = window.innerWidth - menuWidth;
		});

		container.addEventListener('touchstart', (e) => {
			mouseDown = true;
			const touch = e.targetTouches[0];
			startX = touch.pageX;
			scrollLeft = parseInt(menu?.style.marginLeft || '0', 10);
			maxScroll = window.innerWidth - menuWidth;
		});

		container.addEventListener('mouseup', () => {
			mouseDown = false;
		});

		container.addEventListener('touchend', () => {
			mouseDown = false;
		});

		container.addEventListener('mousemove', (e) => {
			if (!startX || !mouseDown || !menu) return;
			if (window.innerWidth < 768) return;
			e.preventDefault();
			const x = e.pageX;
			const walkX = (x - startX) * 1;
			let totalMarginLeft = scrollLeft + walkX;
			if (totalMarginLeft <= maxScroll) {
				totalMarginLeft = maxScroll;
				const menuControlEnd = menu.querySelector('.menu-control.menu-control-end') as HTMLElement | null;
				if (menuControlEnd) {
					menuControlEnd.classList.remove('show');
				}
			} else {
				const menuControlEnd = menu.querySelector('.menu-control.menu-control-end') as HTMLElement | null;
				if (menuControlEnd) {
					menuControlEnd.classList.add('show');
				}
			}
			if (menuWidth < window.innerWidth) {
				const menuControlStart = menu.querySelector('.menu-control.menu-control-start') as HTMLElement | null;
				if (menuControlStart) {
					menuControlStart.classList.remove('show');
				}
			}
			if (maxScroll > 0) {
				const menuControlEnd = menu.querySelector('.menu-control.menu-control-end') as HTMLElement | null;
				if (menuControlEnd) {
					menuControlEnd.classList.remove('show');
				}
			}
			if (totalMarginLeft > 0) {
				totalMarginLeft = 0;
				const menuControlStart = menu.querySelector('.menu-control.menu-control-start') as HTMLElement | null;
				if (menuControlStart) {
					menuControlStart.classList.remove('show');
				}
			} else {
				const menuControlStart = menu.querySelector('.menu-control.menu-control-start') as HTMLElement | null;
				if (menuControlStart) {
					menuControlStart.classList.add('show');
				}
			}
			menu.style.marginLeft = totalMarginLeft + 'px';
		});

		container.addEventListener('touchmove', (e) => {
			if (!startX || !mouseDown || !menu) return;
			if (window.innerWidth < 768) return;
			e.preventDefault();
			const touch = e.targetTouches[0];
			const x = touch.pageX;
			const walkX = (x - startX) * 1;
			let totalMarginLeft = scrollLeft + walkX;
			if (totalMarginLeft <= maxScroll) {
				totalMarginLeft = maxScroll;
				const menuControlEnd = menu.querySelector('.menu-control.menu-control-end') as HTMLElement | null;
				if (menuControlEnd) {
					menuControlEnd.classList.remove('show');
				}
			} else {
				const menuControlEnd = menu.querySelector('.menu-control.menu-control-end') as HTMLElement | null;
				if (menuControlEnd) {
					menuControlEnd.classList.add('show');
				}
			}
			if (menuWidth < window.innerWidth) {
				const menuControlStart = menu.querySelector('.menu-control.menu-control-start') as HTMLElement | null;
				if (menuControlStart) {
					menuControlStart.classList.remove('show');
				}
			}
			if (maxScroll > 0) {
				const menuControlEnd = menu.querySelector('.menu-control.menu-control-end') as HTMLElement | null;
				if (menuControlEnd) {
					menuControlEnd.classList.remove('show');
				}
			}
			if (totalMarginLeft > 0) {
				totalMarginLeft = 0;
				const menuControlStart = menu.querySelector('.menu-control.menu-control-start') as HTMLElement | null;
				if (menuControlStart) {
					menuControlStart.classList.remove('show');
				}
			} else {
				const menuControlStart = menu.querySelector('.menu-control.menu-control-start') as HTMLElement | null;
				if (menuControlStart) {
					menuControlStart.classList.add('show');
				}
			}
			menu.style.marginLeft = totalMarginLeft + 'px';
		});
	}
  
	handleTopMenuControlAction(event: MouseEvent, direction: string) {
		const element = event.currentTarget as HTMLElement;
		const obj = element.closest('.menu') as HTMLElement | null;
		if (!obj) {
			return;
		}

		const objStyle = window.getComputedStyle(obj);
		const bodyStyle = window.getComputedStyle(document.querySelector('body') as HTMLElement);
		const targetCss = bodyStyle.getPropertyValue('direction') == 'rtl' ? 'margin-right' : 'margin-left';
		const marginLeft = parseInt(objStyle.getPropertyValue(targetCss), 10);
		const containerWidth = (document.querySelector('.app-top-menu') as HTMLElement).clientWidth - (document.querySelector('.app-top-menu') as HTMLElement).clientHeight * 2;
		let totalWidth = 0;
		let finalScrollWidth = 0;
		const controlPrevObj = obj.querySelector('.menu-control-start') as HTMLElement | null;
		const controlPrevWidth = controlPrevObj?.clientWidth || 0;
		const controlNextObj = obj.querySelector('.menu-control-end') as HTMLElement | null;
		const controlNextWidth = controlPrevObj?.clientWidth || 0;
		const controlWidth = controlPrevWidth + controlNextWidth;

		const elms = Array.from(obj.querySelectorAll('.menu-item')) as HTMLElement[];
		if (elms) {
			elms.forEach((elm) => {
				if (!elm.classList.contains('.menu-control')) {
					totalWidth += elm.clientWidth;
				}
			});
		}

		switch (direction) {
			case 'next':
				const widthLeftNext = totalWidth + marginLeft - containerWidth;
				if (widthLeftNext <= containerWidth) {
					finalScrollWidth = widthLeftNext - marginLeft - controlWidth;
					setTimeout(() => {
						(obj.querySelector('.menu-control.menu-control-end') as HTMLElement)?.classList.remove('show');
					}, 300);
				} else {
					finalScrollWidth = containerWidth - marginLeft - controlWidth;
				}

				if (finalScrollWidth !== 0) {
					obj.style.transitionProperty = 'height, margin, padding';
					obj.style.transitionDuration = '300ms';
					if (bodyStyle.getPropertyValue('direction') != 'rtl') {
						obj.style.marginLeft = `-${finalScrollWidth}px`;
					} else {
						obj.style.marginRight = `-${finalScrollWidth}px`;
					}
					setTimeout(() => {
						obj.style.transitionProperty = '';
						obj.style.transitionDuration = '';
						(obj.querySelector('.menu-control.menu-control-start') as HTMLElement)?.classList.add('show');
					}, 300);
				}
				break;
			case 'prev':
				const widthLeftPrev = -marginLeft;

				if (widthLeftPrev <= containerWidth) {
					(obj.querySelector('.menu-control.menu-control-start') as HTMLElement)?.classList.remove('show');
					finalScrollWidth = 0;
				} else {
					finalScrollWidth = widthLeftPrev - containerWidth + controlWidth;
				}

				obj.style.transitionProperty = 'height, margin, padding';
				obj.style.transitionDuration = '300ms';

				if (bodyStyle.getPropertyValue('direction') != 'rtl') {
					obj.style.marginLeft = `-${finalScrollWidth}px`;
				} else {
					obj.style.marginRight = `-${finalScrollWidth}px`;
				}

				setTimeout(() => {
					obj.style.transitionProperty = '';
					obj.style.transitionDuration = '';
					(obj.querySelector('.menu-control.menu-control-end') as HTMLElement)?.classList.add('show');
				}, 300);
				break;
		}
	}

}
