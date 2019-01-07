import { AngularFireObject, AngularFireList } from 'angularfire2/database';
import { map } from 'rxjs/operators';


export function GetFireObject(afdbObject: AngularFireObject<any>) {
    return afdbObject.snapshotChanges().pipe(
        map((a: any) => Object.assign({}, {key: a.key}, a.payload.val()))
      )
}

export function GetFireList(afdbList: AngularFireList<any>) {
    return afdbList.snapshotChanges().pipe(
        map(actions => actions.map(a => 
          (Object.assign({}, {key: a.key}, a.payload.val()))
        ))
      )
}