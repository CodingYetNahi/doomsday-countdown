import type {Article} from '../data/articles'

export function articleText(article:Article){return article.sections.flatMap(section=>[section.heading,...section.paragraphs,...(section.bullets??[])]).join(' ')}
export function countWords(text:string){return (text.normalize('NFKC').match(/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu)??[]).length}
export function articleWordCount(article:Article){return countWords(articleText(article))}
export function articleReadingMinutes(article:Article){return Math.max(1,Math.ceil(articleWordCount(article)/220))}
export function labelFilter(article:Article,filter:string){return filter==='All'||article.label===filter||(filter==='Guide'&&article.label==='MCU and Comics Guide')}
