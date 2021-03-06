import {Component, ComponentFactoryResolver, ViewChild} from '@angular/core';
import {ModalComponent} from './modal/modal.component';
import {RefDirective} from './ref.directive';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {

  @ViewChild(RefDirective) refDir: RefDirective;

  constructor(
    private resolver: ComponentFactoryResolver,
    private title: Title,
    private meta: Meta) {
    // const t = title.getTitle();
    // console.log(t);
    title.setTitle('App Component Page');
    meta.addTags([
      {name: 'keywords', content: 'angular,google'},
      {name: 'description', content: 'appcomponent'}
    ]);
  }

  showModal(): void {
    const modalFactory = this.resolver.resolveComponentFactory(ModalComponent);
    this.refDir.containerRef.clear();

    const component = this.refDir.containerRef.createComponent(modalFactory);

    component.instance.title = 'Dynamic title';
    component.instance.close.subscribe(() => {
      this.refDir.containerRef.clear();
    });
  }
}
