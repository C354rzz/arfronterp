import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AppMenuService {
	getAppMenus() {
		return [{
			'icon': 'fa fa-sitemap',
			'title': 'Home',
			'url': '/home'
		},
		{
			'icon': 'fa fa-users',
			'title': 'Clientes',
			'url': '/clientes'
		},
		{
			'icon': 'fa fa-align-left',
			'title': 'Menu Level',
			'url': '/menu',
			'caret': 'true',
			'submenu': [{
				'url': '/menu/1',
				'title': 'Menu 1.1',
				'caret': 'true',
				'submenu': [{
					'url': '/menu/1/1',
					'title': 'Menu 2.1',
					'caret': 'true',
					'submenu': [{
						'url': '/menu/1/1/1',
						'title': 'Menu 3.1',
					},{
						'url': '/menu/1/1/2',
						'title': 'Menu 3.2'
					}]
				},{
					'url': '/menu/1/2',
					'title': 'Menu 2.2'
				},{
					'url': '/menu/1/3',
					'title': 'Menu 2.3'
				}]
			},{
				'url': '/menu/2',
				'title': 'Menu 1.2'
			},{
				'url': '/menu/3',
				'title': 'Menu 1.3'
			}]
		}];
	}
}