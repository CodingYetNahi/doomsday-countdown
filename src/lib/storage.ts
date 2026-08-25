export type DailyResult={answered?:number;correct?:boolean;score?:number;streak?:number}
const prefix='doomsday-daily:'
export function readResult(key:string,storage:Pick<Storage,'getItem'>|undefined=storageAvailable()):DailyResult|undefined{try{const raw=storage?.getItem(prefix+key);return raw?JSON.parse(raw) as DailyResult:undefined}catch{return undefined}}
export function writeResult(key:string,value:DailyResult,storage:Pick<Storage,'setItem'>|undefined=storageAvailable()):boolean{try{storage?.setItem(prefix+key,JSON.stringify(value));return Boolean(storage)}catch{return false}}
function storageAvailable(){try{return typeof localStorage==='undefined'?undefined:localStorage}catch{return undefined}}
