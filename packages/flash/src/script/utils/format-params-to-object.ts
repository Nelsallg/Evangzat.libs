

export class FormatParamsToObject
{
    static ACCEPTED_PARAMS: Array<string> = [];
    protected properties: Object = {};

    public constructor(...params:Array<any>){
        this.properties = {};
        if(FormatParamsToObject.ACCEPTED_PARAMS.length>0){
            FormatParamsToObject.ACCEPTED_PARAMS.forEach(key => {
                params.forEach(param => {
                    if(undefined !== param[0] && param[0].hasOwnProperty(key)){
                        Object.assign(this.properties,{[key]:param[0][key]})
                    }
                });
            });
        }
    }

    public getProperties(): any{
        return this.properties;
    }
}