import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PlayerSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [PlayerSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [PlayerSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlayerSharedModule {
  static forRoot() {
    return {
      ngModule: PlayerSharedModule
    };
  }
}
