import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { PlayerSharedModule } from 'app/shared';
import {
  PlayerComponent,
  PlayerDetailComponent,
  PlayerUpdateComponent,
  PlayerDeletePopupComponent,
  PlayerDeleteDialogComponent,
  playerRoute,
  playerPopupRoute
} from './';

const ENTITY_STATES = [...playerRoute, ...playerPopupRoute];

@NgModule({
  imports: [PlayerSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [PlayerComponent, PlayerDetailComponent, PlayerUpdateComponent, PlayerDeleteDialogComponent, PlayerDeletePopupComponent],
  entryComponents: [PlayerComponent, PlayerUpdateComponent, PlayerDeleteDialogComponent, PlayerDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlayerPlayerModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
