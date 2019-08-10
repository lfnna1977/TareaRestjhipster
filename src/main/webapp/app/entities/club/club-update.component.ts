import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IClub, Club } from 'app/shared/model/club.model';
import { ClubService } from './club.service';

@Component({
  selector: 'jhi-club-update',
  templateUrl: './club-update.component.html'
})
export class ClubUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(60)]],
    city: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(60)]],
    telephone: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(60)]],
    numSocios: []
  });

  constructor(protected clubService: ClubService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ club }) => {
      this.updateForm(club);
    });
  }

  updateForm(club: IClub) {
    this.editForm.patchValue({
      id: club.id,
      name: club.name,
      city: club.city,
      telephone: club.telephone,
      numSocios: club.numSocios
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const club = this.createFromForm();
    if (club.id !== undefined) {
      this.subscribeToSaveResponse(this.clubService.update(club));
    } else {
      this.subscribeToSaveResponse(this.clubService.create(club));
    }
  }

  private createFromForm(): IClub {
    return {
      ...new Club(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      city: this.editForm.get(['city']).value,
      telephone: this.editForm.get(['telephone']).value,
      numSocios: this.editForm.get(['numSocios']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IClub>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
