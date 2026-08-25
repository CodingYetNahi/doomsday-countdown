export const IST_ZONE = 'Asia/Kolkata'
export function istDateKey(date = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: IST_ZONE, year:'numeric', month:'2-digit', day:'2-digit' }).formatToParts(date)
  const value=(type:string)=>parts.find(part=>part.type===type)?.value ?? ''
  return `${value('year')}-${value('month')}-${value('day')}`
}
export function hashDate(key:string, salt=''):number { let hash=2166136261; for(const char of `${key}:${salt}`){hash^=char.charCodeAt(0);hash=Math.imul(hash,16777619)} return hash>>>0 }
export function dailyIndex(length:number,key=istDateKey(),salt=''):number { if(length<1) throw new Error('A non-empty bank is required'); return hashDate(key,salt)%length }
export function deterministicShuffle<T>(items:readonly T[],key:string):T[]{const copy=[...items];let seed=hashDate(key,'shuffle');for(let i=copy.length-1;i>0;i--){seed=(Math.imul(seed,1664525)+1013904223)>>>0;const j=seed%(i+1);[copy[i],copy[j]]=[copy[j],copy[i]]}return copy}
export type Streak={lastDate:string;count:number}
export function updateStreak(previous:Streak|undefined,today:string):Streak { if(!previous)return{lastDate:today,count:1};if(previous.lastDate===today)return previous;const prior=new Date(`${previous.lastDate}T00:00:00Z`),current=new Date(`${today}T00:00:00Z`);return{lastDate:today,count:(current.getTime()-prior.getTime())/86400000===1?previous.count+1:1} }
