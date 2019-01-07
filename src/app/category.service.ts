import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { GetFireList } from './common/query-afdb';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { 

  }

  getAll() {
    return GetFireList(this.db.list('/categories', ref => ref.orderByChild('value')));
  }
}
