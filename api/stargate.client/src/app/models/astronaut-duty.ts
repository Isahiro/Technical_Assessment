export class AstronautDuty {
    name: string = ''
    rank: string = '';
    dutyTitle: string = '';
    dutyStartDate: Date = new Date();
    dutyEndDate?: Date;

    constructor(name: string, rank: string, title: string, startDate: Date) {
        this.name = name;
        this.rank = rank;
        this.dutyTitle = title;
        this.dutyStartDate = startDate;
    }
}