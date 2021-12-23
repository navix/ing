# 🦥 Ing

Simple async state container for RxJS and Angular.

## Features

* Stores multiple async operation states: New, Ongoing, Succeed, Failed.
* Gives `Observable` with the state and one-time subscription methods.
* Has a helper operator for RxJS integration.
* Adapted for using in Angular templates.
* Easily integrates with you custom services and components.
* Has no additional dependencies and complex abstractions.


## Installation

```
$ npm i @novyk/ing
```


## Usage

#### Create instance of container

```
import { ing, Ing } from '@novyk/ing';
...

component MyCompontent {
  loading = new Ing();
  ...
}
```

#### Handle state when making requests

```
import { ing, Ing } from '@novyk/ing';
...

component MyCompontent {
  ...
  loadData() {
    this.loading.start();
    this.dataService
      .load()
      .pipe(
        ing(this.loading),
      )
      ...
  }
}
```

#### Use container in templates

```
<div *ngIf="loading.ongoing">
  Data is loading...
</div>
<div *ngIf="loading.succeed">
  ...
</div>
```

Or subscribe to streams to improve performance: 

```
<div *ngIf="loading.ongoing$ | async">
  Data is loading...
</div>
<div *ngIf="loading.succeed$ | async">
  ...
</div>
```

Using `ngSwitch`:

```
<div [ngSwitch]="loading.status$ | async">
  <ng-template ngSwitchCase="Ongoing">
    Data is loading...
  </ng-template>
  <ng-template ngSwitchCase="Succeed">
    ...
  </ng-template>
  <ng-template ngSwitchCase="Failed">
    Data loading failed!
  </ng-template>
</div>
```

### TODO

* [ ] .npmignore
* [ ] tests
* [ ] CI release 
