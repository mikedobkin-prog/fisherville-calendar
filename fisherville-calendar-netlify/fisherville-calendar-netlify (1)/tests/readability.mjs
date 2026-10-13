import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const app=fs.readFileSync('source/app.js','utf8');const config=JSON.parse(fs.readFileSync('configuration/calendars.json'));
const style={values:{},setProperty(k,v){this.values[k]=v}};
let areas=[];const ctx={state:{calendars:config},document:{querySelectorAll:()=>areas},$:()=>({style}),eventScrollPauses:new WeakMap()};vm.createContext(ctx);
vm.runInContext(app.slice(app.indexOf('const SOURCE_COLOURS='),app.indexOf('const SPORTS_CALENDAR=')),ctx);
for(const [a,b] of [['function compareEvents(','const EVENT_PALETTE'],['function eventAppearance(','function eventButton'],['function formatEventTime(','function formatTime'],['function fitCalendarEvents(','function render()'],['function upcomingEntries(','function upcomingTitle']])vm.runInContext(app.slice(app.indexOf(a),app.indexOf(b,app.indexOf(a))),ctx);
vm.runInContext("function dateObj(s){return new Date(s+'T12:00:00Z')}",ctx);
areas=[0,1,2,3,4,7,2,3,1,0].map(n=>({clientHeight:172,dataset:{},scrollTop:34,querySelectorAll:s=>s==='[data-loop-clone]'?[]:Array(n).fill({}),setAttribute(){},removeAttribute(){}}));
ctx.fitCalendarEvents();assert.equal(style.values['--event-slot-height'],'53px');for(let i=0;i<areas.length;i++)assert.equal(areas[i].dataset.autoScroll,String([0,1,2,3,4,7,2,3,1,0][i]>3));assert.ok(3*53+12<=172);
assert.equal(ctx.formatEventTime({time:'11:35',endTime:'12:30'}),'11:35 AM');assert.equal(ctx.formatEventTime({time:'00:00'}),'12:00 AM');assert.equal(ctx.formatEventTime({time:''}),'');
const rows=config.filter(c=>c.target!=='menu').map((c,i)=>({id:String(i),calendarId:c.id,calendarUid:c.uid,date:'2026-11-02',title:'Same long title '.repeat(10),time:i%2?'':'13:00',target:c.target}));
const ordered=ctx.weeklyEvents([...rows,rows[0]]);assert.equal(ordered.length,4);assert.ok(!ordered[0].time&&!ordered[1].time);assert.equal(ctx.upcomingEntries(rows,'2026-11-01','2026-12-01').length,2);
for(const row of rows)assert.equal(ctx.eventAppearance(row).background,config.find(c=>c.id===row.calendarId).color);
assert.ok(!app.includes("createElement('div');pinnedArea"));assert.match(fs.readFileSync('source/styles.css','utf8'),/scrollbar-width:none/);
console.log('PASS: 0 to 7 cards, three fixed slots, scrolling threshold, all day ordering, source colours, duplicate identity, start times, all four Upcoming sources. Visual rendering remains untested.');

const boundaryRows=[{...rows[1],id:'before',date:'2026-10-25'},{...rows[1],id:'first',date:'2026-10-26'},{...rows[1],id:'last',date:'2026-11-04'},{...rows[1],id:'after',date:'2026-11-05'},{...rows[1],id:'timed',date:'2026-10-27',time:'09:00'}];
assert.equal(ctx.upcomingEntries(boundaryRows,'2026-10-26','2026-11-05').map(e=>e.id).join(','),'first,last');
console.log('PASS: Upcoming all day only, inclusive first and tenth days, excludes timed events and outside dates.');

const many=Array.from({length:15},(_,i)=>({...rows[1],id:'many'+i,title:'Event '+i,date:'2026-11-02'}));assert.equal(ctx.upcomingEntries(many,'2026-10-26','2027-01-24').length,10);assert.match(app,/Next 10 all day events/);console.log('PASS: Upcoming capped at ten all day events.');
