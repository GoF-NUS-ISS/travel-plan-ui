export interface Plans {
    id: number;
    title: string;
    day?: [
        {
            travel: [
                {
                    from:string,
                    to:string,
                    tripstart:string,
                    return:string,
                    travelcost:number,
                    transport:string
                }
            ],
            activity: [
                {
                    location:string,
                    category:string,
                    timestart:string,
                    timeend:string,
                    cost:number,
                    starRating?:number,
                    reviewdescription?:string
                }
            ];
        }
    ];
  }