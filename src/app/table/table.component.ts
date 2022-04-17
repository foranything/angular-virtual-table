import { Component, Inject, OnInit } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TableVirtualScrollStrategy } from './virtualScrollStrategy.service';
import { VIRTUAL_SCROLL_STRATEGY } from '@angular/cdk/scrolling';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' }
];

@Component({
  selector: 'app-table-component',
  templateUrl: 'table.template.html',
  providers: [
    {
      provide: VIRTUAL_SCROLL_STRATEGY,
      useClass: TableVirtualScrollStrategy
    }
  ]
})
export class TableComponent implements OnInit {
  static BUFFER_SIZE = 3;

  rowHeight = 48;

  headerHeight = 56;

  rows: Observable<PeriodicElement[]> = of([...ELEMENT_DATA, ...ELEMENT_DATA]);

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  dataSource!: Observable<PeriodicElement[]>;

  constructor(
    @Inject(VIRTUAL_SCROLL_STRATEGY)
    private readonly scrollStrategy: TableVirtualScrollStrategy
  ) {}

  gridHeight = 400;

  ngOnInit(): void {
    const range =
      Math.ceil(this.gridHeight / this.rowHeight) + TableComponent.BUFFER_SIZE;
    this.scrollStrategy.setScrollHeight(this.rowHeight, this.headerHeight);

    this.dataSource = combineLatest([
      this.rows,
      this.scrollStrategy.scrolledIndexChange
    ]).pipe(
      map((value) => {
        const start = Math.max(0, value[1] - TableComponent.BUFFER_SIZE);
        const end = Math.min(value[0].length, value[1] + range);

        return value[0].slice(start, end);
      })
    );
  }
}
