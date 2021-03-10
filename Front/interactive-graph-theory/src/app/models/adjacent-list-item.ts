export class AdjacentListItem {
   
    constructor(
        private _nodeId: number,
        private _cost: number
    ){}

    public get cost(): number {
        return this._cost;
    }
    public set cost(value: number) {
        this._cost = value;
    }
    public get nodeId(): number {
        return this._nodeId;
    }
    public set nodeId(value: number) {
        this._nodeId = value;
    }


}
