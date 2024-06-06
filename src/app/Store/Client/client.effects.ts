import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ClientService } from 'src/app/services/client.service';
import {
  addClient,
  addClientSuccess,
  deleteClient,
  deleteClientSuccess,
  loadClient,
  loadClientFail,
  loadClientSuccess,
  loadClientbyId,
  loadClientbyIdSuccess,
  openPopup,
  updateClient,
  updateClientSuccess,
} from './client.action';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { showAlert } from '../Common/app.action';

@Injectable()
export class ClientEffects {
  constructor(private action$: Actions, private clientService: ClientService) {}

  _loadClient = createEffect(() =>
    this.action$.pipe(
      ofType(loadClient),
      exhaustMap((action) => {
        return this.clientService.getAll().pipe(
          map((data) => {
            console.log(data);
            return loadClientSuccess({ list: data });
          }),
          catchError((_error) =>
            of(loadClientFail({ errorMessage: _error.message }))
          )
        );
      })
    )
  );

  _addClient = createEffect(() =>
    this.action$.pipe(
      ofType(addClient),
      switchMap((action) => {
        return this.clientService.create(action.inputData).pipe(
          switchMap((data) => {
            return of(
              addClientSuccess({ inputData: action.inputData }),
              showAlert({ message: 'Created Successfuly', resultType: 'pass' })
            );
          }),
          catchError((_error) =>
            of(
              showAlert({
                message: 'Failed to Create Client',
                resultType: 'fail',
              })
            )
          )
        );
      })
    )
  );

  _getClientById = createEffect(() =>
    this.action$.pipe(
      ofType(loadClientbyId),
      exhaustMap((action) => {
        return this.clientService.getById(action.id).pipe(
          map((data) => {
            return loadClientbyIdSuccess({ obj: data });
          }),
          catchError((_error) =>
            of(
              showAlert({
                message: 'Failed to get a client:' + _error.message,
                resultType: 'fail',
              })
            )
          )
        );
      })
    )
  );

  _updateClient = createEffect(() =>
    this.action$.pipe(
      ofType(updateClient),
      switchMap((action) => {
        return this.clientService.update(action.inputData).pipe(
          switchMap((data) => {
            return of(
              updateClientSuccess({ inputData: action.inputData }),
              showAlert({ message: 'Updated Successfuly', resultType: 'pass' })
            );
          }),
          catchError((_error) =>
            of(
              showAlert({
                message: 'Failed to Update Client',
                resultType: 'fail',
              })
            )
          )
        );
      })
    )
  );

  _deleteClient = createEffect(() =>
    this.action$.pipe(
      ofType(deleteClient),
      switchMap((action) => {
        return this.clientService.delete(action.id).pipe(
          switchMap((data) => {
            return of(
              deleteClientSuccess({ id: action.id }),
              showAlert({ message: 'Deleted Successfuly', resultType: 'pass' })
            );
          }),
          catchError((_error) =>
            of(
              showAlert({
                message: 'Failed to Delete Client',
                resultType: 'fail',
              })
            )
          )
        );
      })
    )
  );
}
