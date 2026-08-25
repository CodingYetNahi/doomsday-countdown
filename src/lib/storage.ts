export type DailyResult={answered?:number;correct?:boolean;score?:number;streak?:number}
const prefix='doomsday-daily:'
const memory=new Map<string,string>()
function browserStorage(kind:'local'|'session'='local'):Storage|undefined{try{const value=kind==='local'?globalThis.localStorage:globalThis.sessionStorage;const probe=prefix+'probe';value.setItem(probe,'1');value.removeItem(probe);return value}catch{return undefined}}
export function safeGet(key:string,kind:'local'|'session'='local'){try{return browserStorage(kind)?.getItem(key)??memory.get(`${kind}:${key}`)??null}catch{return memory.get(`${kind}:${key}`)??null}}
export function safeSet(key:string,value:string,kind:'local'|'session'='local'){memory.set(`${kind}:${key}`,value);try{const storage=browserStorage(kind);storage?.setItem(key,value);return Boolean(storage)}catch{return false}}
export function readResult(key:string,storage:Pick<Storage,'getItem'>|undefined=storageAvailable()):DailyResult|undefined{try{const raw=storage?.getItem(prefix+key);return raw?JSON.parse(raw) as DailyResult:undefined}catch{return undefined}}
export function writeResult(key:string,value:DailyResult,storage:Pick<Storage,'setItem'>|undefined=storageAvailable()):boolean{try{storage?.setItem(prefix+key,JSON.stringify(value));return Boolean(storage)}catch{return false}}
function storageAvailable(){return browserStorage()}
