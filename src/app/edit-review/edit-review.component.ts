import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-edit-review',
  templateUrl: './edit-review.component.html',
  styleUrls: ['./edit-review.component.css']
})
export class EditReviewComponent implements OnInit {
  resena: any = {};
  currentUserId: string | null = null;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentUserId = sessionStorage.getItem('userId'); 
    const resenaId = this.route.snapshot.paramMap.get('id'); 
    console.log('ID de la reseña recibido:', resenaId); 
    if (resenaId) {
      this.loadReview(resenaId); 
    } else {
      console.error('No se encontró el ID de la reseña en la URL');
      this.router.navigate(['/home']); 
    }
  }

  loadReview(resenaId: string) {
    const url = `http://localhost:9898/api/resenas/${resenaId}`;
    const token = sessionStorage.getItem('session_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get(url, { headers }).subscribe(
      (response: any) => {
        if (response.resena) {
          if (response.resena.usuario !== this.currentUserId) {
            this.router.navigate(['/home']); 
          } else {
            this.resena = response.resena; 
          }
        } else {
          console.error('Reseña no encontrada');
          this.router.navigate(['/home']);
        }
      },
      (error) => {
        console.error('Error al cargar la reseña:', error);
      }
    );
  }

  saveReview() {
    const url = `http://localhost:9898/api/resenas/${this.resena._id}`;
    const token = sessionStorage.getItem('session_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.put(url, this.resena, { headers }).subscribe(
      (response) => {
        console.log('Reseña modificada con éxito:', response);
        this.router.navigate(['/home']); 
      },
      (error) => {
        console.error('Error al modificar la reseña:', error);
      }
    );
  }
}
