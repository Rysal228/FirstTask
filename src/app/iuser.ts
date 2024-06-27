export interface Module {
    name: string;
    rights: string[];
  }
  
  export interface User {
    id: number;
    email: string;
    role: string;
    password: string;
    modules: Module[];
  }
  