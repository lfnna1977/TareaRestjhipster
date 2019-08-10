import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IClub } from 'app/shared/model/club.model';
import { AccountService } from 'app/core';
import { ClubService } from './club.service';

@Component({
  selector: 'jhi-club',
  templateUrl: './club.component.html'
})
export class ClubComponent implements OnInit, OnDestroy {
  clubs: IClub[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected clubService: ClubService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.clubService
      .query()
      .pipe(
        filter((res: HttpResponse<IClub[]>) => res.ok),
        map((res: HttpResponse<IClub[]>) => res.body)
      )
      .subscribe(
        (res: IClub[]) => {
          this.clubs = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInClubs();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IClub) {
    return item.id;
  }

  registerChangeInClubs() {
    this.eventSubscriber = this.eventManager.subscribe('clubListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
