import { Component, OnInit } from '@angular/core';
import { ResenaService } from '../resena.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  resenas: any[] = [];
  currentUserId: string | null = null;

  constructor(private resenaService: ResenaService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    const token = sessionStorage.getItem('session_token');

    if (token) {

      this.currentUserId = sessionStorage.getItem('userId');
      console.log('Usuario logueado:', this.currentUserId);

      this.resenaService.getResenas(token).subscribe(
        (response) => {
          if (response.reseñas) {
            this.resenas = response.reseñas;
            this.resenas.forEach(resena => {
              console.log('ID de usuario en la reseña:', resena.usuario);
            });

          } else {
            console.error('La respuesta no contiene un arreglo de reseñas.');
          }
        },
        (error) => {
          console.error('Error al obtener las reseñas:', error);
        }
      );
    } else {
      console.error('Token no encontrado');
    }
  }


  editReview(resenaId: string) {
    console.log('ID de la reseña a editar:', resenaId);
    this.router.navigate(['/edit', resenaId]);
  }

  deleteReview(resenaId: string) {
    console.log('ID de la reseña a eliminar:', resenaId);
    const url = `http://localhost:9898/api/resenas/${resenaId}`;
    const token = sessionStorage.getItem('session_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.delete(url, { headers }).subscribe(
      (response: any) => {
        if (!response.reseñaEliminada) {
          console.error('No se pudo eliminar la reseña');
          return;
        }
        console.log('Reseña eliminada:', response.reseñaEliminada);
        this.resenas = this.resenas.filter(resena => resena._id !== resenaId);

      },
      (error) => {
        console.error('Error al eliminar la reseña:', error);
      }
    );
  }
}
