
export enum Role {
    system = "system",
    user = "user"
}

export enum Model {
    gpt35turbo = "gpt-3.5-turbo",
    gpt4 = "gpt-4",
    gpt4o = "gpt-4o"
}

export interface Message {
    role : Role,
    content : string
}

export interface Query {
    model : Model,
    messages : Message[],
    temperature? : number,
    max_tokens? : number,
    top_p? : number,
    frequency_penalty? : number,
    presence_penalty? : number
}



export interface ChatMessage {
    id : string,
    query : string,
    response : string,
    loading : Boolean
}

export interface GPT {
    id : string,
    name : string,
    systemPrompt : string,
    created : string,
    modified : string,
    chat : ChatMessage[] | [],
    model : Model | string,
    temperature? : number,
    max_tokens? : number,
    top_p? : number,
    frequency_penalty? : number,
    presence_penalty? : number
}

export interface SETTINGS {
    key : string,
    mode : string
}



export interface State {
    activeGpt : {id : string },
    gpts : {gpts : { [key : string] : GPT}},
    settings : SETTINGS
}





  