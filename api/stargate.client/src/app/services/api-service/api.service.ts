import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AstronautDuty } from "../../models/astronaut-duty";
import { Person } from "../../models/person";

@Injectable({
    providedIn: 'root',
  })
export class ApiService {
    constructor(private http: HttpClient) {}

    createDuty(duty: AstronautDuty) {
        return this.http.post('astronautDuty', duty);
    }

    createPerson(name: string) {
        var headers = new HttpHeaders({
            "Content-Type": "application/json",
            "Accept": "application/json"
        });

        return this.http.post('person', `"${name}"`, {headers});
    }

    getDuties(name: string) {
        return this.http.get(`astronautDuty/${name}`);
    }

    getPeople() {
        return this.http.get('person')
    }

    getPerson(name: string) {
        return this.http.get(`person/${name}`);
    }
}