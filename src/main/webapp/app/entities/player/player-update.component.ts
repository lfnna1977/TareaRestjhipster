import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IPlayer, Player } from 'app/shared/model/player.model';
import { PlayerService } from './player.service';
import { ICountry } from 'app/shared/model/country.model';
import { CountryService } from 'app/entities/country';
import { IClub } from 'app/shared/model/club.model';
import { ClubService } from 'app/entities/club';

@Component({
  selector: 'jhi-player-update',
  templateUrl: './player-update.component.html'
})
export class PlayerUpdateComponent implements OnInit {
  isSaving: boolean;

  countries: ICountry[];

  clubs: IClub[];

  editForm = this.fb.group({
    id: [],
    ci: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(60)]],
    name: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(60)]],
    gender: [null, [Validators.required]],
    position: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(60)]],
    aditionalData: [],
    country: [null, Validators.required],
    club: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected playerService: PlayerService,
    protected countryService: CountryService,
    protected clubService: ClubService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ player }) => {
      this.updateForm(player);
    });
    this.countryService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICountry[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICountry[]>) => response.body)
      )
      .subscribe((res: ICountry[]) => (this.countries = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.clubService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IClub[]>) => mayBeOk.ok),
        map((response: HttpResponse<IClub[]>) => response.body)
      )
      .subscribe((res: IClub[]) => (this.clubs = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(player: IPlayer) {
    this.editForm.patchValue({
      id: player.id,
      ci: player.ci,
      name: player.name,
      gender: player.gender,
      position: player.position,
      aditionalData: player.aditionalData,
      country: player.country,
      club: player.club
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const player = this.createFromForm();
    if (player.id !== undefined) {
      this.subscribeToSaveResponse(this.playerService.update(player));
    } else {
      this.subscribeToSaveResponse(this.playerService.create(player));
    }
  }

  private createFromForm(): IPlayer {
    return {
      ...new Player(),
      id: this.editForm.get(['id']).value,
      ci: this.editForm.get(['ci']).value,
      name: this.editForm.get(['name']).value,
      gender: this.editForm.get(['gender']).value,
      position: this.editForm.get(['position']).value,
      aditionalData: this.editForm.get(['aditionalData']).value,
      country: this.editForm.get(['country']).value,
      club: this.editForm.get(['club']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlayer>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackCountryById(index: number, item: ICountry) {
    return item.id;
  }

  trackClubById(index: number, item: IClub) {
    return item.id;
  }
}
