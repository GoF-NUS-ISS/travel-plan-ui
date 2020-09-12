export class TravelForm {

    constructor(
      public start?: string,
      public reach?: string,
      public startingOn?: string,
      public returningOn?: string,
      public transport?: string,
      public bookedTicket?: string,
      public yetToBook?: string,
      public cost?: null,
      public destination = '',
      // public street1?: string,
      // public street2?: string,
      // public city?: string,
      public othertransport = '',
      public zip?: string) { }
  }
  // start: string;
  // reach: string;
  // startingOn: Date;
  // returningOn: Date;
  // cost: number;
  // transport: string;
  // othertransport: string;
  