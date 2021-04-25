import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'

import { TransHistoryService } from './trans-history.service'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'one-banc-assignment';
    historyData: Array<any> = [];
    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(private historyService: TransHistoryService) { }

    ngOnInit() {
        this.getHistoryData();
    }

    getHistoryData() {
        let obj = {
            userId: 1,
            recipientId: 2
        }
        this.historyService.getTransactionHistory(obj)
            .pipe(takeUntil(this.destroy$))
            .subscribe((resp: any) => {
                resp = resp.reduce((p, c) => (p[c.date] = [...p[c.date] || [], c], p), []);
                for (const [key, value] of Object.entries(resp)) {
                    this.historyData.push({
                        date: key,
                        items: value
                    })
                }
            })
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.complete();
    }
}
