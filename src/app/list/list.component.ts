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

  constructor(private resenaService: ResenaService, private router: Router) { }

  ngOnInit(): void {
    const token = sessionStorage.getItem('session_token');

    if (token) {
      
      this.currentUserId = sessionStorage.getItem('userId'); 
      console.log('Usuario logueado:', this.currentUserId); 
      
      this.resenaService.getResenas(token).subscribe(
        (response) => {
          if (response.resenas) {
            this.resenas = response.resenas;
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
}
