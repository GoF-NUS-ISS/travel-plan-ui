export interface Plans {
    id: string;
    name:string;
    title: string;
    days ?: [
        {
            date: Date,
            nodes: [
                {
                    type:string,
                    from?:string,
                    to?:string,
                    startOn?:string,
                    returnDate?:string,
                    transportMode?:string,
                    cost?:number,
                    location?:string,
                    category?:string,
                    timeStart?:string,
                    timeEnd?:string,
                    costActivity?:number,
                    rating?:number,
                    review?:string
                }
                // {
                //     type:'leg',
                //     from:string,
                //     to:string,
                //     startOn:string,
                //     returnDate:string,
                //     transportMode:string,
                //     cost:number
                // },
                // {
                //     type:'activity',
                //     location:string,
                //     category:string,
                //     timeStart:string,
                //     timeEnd:string,
                //     cost:number,
                //     rating?:number,
                //     review?:string
                // }
            ]
        }
    ];
  }