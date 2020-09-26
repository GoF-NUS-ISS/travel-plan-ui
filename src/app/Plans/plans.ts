export interface Plans {
    id: string;
    title: string;
    days ?: [
        {
            date: Date,
            nodes: [
                {
                    type:string,
                    from:string,
                    to:string,
                    startOn:string,
                    returnDate:string,
                    transportMode:string,
                    cost:number
                },
                {
                    type:string,
                    location:string,
                    category:string,
                    timestart:string,
                    timeend:string,
                    cost:number,
                    starRating?:number,
                    reviewdescription?:string
                }
            ]
        }
    ];
  }