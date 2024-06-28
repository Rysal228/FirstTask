export interface Module {
    name: string;
    rights: string[];
  }
  
  export interface User {
    id: number;
    login: string;
    role: string;
    password: string;
    modules: Module[];
  }
  