import {Component, ElementRef, HostListener, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-mainheader',
  templateUrl: './mainheader.component.html',
  styleUrls: ['./mainheader.component.css']
})
export class MainheaderComponent implements OnInit,OnDestroy {
  ShowMainisTrue = false;
  ShowManageisTrue = false;
  private userSub: Subscription;
  isAuthenticated = false;

  onToggleMainNavbar () {
    this.ShowMainisTrue = !this.ShowMainisTrue
  }

  onToggleManageNavbar () {
    this.ShowManageisTrue = !this.ShowManageisTrue
  }

  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.ShowManageisTrue = this.elRef.nativeElement.contains(event.target) ? this.ShowManageisTrue : false;
    this.ShowMainisTrue = this.elRef.nativeElement.contains(event.target) ? this.ShowMainisTrue : false;
  }

  constructor(
    private elRef: ElementRef,
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user=>{
      this.isAuthenticated = !!user;
    });
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}