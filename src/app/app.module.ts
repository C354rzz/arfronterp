//Core Module
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule }               from '@angular/platform-browser/animations';
import { BrowserModule, Title }                  from '@angular/platform-browser';
import { HttpClientModule }                      from '@angular/common/http';
import { AppRoutingModule }                      from './app-routing.module';
import { NgModule }                              from '@angular/core';
import { FormsModule, ReactiveFormsModule }      from '@angular/forms';

//Main Component
import { AppComponent }                         from './app.component';
import { PanelComponent }                       from './components/panel/panel.component';
import { HeaderComponent }                      from './components/header/header.component';
import { FloatSubMenuComponent }                from './components/float-sub-menu/float-sub-menu.component';
import { SidebarComponent }                     from './components/sidebar/sidebar.component';
import { SidebarRightComponent }                from './components/sidebar-right/sidebar-right.component';
import { TopMenuComponent }                     from './components/top-menu/top-menu.component';
import { ThemePanelComponent }                  from './components/theme-panel/theme-panel.component';

//Component Module
import { NgScrollbarModule, NG_SCROLLBAR_OPTIONS } from 'ngx-scrollbar';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { NgxDatatableModule } from '@swimlane/ngx-datatable'

//Pages
import { HomePage } from './pages/home/home';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ClienteDetalleComponent } from './pages/clientes/cliente-detalle/cliente-detalle.component'; 
import { DireccionesComponent } from './pages/clientes/direcciones/direcciones.component'; 

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    SidebarRightComponent,
    TopMenuComponent,
    PanelComponent,
    FloatSubMenuComponent,
    ThemePanelComponent,
    HomePage,
    ClientesComponent,
    ClienteDetalleComponent,
    DireccionesComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgScrollbarModule,

    // plugins
    HighlightModule,
    NgxDatatableModule.forRoot({
      messages: {
        emptyMessage: 'No data to display', // Message to show when array is presented, but contains no values
        totalMessage: 'total', // Footer total message
        selectedMessage: 'selected' // Footer selected message
      }
    })
  ],
  providers: [ Title, {
		provide: NG_SCROLLBAR_OPTIONS,
		useValue: {
			visibility: 'hover'
		}
  }, {
		provide: HIGHLIGHT_OPTIONS,
		useValue: {
			coreLibraryLoader: () => import('highlight.js/lib/core'),
			languages: {
				typescript: () => import('highlight.js/lib/languages/typescript'),
				css: () => import('highlight.js/lib/languages/css'),
				xml: () => import('highlight.js/lib/languages/xml')
			}
		}
	}],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private router: Router, private titleService: Title, private route: ActivatedRoute) {
    router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        var title = 'Front ERP | '+ this.route.snapshot.firstChild?.data['title'];
        this.titleService.setTitle(title);
      }
    });
  }
}
