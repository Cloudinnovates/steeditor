import { Injectable } from '@angular/core';
import idb, { DB } from 'idb';
import { from, Observable } from 'rxjs';

// To add a new store you should (in this file):
//   1. Add this Store name to `Stores` type.
//   2. Increment version.
//   3. Add condition which checks if this Store already exists and if not create one.

// (1) Add the Store name for each Store you want to use.
/** Stores available in the application's IndexedDB. */
export type Stores = 'drafts';

/** Simple service used to deal with IndexedDB. */
@Injectable({
  providedIn: 'root'
})
export class IndexedDBService {
  // (2) Increment the version each time you want to add a new Store.
  private readonly dbVersion = 1;
  private readonly dbName = 'steeditor-db';
  private storeName: Stores;

  /**
   * Sets Store to be used in all other operations.
   */
  public useStore(name: Stores): void {
    this.storeName = name;
  }

  public getOne<T>(key: IDBValidKey): Observable<T> {
    return from(
      this.openDB().then(db =>
        db
          .transaction(this.storeName, 'readonly')
          .objectStore(this.storeName)
          .get(key)
      )
    );
  }

  public getAll<T>(): Observable<T[]> {
    return from(
      this.openDB().then(db =>
        db
          .transaction(this.storeName, 'readonly')
          .objectStore(this.storeName)
          .getAll()
      )
    );
  }

  public add(value: any): Observable<IDBValidKey> {
    return from(
      this.openDB().then(db =>
        db
          .transaction('drafts', 'readwrite')
          .objectStore('drafts')
          .add(value)
      )
    );
  }

  public put(value: any): Observable<IDBValidKey> {
    return from(
      this.openDB().then(db =>
        db
          .transaction('drafts', 'readwrite')
          .objectStore('drafts')
          .put(value)
      )
    );
  }

  public delete(key: IDBValidKey): Observable<void> {
    return from(
      this.openDB().then(db =>
        db
          .transaction('drafts', 'readwrite')
          .objectStore('drafts')
          .delete(key)
      )
    );
  }

  private openDB(): Promise<DB> {
    return idb.open(this.dbName, this.dbVersion, upgradeDb => {
      // (3) Add condition for each Store to make sure this Store exists.
      if (!upgradeDb.objectStoreNames.contains('drafts')) {
        upgradeDb.createObjectStore('drafts', {
          keyPath: 'id',
          autoIncrement: true
        });
      }
    });
  }
}