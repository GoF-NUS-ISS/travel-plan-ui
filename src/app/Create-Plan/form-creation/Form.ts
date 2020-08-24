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
      public source = '',
      public destination = '',
      public street1?: string,
      public street2?: string,
      public city?: string,
      public state = '',
      public zip?: string) { }
  }
  