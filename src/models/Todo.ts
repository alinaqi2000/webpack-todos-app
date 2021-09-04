export default class Todo {
    constructor(
        public id: number,
        public title: string,
        public status: "pending" | "completed",
        public completeAt: Date,
    ) {

    }
}