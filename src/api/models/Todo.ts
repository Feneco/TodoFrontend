type Todo = {
    id           : number;
    name         : string;
    description ?: string;
    pub_date     : Date;
    to_date     ?: Date;
    done         : boolean;
}

export default Todo;