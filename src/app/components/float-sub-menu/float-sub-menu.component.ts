import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AppSettings } from 'src/app/service/app-settings.services';

declare var slideToggle: any;

@Component({
  selector: 'app-float-sub-menu',
  templateUrl: './float-sub-menu.component.html',
  styleUrls: ['./float-sub-menu.component.scss']
})
export class FloatSubMenuComponent {
	@Input() menus: any;
	@Input() top: any;
	@Input() left: any;
	@Input() right: any;
	@Input() bottom: any;
	@Input() lineTop: any;
	@Input() lineBottom: any;
	@Input() arrowTop: any;
	@Input() arrowBottom: any;

	@Output() remainAppSidebarFloatSubMenu = new EventEmitter();
	@Output() hideAppSidebarFloatSubMenu = new EventEmitter();
	@Output() calculateFloatSubMenuPosition = new EventEmitter();
expand: any;
	
  constructor(public appSettings: AppSettings) {
  }

	expandCollapseSubmenu(e: { preventDefault: () => void; target: any; }, currentMenu: any, allMenu: any, active: any) {
		e.preventDefault();
		var targetItem = (e.target).closest('.menu-item');
		var target = <HTMLElement>targetItem.querySelector('.menu-submenu');
		slideToggle(target);
		this.calculateFloatSubMenuPosition.emit();
	}

	remainMenu() {
	  this.remainAppSidebarFloatSubMenu.emit(true);
	}

	hideMenu() {
	  this.hideAppSidebarFloatSubMenu.emit(true);
	}
}
