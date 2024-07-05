// для получения данных конкретному юзеру
export interface Module {
  module: string;
  rights: Rights;
  link: string;
}

export interface User {
login: string;
name: string;
scope: Module[];
superAdmin: boolean;
}

export interface Rights {
create: boolean,
read: boolean,
update: boolean,
delete: boolean,
list: boolean
}

// для получения всех модулей и пользователей администратору 

export interface Modules {
id: number,
name: string,
shortName : string
}

export interface Users {
 Users: User[]
}