import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment'
import { DatePipe } from '@angular/common'
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TransHistoryService {

    constructor(private http: HttpClient, private datePipe: DatePipe) { }

    getTransactionHistory(obj: any) {
        //console.log('dd');
        return this.http.get(`${environment.baseURL}GetTransactionHistory`, { params: obj }).pipe(map((resp: any) => {
            resp.transactions.forEach(item => {
                item.date = this.datePipe.transform(item.startDate, 'dd MMM yyyy');
            });
            return resp.transactions;
        }));
    }
}
