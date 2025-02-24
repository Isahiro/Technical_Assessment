import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api-service/api.service';
import { Person } from '../../models/person';


@Component({
  selector: 'people',
  templateUrl: './people.component.html',
  styleUrl: './people.component.css'
})
export class PeopleComponent implements OnInit {
    isProcessing = true;
    isError = false;
    error: string | undefined = undefined;
    name: string = '';
    people: Array<Person> = new Array<Person>();
    showInput = false;

    constructor (private service: ApiService) {}

    ngOnInit() {
        this.service.getPeople().subscribe((data: any) => {
            if(data) {
                this.people = data.people
                console.log(data);
            }
        });
    }

    cancelInput() {
        this.name = '';
        this.showInput = false;
        this.isError = false;
    }

    revealInput() {
        this.showInput = true;
    }

    savePerson() {
        if (!this.name || this.name == '') {
            this.isError = true;
            this.error = 'Must enter a name to add a person';
            return
        }

        this.isProcessing = true;
        this.service.getPerson(this.name).subscribe((data: any) => {
            if(data && data.person) {
                this.isError = true;
                this.isProcessing = false;
                this.error = 'Person already exists';
            } else if (data && data.success) {
                this.service.createPerson(this.name).subscribe((data: any) => {
                    if (data) {
                        window.location.reload();
                    }
                });
            } else {
                this.error = (data) ? data.message : 'No response from API';
            }
        });
    }
}
