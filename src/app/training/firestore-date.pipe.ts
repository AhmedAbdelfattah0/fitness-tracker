import { Pipe, PipeTransform,Inject, LOCALE_ID, } from '@angular/core';
import {formatDate} from '@angular/common';
 import {firestore} from 'firebase/app';
import Timestamp = firestore.Timestamp;
@Pipe({
  name: 'firestoreDate'
})
export class FirestoreDatePipe implements PipeTransform {

  constructor(@Inject(LOCALE_ID) private locale: string) {
  }

  transform(timestamp: Timestamp, format?: string): string {
      if (!timestamp || !timestamp.toDate) {
          return;
      }
      return formatDate(timestamp.toDate(), format || 'mediumDate', this.locale);
  }
}
