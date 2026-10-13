const CALENDAR_IDS = ["c_d0748046d11e42955457726726b3de6dd5220087c36ec19e24e7c2916a18cc1d@group.calendar.google.com", "c_8bdeef3e07977719a6597c98bc2048114342baa3ce6ef837b80a4c335e242675@group.calendar.google.com", "c_6dfd413bf7c264b35941b95ce5c47072942fd98c77f81c8035974afc655a476f@group.calendar.google.com", "c_6175b86c9eace96a4a47d3850d7c249ef3ace437dd2b96fdc612bc12dfb88132@group.calendar.google.com", "c_7004f8363c49d803c10f1f0d8e4d05ac3f73c1aeda5ad6319e911150c354c639@group.calendar.google.com"];
// Only public Google feeds from this allowlist can be fetched. No keys or secrets.
const headers={'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'GET,OPTIONS','Cache-Control':'no-store'};
export default async function handler(request){
 const url=new URL(request.url);
 if(request.method==='OPTIONS')return new Response(null,{status:204,headers});
 const fail=(error,status)=>new Response(JSON.stringify({error}),{status,headers:{...headers,'Content-Type':'application/json'}});
 if(request.method!=='GET')return fail('Method not allowed',405);
 
 
 const id=url.searchParams.get('id');if(!CALENDAR_IDS.includes(id))return fail('Calendar is not configured on this function.',403);
 try{
  const response=await fetch('https://calendar.google.com/calendar/ical/'+encodeURIComponent(id)+'/public/basic.ics',{redirect:'manual',signal:AbortSignal.timeout(20000),headers:{Accept:'text/calendar','Cache-Control':'no-cache'}});
  if(!response.ok)return fail('Google calendar unavailable. Check public sharing permissions. Google status '+response.status,502);
  const text=await response.text();if(text.length>2500000)return fail('Feed exceeds size limit',413);
  if(!text.trimStart().startsWith('BEGIN:VCALENDAR'))return fail('Invalid calendar feed',502);
  return new Response(text,{headers:{...headers,'Content-Type':'text/calendar;charset=utf-8'}});
 }catch{return fail('Calendar network request failed. The dashboard will retry.',502);}
};
