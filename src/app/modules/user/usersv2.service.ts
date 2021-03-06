import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { map, switchMap, tap, timeout, timeoutWith, toArray } from 'rxjs/operators';
import { AppConfig } from 'src/app/app.config';
import { User } from 'src/app/models/user.model';
import { AbstractUserService } from './users.service.abstract';

@Injectable({
  providedIn: 'root'
})
export class Usersv2Service extends AbstractUserService {


  constructor(
    private http: HttpClient,
    private config: AppConfig

  ) {
    super();
  }

  refresh() {
    console.log('refresh');

    this
      .http
      .get<User[]>(this.config.apiendpoint + '/users')
      .pipe(
        switchMap((data: any) => data),
        map((olduser: any) => {
          const u = new User(0, '');
          Object.assign(u, olduser);
          return u;
        }),
        // tap(val => console.log(val)),
        toArray()
      ).subscribe(users => {
        this.users.next(users);
      });
  }

  getUsers(): Observable<Array<User>> {
    return this
      .http
      .get<User[]>(this.config.apiendpoint + '/users')

      .pipe(
        switchMap((data: any) => data),
        map((olduser: any) => {
          const u = new User(0, '');
          Object.assign(u, olduser);
          return u;
        }),
        // tap(val => console.log(val)),
        toArray(),
      )
  }

  addUser(user: User): Observable<Array<User>> {
    return this
      .http
      .post<Array<User>>(this.config.apiendpoint + '/users', user)
  }


}
