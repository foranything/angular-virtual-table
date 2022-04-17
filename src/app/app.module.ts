import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { MatTableModule } from '@angular/material/table';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [AppComponent, TableComponent],
  imports: [BrowserModule, MatTableModule, ScrollingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
