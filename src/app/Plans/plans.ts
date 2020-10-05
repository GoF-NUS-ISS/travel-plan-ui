export interface Plans {
    id: string;
    title: string;
    days ?: [
        {
            date: string,
            nodes: [
                {
                    type:'leg',
                    from:string,
                    to:string,
                    startOn:string,
                    returnDate:string,
                    transportMode:string,
                    cost:number
                },
                {
                    type:'activity',
                    location:string,
                    category:string,
                    timeStart:string,
                    timeEnd:string,
                    cost:number,
                    rating?:number,
                    review?:string
                }
            ]
        }
    ];
  }