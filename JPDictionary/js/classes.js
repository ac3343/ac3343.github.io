class Vocab{
    constructor(kanji, hirakata, english, pos, entryTime){
        this.kanji = kanji;
        this.hirakata = hirakata;
        this.english = english;
        this.pos = pos;
        this.entryTime = entryTime;
    }
}

class Kanji{
    constructor(character, kun, on, english, entryTime){
        this.character = character;
        this.kun = kun;
        this.english = english;
        this.on = on;
        this.entryTime = entryTime;
    }
}