export type GameMode='Who Am I?'|'Timeline Order'|'Fact or Fiction'|'Multiverse Connections'
export const gameModes:GameMode[]=['Who Am I?','Timeline Order','Fact or Fiction','Multiverse Connections']
export const gameBank={
  'Who Am I?':{prompt:'Identify the character.',clues:['I rule a fictional European nation.','I combine science with sorcery.','Reed Richards is my enduring rival.'],answers:['Doctor Doom','Reed Richards','Loki'],correct:0,explanation:'Victor von Doom rules Latveria and is a scientist, sorcerer and rival to Reed Richards.'},
  'Timeline Order':{prompt:'Choose the correct publication order (earliest first).',clues:['Fantastic Four #1 → Fantastic Four #5 → Secret Wars (1984)','Secret Wars (1984) → Fantastic Four #5 → Fantastic Four #1','Fantastic Four #5 → Fantastic Four #1 → Secret Wars (1984)'],answers:['First sequence','Second sequence','Third sequence'],correct:0,explanation:'Fantastic Four #1 preceded Doom’s debut in #5; the first Secret Wars arrived decades later.'},
  'Fact or Fiction':{prompt:'Doctor Doom is traditionally the sovereign of Latveria.',clues:[],answers:['Fact','Fiction','Unconfirmed movie rumour'],correct:0,explanation:'Fact in Marvel comics context; this does not predict the film’s plot.'},
  'Multiverse Connections':{prompt:'Which connection is historically accurate?',clues:[],answers:['Doctor Doom — Latveria','Reed Richards — Asgard’s throne','Doctor Strange — Wakanda’s king'],correct:0,explanation:'Doctor Doom is the ruler most closely associated with Latveria.'}
} as const
export function scoreGame(mode:GameMode,correct:boolean,clues=0){return correct?Math.max(20,100-clues*20):0}
