import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-side-nav-list',
  templateUrl: './side-nav-list.component.html',
  styleUrls: ['./side-nav-list.component.css']
})
export class SideNavListComponent implements OnInit {
  @Output('onCloseSidenav') onCloseSidenav = new EventEmitter<void>()

  constructor() { }

  ngOnInit(): void {
  }
  onClose() {
    this.onCloseSidenav.emit();
  }
}
