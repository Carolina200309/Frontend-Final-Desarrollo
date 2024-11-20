import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  review = {
    nombreRestaurante: '',
    calificacion: 1,
    comentario: ''
  };

  
  constructor(private http: HttpClient, private router: Router) {}

  submitReview() {
    const url = 'http://localhost:9898/api/resenas'; 
    const token = sessionStorage.getItem('session_token'); 

    if (!token) {
      console.error('Token no encontrado. Por favor, inicia sesión nuevamente.');
      return;
    }

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`); 

    const body = {
      nombreRestaurante: this.review.nombreRestaurante,
      calificacion: this.review.calificacion,
      comentario: this.review.comentario
    };

    this.http.post(url, body, { headers }).subscribe(
      (response) => {
        console.log('Reseña enviada con éxito:', response);
        
        
        this.review = {
          nombreRestaurante: '',
          calificacion: 1,
          comentario: ''
        };

        
        this.refreshResenas();
      },
      (error) => {
        console.error('Error al enviar la reseña:', error);
      }
    );
  }

  
  refreshResenas() {
    const url = 'http://localhost:9898/api/resenas';
    const token = sessionStorage.getItem('session_token');

    if (!token) {
      console.error('Token no encontrado. Por favor, inicia sesión nuevamente.');
      return;
    }

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    this.http.get(url, { headers }).subscribe(
      (response: any) => {
        if (Array.isArray(response)) {
          
          console.log('Reseñas actualizadas:', response);
        } else {
          console.error('La respuesta no contiene un arreglo de reseñas.');
        }
      },
      (error) => {
        console.error('Error al obtener las reseñas:', error);
      }
    );
  }

 
  goToHome() {
    this.router.navigate(['/home']);  
  }
}
