export interface Module {
    name: string;
    rights: string[];
  }
  
  export interface User {
    id: number;
    login: string;
    role: string;
    pass: string;
    name: string;
    scope: Module[];
  }
  