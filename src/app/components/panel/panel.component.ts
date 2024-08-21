import { Component, ViewChild, AfterViewInit } 		 from '@angular/core';

@Component({
  selector: 'panel',
  inputs: ['title', 'variant', 'noBody', 'noButton', 'headerClass', 'bodyClass', 'footerClass', 'panelClass'],
  templateUrl: './panel.component.html'
})

export class PanelComponent implements AfterViewInit {
  @ViewChild('panelFooter', { static: false }) panelFooter: any;
  expand = false; 
  reload = false;
  collapse = false;
  remove = false;
  showFooter = false;
  panelClass: any;
  variant: any;
  headerClass: any;
  title: any;
  noButton: any;
  bodyClass: any;
  noBody: any;
  footerClass: any;
  
  ngAfterViewInit() {
    setTimeout(() => {
      this.showFooter = (this.panelFooter) ? this.panelFooter.nativeElement && this.panelFooter.nativeElement.children.length > 0 : false;
    });
  }

  panelExpand() {
    this.expand = !this.expand;
  }
  panelReload() {
    this.reload = true;

    setTimeout(() => {
      this.reload = false;
    }, 1500);
  }
  panelCollapse() {
    this.collapse = !this.collapse;
  }
  panelRemove() {
    this.remove = !this.remove;
  }
}
