export class HomeTechnology{
    id:string;
    name :string;
    atDescription: string;
    imageUrl : string;
    benefits: string;
    wlearn: string;
    requirement: string;

    constructor(id:string , name :string, description :string , imageUrl :string, wlearn: string , requirement: string,
        benefits:string){
        
        id=this.id;
        name = this.name ;
        description = this.atDescription;
        imageUrl =this.imageUrl;
        benefits= this.benefits;
        requirement = this.requirement;
        wlearn = this.wlearn;
    
    }
}