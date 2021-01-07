import {fakeAsync, flush, flushMicrotasks, tick} from '@angular/core/testing';
import {of} from 'rxjs';
import {delay} from 'rxjs/operators';

describe('Async Test Example', () => {
  it('Async test example with jasmine done()', (done: DoneFn) => {
    let test = false;
    setTimeout(() => {
      test = true;
      expect(test).toBeTruthy();
      done();
    }, 1000);
  });

  it('Async test example with setTimeout() ', fakeAsync(() => {
    let test = false;
    setTimeout(() => {
      test = true;
    }, 1000);
    flush();
    expect(test).toBeTrue();
  }));

  it('Async test example with Promise', fakeAsync(() => {
    let test = false;
    Promise.resolve().then(() => {
      test = true;
    });
    flushMicrotasks();
    expect(test).toBeTrue();
  }));

  it('Async test example with Promise + setTimeout', fakeAsync(() => {
    let counter = 0;
    Promise.resolve().then(() => {
      counter += 10;
      setTimeout(() => {
        counter += 1;
      }, 1000);
    });
    expect(counter).toBe(0);
    flushMicrotasks();
    expect(counter).toBe(10);
    tick(500);
    expect(counter).toBe(10);
    tick(500);
    expect(counter).toBe(11);
  }));

  it('test example - Observable', fakeAsync(() => {
    let test = false;
    const test$ = of(test).pipe(delay(1000));
    test$.subscribe(() => {
      test = true;
    });
    tick(1000);
    expect(test).toBeTrue();
  }));
});