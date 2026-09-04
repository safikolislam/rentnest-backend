export const validateRegistrationInput = (data:any)=>{
    const errors:string[] = [];
    if(!data.name || data.name.trim().length < 2){
        errors.push("Name must be at least 2 Characters")
    }
    if(!data.email || !data.email.includes("@")){
        errors.push("Invalid email format");

    }

    if(!data.password || data.password.length < 6){
        errors.push("Password must be at least 6 characters")
    }
    if(!data.role || (data.role !== "TENANT" && data.role !== "LANDLORD")){
      errors.push("Role must be TENANT or LANDLORD")
    }
    return errors;
}



export const validateLoginInput = (data:any)=>{
    const errors:string[] =[];
    if(!data.email || !data.email.includes("@")){
        errors.push("Invalid email format")
    }

    if(!data.password){
        errors.push("Password is required")
    }
    return errors;
}