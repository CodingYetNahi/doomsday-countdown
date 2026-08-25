export type AnalyticsEvent =
  | {name:'trivia_answer';params:{category:string;difficulty:string;correct:boolean;daily_or_archive:'daily'|'archive'}}
  | {name:'game_start';params:{game_name:string;control_type:'keyboard_touch'}}
  | {name:'game_complete';params:{game_name:string;score:number;duration_seconds:number;result:'completed'|'exited'|'restarted';control_type:'keyboard_touch'}}
  | {name:'share';params:{content_type:'countdown';method:'web_share'|'clipboard'}}

export function hasAnalyticsConsent(target:Window=window){
  const commands=target.dataLayer??[]
  for(let index=commands.length-1;index>=0;index--){
    const command=commands[index]
    if(command?.[0]==='consent'&&command[1]==='update'&&typeof command[2]==='object'&&command[2]?.analytics_storage)return command[2].analytics_storage==='granted'
  }
  return false
}

export function track(event:AnalyticsEvent,target:Window=window){
  if(!hasAnalyticsConsent(target)||typeof target.gtag!=='function')return false
  try{target.gtag('event',event.name,event.params);return true}catch{return false}
}
