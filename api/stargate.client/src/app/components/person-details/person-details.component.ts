import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api-service/api.service';
import { Person } from '../../models/person';
import { AstronautDuty } from '../../models/astronaut-duty';


@Component({
  selector: 'person-details',
  templateUrl: './person-details.component.html',
  styleUrl: './person-details.component.css'
})
export class PersonDetailsComponent implements OnInit {
    person: Person = new Person();
    duties: AstronautDuty[] | undefined;
    dutyTitle: string = '';
    dutyRank: string = '';
    dutyStartDate: Date = new Date();
    isTitleError = false;
    isRankError = false;
    errors: string[] = [];

    constructor(private route: ActivatedRoute, private router: Router, private service: ApiService) {}

    ngOnInit() {
        let name = this.route.snapshot.paramMap.get('name');
        
        if (name) {
            this.person.name = name;

            this.service.getDuties(name).subscribe((data: any) => {
                if(data) {
                    this.person = data.person;
                    this.duties = (data.astronautDuties && data.astronautDuties.length > 0) ? data.astronautDuties : undefined;
                    console.log(data);
                }
            });
        }        
    }

    createDuty() {
        let inputsValid = true;
        this.errors = []

        if(!this.dutyTitle) {
            inputsValid = false;
            this.isTitleError = true;
            this.errors.push('Must have a valid title');
        }

        if(!this.dutyRank) {
            inputsValid = false;
            this.isRankError = true;
            this.errors.push('Must have a valid rank');
        }

        if (inputsValid) {
            let newDuty = new AstronautDuty(this.person.name, this.dutyTitle, this.dutyRank, this.dutyStartDate);
            this.service.createDuty(newDuty).subscribe((data: any) => {
                if (data) {
                    if (data.success) {
                        window.location.reload();
                    } else {
                        this.errors.push(data.message)
                    }
                }
            })
        }
    }
}
