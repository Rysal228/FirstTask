export interface Module {
    module: string;
    rights: Rights;
    link: string;
  }
  
export interface User {
  login: string;
  name: string;
  scope: Module[];
}

export interface Rights {
  create: boolean,
  read: boolean,
  update: boolean,
  delete: boolean,
  list: boolean
}
    // export interface User {
  //   login: string;
  //   role: string;
  //   pass: string;
  //   name: string;
  //   scope: Module[];
  // }