export class Node {
    constructor(
        private _id: number,
        private _connectionList: Node[],
        private _isRoot: boolean,
        private _initPos: any,
        private _isConnecting: boolean,
        private _currentPos?: any      
    ) {}
    
    public set id(id : number) {
        this._id = id
    }
    
    
    public set connectionList(connectionList : Node[]) {
        this._connectionList = connectionList
    }

    
    public set isRoot(isRoot : boolean) {
        this._isRoot = isRoot
    }
    

    public set initPos(initPos : any) {
        this._initPos = initPos
    }
    

    public set isConnecting(isConnecting : boolean) {
        this._isConnecting = isConnecting
    }


    public set currentPos(currentPos : any) {
        this._currentPos = currentPos
    }
    
    
    public get id() : number {
        return this._id
    }

    
    public get connectionList() : Node[] {
        return this._connectionList
    }


    
    public get isRoot() : boolean {
        return this._isRoot
    }
    
    
    public get initPos() : any {
        return this._initPos
    }

    
    public get isConnecting() : boolean {
        return this._isConnecting
    }
    
    
    public get currentPos() : any {
        return this._currentPos
    }
}
