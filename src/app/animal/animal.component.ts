import { Component, OnInit } from '@angular/core';
import {DatabaseService} from '../database.service'

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent implements OnInit {
  animalDB = [];
  section = 1;
  name = '';
  species='';
  eatingGroup = '';
  animalId = '';
  legCount = 0;
  lifeSpan=0;

  constructor(private dbService: DatabaseService) { }

  // Get all Animals
  onGetAnimals() {
    this.dbService.getAnimals().subscribe((data: any[]) => {
      this.animalDB = data;
    });
  }
  // Create a new Animal, POST request
  onSaveAnimal() {
    const obj = {species:this.species, name: this.name,legCount:this.legCount, lifeSpan:this.lifeSpan, eatingGroup: this.eatingGroup};
    this.dbService.createAnimal(obj).subscribe(result => {
      this.changeSection(1);
      this.onGetAnimals();
    });
  }


  onAddAnimal() {
    const obj = {species: this.species, name: this.name,legCount:this.legCount,lifeSpan:this.lifeSpan, eatingGroup: this.eatingGroup};
    this.dbService.addAnimal(obj).subscribe(result => {
      this.changeSection(1);
      this.onGetAnimals();
    });
  }

 //Update Animal
 onUpdateAnimal() {
  const obj = {species:this.species, name: this.name,legCount:this.legCount, lifeSpan:this.lifeSpan, eatingGroup: this.eatingGroup};
  this.dbService.updateAnimal(this.animalId, obj).subscribe(result => {
    this.onGetAnimals();
  });
}

//On filter Animals
onFilterAnimals() {
  this.dbService.filterAnimal().subscribe((data: any[]) => {
    this.animalDB = data;
  });
}

// Delete Animal
onDeleteAnimal(item) {
  this.dbService.deleteAnimal(item._id).subscribe(result => {
    this.onGetAnimals();
  });
}

  // This lifecycle callback function will be invoked with the component get initialized by Angular.
  ngOnInit() {
    this.onGetAnimals();
    }

    changeSection(sectionId) {
      this.section = sectionId;
      this.resetValues();
    }

    resetValues() {
      this.species='';
      this.name = '';
      this.legCount = 0;
      this.lifeSpan = 0;
      this.eatingGroup = '';
      this.animalId = '';
    }

}
