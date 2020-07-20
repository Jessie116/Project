import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {

  constructor(private http: HttpClient) {
  }

  result: any;

  getAnimals() {
    const url = '/animal'
    return this.http.get(url);
  }

  getAnimal(id: string) {
    const url = '/' + id;
    return this.http.get(url);
  }
  
  filterAnimal(){
   return this.http.get('/filter');
 }
  createAnimal(data) {
    return this.http.post('/add', data, httpOptions);
  }

  updateAnimal(id, data) {
    const url = '/update/' + id;
    return this.http.put(url, data, httpOptions);
  }

  deleteAnimal(id) {
    const url = '/' + id;
    return this.http.delete(url, httpOptions);
  }

  addAnimal(data) {
    return this.http.put('/' + data.name, httpOptions);
  }

  
}