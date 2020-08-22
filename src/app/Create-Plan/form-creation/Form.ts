export class Form {

    constructor(
      public title = '',
      public description = '',
      public sendCatalog = false,
      public firstName = '',
      public lastName = '',
      public source = '',
      public destination = '',
      public startingOn = '',
      public returningOn = '',
      public addressType = 'home',
      public street1?: string,
      public street2?: string,
      public city?: string,
      public state = '',
      public zip?: string) { }
  }
  