class Data{
    constructor(url){
        this.url = url;
    }

    async get(){
        const res = await fetch(this.url);
        const data = await res.json();
        return data;
    }
}