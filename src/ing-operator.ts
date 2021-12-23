import { catchError, finalize, Observable } from 'rxjs';
import { Ing } from './ing-class';

/**
 * Handles state of Observable and sets it to a passed Ing object.
 *
 * Create Ing instance, start it before request `ing.start()` and pass it to this operator.
 * Place the operator in a pipe after the last async operator (switchMap etc) to properly handle the error state.
 */
export function ing<T = any>(ing: Ing) {
  return (source: Observable<T>): Observable<T> => {
    return source
      .pipe(
        catchError(err => {
          ing.fail();
          throw err;
        }),
        finalize(() => {
          if (ing.ongoing) {
            ing.success();
          }
        }),
      );
  };
}
