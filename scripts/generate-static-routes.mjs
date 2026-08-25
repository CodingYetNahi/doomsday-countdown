import fs from 'node:fs';import path from 'node:path'
const routes=['daily-challenge','trivia','games','articles','updates','about','sources','editorial-policy','privacy','contact'];const source=fs.readFileSync('dist/index.html','utf8')
for(const route of routes){const dir=path.join('dist',route);fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'index.html'),source)}
const articleSource=fs.readFileSync('src/data/articles.ts','utf8');for(const slug of [...articleSource.matchAll(/make\('([a-z0-9-]+)'/g)].map(x=>x[1])){const dir=path.join('dist','articles',slug);fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'index.html'),source)}
fs.writeFileSync('dist/404.html',source);console.log(`Generated ${routes.length} route fallbacks and article route entries.`)
