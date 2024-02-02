export interface Products{
    id:number,
    name:string,
    price:number,
    explanation:string,
    category:{
        id:number,
        name:string
    }
}
export interface Categories{
    id:number,
    name:string,
}