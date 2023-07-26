type Todo = {
    id          : number;
    name        : string;
    description?: string;
    pub_date    : Date;
    to_date    ?: Date | null;
    done        : boolean;
}

export default Todo;