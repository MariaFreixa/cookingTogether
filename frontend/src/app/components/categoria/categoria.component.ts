import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {
  public categoryId = this.route.snapshot.paramMap.get('id');
  public subscription;
  
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getData();
    console.log(this.categoryId);
  }

  getData() {
    this.subscription = this.route.params.subscribe(params => {
      this.categoryId = params['id'];
      console.log(this.categoryId);
    });
  }

  //To prevent memory leak
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
