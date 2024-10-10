import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { Editor } from 'ngx-editor';
import  Tagify  from '@yaireo/tagify';
import Dropzone from 'dropzone';

@Component({
  selector: 'app-producto-detalle',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './producto-detalle.component.html',
  styleUrl: './producto-detalle.component.scss'
})
export class ProductoDetalleComponent{
  dropzone: any;
  editor: Editor = new Editor;
  html: any = "";
  
  constructor(private elementRef: ElementRef) { }
  
  
  ngOnInit() {
    this.editor = new Editor();
  }
  
  ngOnDestroy() {
    this.editor.destroy();
  }

  ngAfterViewInit() {
    this.dropzone = new Dropzone(this.elementRef.nativeElement.querySelector('#cargaProductoImg'), {
      url: '/upload', // Your upload endpoint
      maxFiles: 1,
      acceptedFiles: '.jpg, .jpeg, .png',
      dictDefaultMessage: 'Drop an image or click to upload'
    });

    var tagsElm = [].slice.call(document.querySelectorAll('[data-render="tags"]'));
    
    tagsElm.map(function(tagElm) {
    	new Tagify(tagElm);
    });
  }
  
}
