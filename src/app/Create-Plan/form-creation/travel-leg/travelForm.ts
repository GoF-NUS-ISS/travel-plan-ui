export class Form {

    constructor(
      public title = '',
      public description = '',
      public sendCatalog = false,
      public firstName = '',
      public lastName = '',
      public start = '',
      public reach = '',
      public startingOn = '',
      public returningOn = '',
      public transport = '',
      public bookedTicket = '',
      public yetToBook = '',
      public cost = null,
      public destination = '',
      public street1?: string,
      public street2?: string,
      public city?: string,
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
  