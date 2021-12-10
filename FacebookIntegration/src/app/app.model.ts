export class AppModel {
    
    public Name: String;
    public MinAge: String;
    public MaxAge: String;
    public Country: String;
    public Gender: String;

        constructor(                  
            Name: String,           
            MinAge: String,
            MaxAge: String,
            Country: String,
            Gender: String,    

                ) {
                    
                    this.Name = Name;
                    this.MinAge = MinAge;
                    this.MaxAge = MaxAge;
                    this.Country = Country;
                    this.Gender= Gender;

    }
}
