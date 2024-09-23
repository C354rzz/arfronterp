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
			'icon': 'fa fa-basket-shopping',
			'title': 'Ventas',
			'url': '/',
			'caret': 'true',
			'submenu': [{
				'url': '/cotizaciones',
				'title': 'Cotizaciones'
			},{
				'url': '/ventas',
				'title': 'Ventas',
			}]
		},
		{
			'icon': 'fa fa-chart-line',
			'title': 'Reportes',
			'url': '/',
			'caret': 'true',
			'submenu': [{
				'url': '/reporteVentas',
				'title': 'Reporte Ventas',
			},{
				'url': '/reporteProductos',
				'title': 'Reporte Productos'
			},{
				'url': '/reporteInventarios',
				'title': 'Reporte Inventarios'
			},{
				'url': '/reporteCotizaciones',
				'title': 'Reporte Cotizaciones'
			}]
		},
		{
			'icon': 'fa fa-users',
			'title': 'Clientes',
			'url': '/',
			'caret': 'true',
			'submenu': [{
				'url': '/clientes',
				'title': 'Lista de Clientes',
			},{
				'url': '/clientesDirecciones',
				'title': 'Direcciones'
			}]
		},
		{
			'icon': 'fa fa-tags',
			'title': 'Productos',
			'url': '/',
			'caret': 'true',
			'submenu': [{
				'url': '/productos',
				'title': 'Lista de Productos',
			},{
				'url': '/paquetes',
				'title': 'Listas Paquetes'
			}]
		},
		{
			'icon': 'fa fa-warehouse',
			'title': 'Inventarios',
			'url': '/',
			'caret': 'true',
			'submenu': [{
				'url': '/bodegas',
				'title': 'Bodegas',
			},{
				'url': '/historial',
				'title': 'Historial Movimientos'
			}]
		},
		{
			'icon': 'fa fa-gears',
			'title': 'Administración',
			'url': '/',
			'caret': 'true',
			'submenu': [{
				'url': '/adminstracion',
				'title': 'Sistema',
			},{
				'url': '/empleados',
				'title': 'Empleados'
			},{
				'url': '/roles',
				'title': 'Permisos'
			}]
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