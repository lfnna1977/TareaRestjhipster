import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { PlayerSharedModule } from 'app/shared';
import {
  ClubComponent,
  ClubDetailComponent,
  ClubUpdateComponent,
  ClubDeletePopupComponent,
  ClubDeleteDialogComponent,
  clubRoute,
  clubPopupRoute
} from './';

const ENTITY_STATES = [...clubRoute, ...clubPopupRoute];

@NgModule({
  imports: [PlayerSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [ClubComponent, ClubDetailComponent, ClubUpdateComponent, ClubDeleteDialogComponent, ClubDeletePopupComponent],
  entryComponents: [ClubComponent, ClubUpdateComponent, ClubDeleteDialogComponent, ClubDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlayerClubModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
