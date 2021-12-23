import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * Manually stores async state.
 * Use with `ing()` operator in rxjs pipes.
 */
export class Ing {
  private _status = new BehaviorSubject<'New' | 'Ongoing' | 'Succeed' | 'Failed'>(
    'New',
  );

  get new() {
    return this._status.value === 'New';
  }

  get ongoing() {
    return this._status.value === 'Ongoing';
  }

  /**
   * Action completed with no errors.
   */
  get succeed() {
    return this._status.value === 'Succeed';
  }

  get failed() {
    return this._status.value === 'Failed';
  }

  get status$() {
    return this._status.asObservable();
  }

  get ongoing$() {
    return this._status.pipe(
      filter(s => s === 'Ongoing'),
    );
  }

  get succeed$() {
    return this._status.pipe(
      filter(s => s === 'Succeed'),
    );
  }

  get failed$() {
    return this._status.pipe(
      filter(s => s === 'Failed'),
    );
  }

  start() {
    this._status.next('Ongoing');
  }

  success() {
    this._status.next('Succeed');
  }

  fail() {
    this._status.next('Failed');
  }

  /**
   * Stop state observable for graceful destroy.
   */
  drop() {
    this._status.complete();
  }
}
