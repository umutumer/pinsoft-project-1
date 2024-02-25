export interface Products{
    id:number,
    name:string,
    price:number,
    explanation:string,
    category:{
        id:number,
        name:string
    }
    base64Image:string
}
export interface Categories{
    id:number,
    name:string,
}
