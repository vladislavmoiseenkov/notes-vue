
export default class {
    constructor(title =  '', description = '', author, date = new Date(), id) {
        this.title = title;
        this.description = description;
        this.author = author;
        this.date = date;
        this.id = id;
    }
};