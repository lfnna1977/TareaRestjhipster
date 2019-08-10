import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'country',
        loadChildren: './country/country.module#PlayerCountryModule'
      },
      {
        path: 'player',
        loadChildren: './player/player.module#PlayerPlayerModule'
      },
      {
        path: 'club',
        loadChildren: './club/club.module#PlayerClubModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlayerEntityModule {}
