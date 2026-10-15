'use strict';
// ---------- i18n ----------
const I18N={
  hy:{voice:'hy-AM',where:'Ո՞ւր ենք գնում',search:'Գտնել',hint:'Գրիր հասցե կամ սեղմիր քարտեզի վրա',go:'Սկսել',sim:'Փորձնական երթ',
    cam:'📷 Տեսախցիկ',map:'🗺 Քարտեզ',stop:'Ավարտել',von:'🔊',voff:'🔇',loading:'Երթուղին կառուցվում է…',signs:'Ստուգում եմ նշանները…',
    noGps:'GPS չկա․ մեկնարկը՝ քարտեզի կենտրոնից',err:'Սխալ․ ստուգիր ինտերնետը',none:'Ոչինչ չգտնվեց',arrived:'Դու հասար',
    km:'կմ',m:'մ',kmh:'կմ/ժ',noCam:'Տեսախցիկը հասանելի չէ',reroute:'Նոր երթուղի…',dest:'Նպատակակետ',
    note:'Հուշում է, ոչ թե հրամայում։ Միշտ նայիր իրական նշաններին։',
    ev:{priority:['ԴՈՒ ԳԼԽԱՎՈՐՆ ԵՍ','Ըստ քարտեզի՝ գլխավոր ճանապարհ','Դու գլխավոր ճանապարհին ես'],
        giveway:['ԶԻՋԻՐ','Առջևում «Զիջիր» նշան','Ուշադրություն։ Զիջիր։'],
        stop:['ԿԱՆԳ','Լրիվ կանգնիր, հետո զիջիր','Կանգ։ Լրիվ կանգնիր, հետո զիջիր։'],
        light:['ԼՈՒՍԱՑՈՒՅՑ','Նայիր լույսին','Առջևում լուսացույց է'],
        nodata:['ՆԱՅԻՐ ՆՇԱՆՆԵՐԻՆ','Քարտեզում նշան չկա։ Եթե նշան չկա՝ զիջիր աջից եկողին','Քարտեզում նշան չկա։ Նայիր նշաններին։']},
    mod:{left:'Թեքվիր ձախ',right:'Թեքվիր աջ','slight left':'Թեթևակի ձախ','slight right':'Թեթևակի աջ','sharp left':'Կտրուկ ձախ','sharp right':'Կտրուկ աջ',straight:'Ուղիղ',uturn:'Հետադարձ'},
    round:n=>`Շրջանից՝ ${n}-րդ ելք`,arrive:'Հասնում ես',onto:n=>` · ${n}`,
    sayIn:(d,t)=>`${d} մետրից ${t}`},
  ru:{voice:'ru-RU',where:'Куда едем?',search:'Найти',hint:'Введите адрес или нажмите на карту',go:'Поехали',sim:'Тест-поездка',
    cam:'📷 Камера',map:'🗺 Карта',stop:'Завершить',von:'🔊',voff:'🔇',loading:'Строю маршрут…',signs:'Проверяю знаки…',
    noGps:'Нет GPS — старт из центра карты',err:'Ошибка — проверьте интернет',none:'Ничего не найдено',arrived:'Вы приехали',
    km:'км',m:'м',kmh:'км/ч',noCam:'Камера недоступна',reroute:'Перестраиваю маршрут…',dest:'Пункт назначения',
    note:'Приложение подсказывает, а не командует. Всегда смотрите на реальные знаки.',
    ev:{priority:['ВЫ НА ГЛАВНОЙ','По данным карты — главная дорога','Вы на главной дороге'],
        giveway:['УСТУПИТЕ ДОРОГУ','Впереди знак «Уступи дорогу»','Внимание. Уступите дорогу.'],
        stop:['СТОП','Полная остановка, затем уступите','Стоп. Полная остановка, затем уступите.'],
        light:['СВЕТОФОР','Смотрите на сигнал','Впереди светофор'],
        nodata:['СМОТРИТЕ НА ЗНАКИ','На карте знаков нет. Если знаков нет — помеха справа','На карте нет знаков. Смотрите на знаки.']},
    mod:{left:'Поверните налево',right:'Поверните направо','slight left':'Держитесь левее','slight right':'Держитесь правее','sharp left':'Резко налево','sharp right':'Резко направо',straight:'Прямо',uturn:'Разворот'},
    round:n=>`На круге — ${n}-й съезд`,arrive:'Прибытие',onto:n=>` · ${n}`,
    sayIn:(d,t)=>`Через ${d} метров ${t.toLowerCase()}`},
  en:{voice:'en-US',where:'Where to?',search:'Search',hint:'Type an address or tap the map',go:'Start',sim:'Test drive',
    cam:'📷 Camera',map:'🗺 Map',stop:'End',von:'🔊',voff:'🔇',loading:'Building route…',signs:'Checking signs…',
    noGps:'No GPS — starting from map center',err:'Error — check the internet',none:'Nothing found',arrived:'You have arrived',
    km:'km',m:'m',kmh:'km/h',noCam:'Camera not available',reroute:'Rerouting…',dest:'Destination',
    note:'The app gives hints, not orders. Always check the real signs.',
    ev:{priority:['YOU HAVE PRIORITY','Map data: priority road','You are on the priority road'],
        giveway:['GIVE WAY','Give way sign ahead','Attention. Give way.'],
        stop:['STOP','Full stop, then give way','Stop sign. Full stop, then give way.'],
        light:['TRAFFIC LIGHT','Watch the signal','Traffic light ahead'],
        nodata:['CHECK THE SIGNS','No signs on the map. With no signs, yield to the right','No signs on the map. Check the signs.']},
    mod:{left:'Turn left',right:'Turn right','slight left':'Keep left','slight right':'Keep right','sharp left':'Sharp left','sharp right':'Sharp right',straight:'Go straight',uturn:'Make a U-turn'},
    round:n=>`At the roundabout, exit ${n}`,arrive:'Arriving',onto:n=>` · ${n}`,
    sayIn:(d,t)=>`In ${d} meters, ${t.toLowerCase()}`},
};
const COUNTRIES='ru,ge,by,kz,uz,am';
let lang='hy';try{lang=localStorage.getItem('lang')||'hy'}catch(e){}
if(!I18N[lang])lang='hy';
const L=()=>I18N[lang];
const $=id=>document.getElementById(id);

// ---------- geo helpers ----------
const R=6371000,rad=d=>d*Math.PI/180,deg=r=>r*180/Math.PI;
function hav(a,b){const dLat=rad(b[1]-a[1]),dLon=rad(b[0]-a[0]);const x=Math.sin(dLat/2)**2+Math.cos(rad(a[1]))*Math.cos(rad(b[1]))*Math.sin(dLon/2)**2;return 2*R*Math.asin(Math.sqrt(x))}
function bearing(a,b){const y=Math.sin(rad(b[0]-a[0]))*Math.cos(rad(b[1]));const x=Math.cos(rad(a[1]))*Math.sin(rad(b[1]))-Math.sin(rad(a[1]))*Math.cos(rad(b[1]))*Math.cos(rad(b[0]-a[0]));return (deg(Math.atan2(y,x))+360)%360}
// project point p onto segment a-b in local meters; returns [t, distance]
function projSeg(p,a,b){const k=Math.cos(rad(p[1]))*111320,m=110540;
  const ax=(a[0]-p[0])*k,ay=(a[1]-p[1])*m,bx=(b[0]-p[0])*k,by=(b[1]-p[1])*m;
  const dx=bx-ax,dy=by-ay,l2=dx*dx+dy*dy;let t=l2?-(ax*dx+ay*dy)/l2:0;t=Math.max(0,Math.min(1,t));
  return [t,Math.hypot(ax+t*dx,ay+t*dy)]}
const lerp=(a,b,t)=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t];

// ---------- map ----------
const map=new maplibregl.Map({container:'map',style:'https://tiles.openfreemap.org/styles/liberty',center:[44.5126,40.1811],zoom:13,maxPitch:85,attributionControl:{compact:true}});
map.addControl(new maplibregl.NavigationControl({showCompass:false}),'bottom-right');
function localizeLabels(){
  if(!map.isStyleLoaded())return;
  for(const l of map.getStyle().layers){if(l.type==='symbol'&&l.layout&&l.layout['text-field']){
    try{map.setLayoutProperty(l.id,'text-field',['coalesce',['get','name:'+lang],['get','name']])}catch(e){}}}
}
map.on('load',()=>{
  localizeLabels();
  map.addSource('route',{type:'geojson',data:{type:'FeatureCollection',features:[]}});
  map.addLayer({id:'route-casing',type:'line',source:'route',layout:{'line-cap':'round','line-join':'round'},paint:{'line-color':'#1e3a8a','line-width':['interpolate',['linear'],['zoom'],12,6,18,26]}});
  map.addLayer({id:'route',type:'line',source:'route',layout:{'line-cap':'round','line-join':'round'},paint:{'line-color':'#3b82f6','line-width':['interpolate',['linear'],['zoom'],12,4,18,20]}});
  locateOnce();
});

// ---------- state ----------
let me=null,dest=null,destMarker=null,route=null,nav=null,watchId=null,simTimer=null,voiceOn=true,camStream=null;
let carMarker=null,signMarkers=[];
function toast(t,ms=2500){const e=$('toast');e.textContent=t;e.style.display='block';clearTimeout(toast.t);toast.t=setTimeout(()=>e.style.display='none',ms)}

// ---------- UI text ----------
function render(){
  const t=L();document.documentElement.lang=lang;
  $('q').placeholder=t.where;$('sbtn').textContent=t.search;$('hint').textContent=t.hint;$('go').textContent=t.go;$('sim').textContent=t.sim;
  $('stop').textContent=t.stop;$('camBtn').textContent=document.body.classList.contains('camera')?t.map:t.cam;
  $('voice').textContent=voiceOn?t.von:t.voff;$('kmh').textContent=t.kmh;$('note').textContent=t.note;
  [...$('langs').children].forEach(b=>b.classList.toggle('on',b.dataset.l===lang));
  localizeLabels();if(nav)updateNav(true);
}
[...$('langs').children].forEach(b=>b.onclick=()=>{lang=b.dataset.l;try{localStorage.setItem('lang',lang)}catch(e){}speechSynthesis.cancel();render()});
$('voice').onclick=()=>{voiceOn=!voiceOn;if(!voiceOn)speechSynthesis.cancel();render()};

// ---------- voice ----------
function pickVoice(){const p=L().voice.slice(0,2);return speechSynthesis.getVoices().find(v=>v.lang.toLowerCase().startsWith(p))}
function say(text){if(!voiceOn||!('speechSynthesis' in window))return;const u=new SpeechSynthesisUtterance(text);u.lang=L().voice;const v=pickVoice();if(v)u.voice=v;speechSynthesis.cancel();speechSynthesis.speak(u)}

// ---------- location ----------
function locateOnce(){
  if(!navigator.geolocation)return;
  navigator.geolocation.getCurrentPosition(p=>{me=[p.coords.longitude,p.coords.latitude];map.jumpTo({center:me,zoom:15})},()=>{}, {enableHighAccuracy:true,timeout:8000});
}

// ---------- search ----------
$('sf').onsubmit=async e=>{
  e.preventDefault();const q=$('q').value.trim();if(!q)return;
  const box=$('results');box.innerHTML='…';
  try{
    const c=map.getCenter();
    const url=`https://nominatim.openstreetmap.org/search?format=jsonv2&limit=6&countrycodes=${COUNTRIES}&accept-language=${lang}&viewbox=${c.lng-1},${c.lat+1},${c.lng+1},${c.lat-1}&q=${encodeURIComponent(q)}`;
    const r=await (await fetch(url)).json();
    box.innerHTML='';if(!r.length){box.textContent=L().none;return}
    r.forEach(x=>{const b=document.createElement('button');const [n,...rest]=x.display_name.split(', ');
      b.innerHTML=`${esc(n)}<small>${esc(rest.slice(0,3).join(', '))}</small>`;
      b.onclick=()=>{box.innerHTML='';setDest([+x.lon,+x.lat])};box.appendChild(b)});
  }catch(err){box.textContent=L().err}
};
const esc=s=>s.replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
map.on('click',e=>{if(!nav)setDest([e.lngLat.lng,e.lngLat.lat])});

async function setDest(p){
  dest=p;
  if(destMarker)destMarker.remove();
  destMarker=new maplibregl.Marker({color:'#dc2626'}).setLngLat(p).addTo(map);
  let start=me;if(!start){toast(L().noGps);const c=map.getCenter();start=[c.lng,c.lat]}
  await buildRoute(start,p);
  if(route){$('go').style.display='';$('sim').style.display='';
    const b=new maplibregl.LngLatBounds();route.coords.forEach(c=>b.extend(c));map.fitBounds(b,{padding:{top:180,bottom:160,left:40,right:40},pitch:0,bearing:0})}
}

// ---------- routing ----------
async function buildRoute(a,b){
  toast(L().loading,8000);
  try{
    const url=`https://router.project-osrm.org/route/v1/driving/${a[0]},${a[1]};${b[0]},${b[1]}?overview=full&geometries=geojson&steps=true`;
    const r=await (await fetch(url)).json();
    if(r.code!=='Ok'||!r.routes.length)throw new Error(r.code);
    const rt=r.routes[0],coords=rt.geometry.coordinates;
    const cum=[0];for(let i=1;i<coords.length;i++)cum.push(cum[i-1]+hav(coords[i-1],coords[i]));
    const steps=[];let k=0;
    for(const leg of rt.legs)for(const s of leg.steps){
      const loc=s.maneuver.location;let best=k,bd=1e9;
      for(let i=k;i<Math.min(coords.length,k+4000);i++){const d=hav(coords[i],loc);if(d<bd){bd=d;best=i}if(bd<1&&d>50)break}
      k=best;steps.push({at:cum[best],type:s.maneuver.type,mod:s.maneuver.modifier,exit:s.maneuver.exit,name:s.name||s.ref||'',loc});
    }
    route={coords,cum,total:cum[cum.length-1],steps,events:[],signsUpTo:0};
    map.getSource('route').setData({type:'Feature',geometry:rt.geometry});
    // default events at turns: "no data" until signs say otherwise
    route.events=steps.filter(s=>!['depart','arrive'].includes(s.type)&&s.mod!=='straight').map(s=>({at:s.at,kind:'nodata',turn:true}));
    $('toast').style.display='none';
    loadSigns(0);
  }catch(e){route=null;toast(L().err)}
}

// signs from OpenStreetMap (Overpass), loaded in 8 km chunks ahead
async function loadSigns(from){
  if(!route||route.loading)return;const to=Math.min(route.total,from+8000);if(from>=route.total)return;
  route.loading=true;
  const idx=[];for(let i=0;i<route.coords.length;i++){const d=route.cum[i];if(d>=from-50&&d<=to+50)idx.push(i)}
  const poly=idx.filter((_,j)=>j%1===0).slice(0,1500).map(i=>`${route.coords[i][1].toFixed(6)},${route.coords[i][0].toFixed(6)}`).join(',');
  const q=`[out:json][timeout:25];(node["highway"~"^(give_way|stop|traffic_signals)$"](around:4,${poly});way["priority_road"~"^(designated|yes_unposted)$"](around:3,${poly}););out geom;`;
  try{
    const r=await overpass(q);
    const prio=[];
    for(const el of r.elements){
      if(el.type==='node'){const p=[el.lon,el.lat];const at=alongOf(p,idx);if(at==null)continue;
        const kind={give_way:'giveway',stop:'stop',traffic_signals:'light'}[el.tags.highway];addEvent({at,kind,loc:p})}
      else if(el.geometry)prio.push(el.geometry.map(g=>[g.lon,g.lat]));
    }
    // turns sitting on a priority road
    for(const ev of route.events)if(ev.kind==='nodata'&&ev.at>=from&&ev.at<=to){
      const p=pointAt(Math.max(0,ev.at-15));if(prio.some(line=>line.some((c,i)=>i&&projSeg(p,line[i-1],c)[1]<6)))ev.kind='priority'}
    // a sign within 60 m before a turn replaces its "no data"
    route.events=route.events.filter(ev=>!(ev.kind==='nodata'&&route.events.some(s=>s.loc&&s.at<=ev.at+10&&s.at>=ev.at-60)));
    route.events.sort((a,b)=>a.at-b.at);
    drawSigns();
    route.signsUpTo=to;
  }catch(e){route.retryAt=Date.now()+30000} // servers busy: keep "check the signs" hints, retry later
  route.loading=false;
}
const OVERPASS=['https://overpass-api.de/api/interpreter','https://maps.mail.ru/osm/tools/overpass/api/interpreter','https://overpass.kumi.systems/api/interpreter'];
async function overpass(q){
  for(const u of OVERPASS){
    const ac=new AbortController(),tm=setTimeout(()=>ac.abort(),20000);
    try{const r=await fetch(u,{method:'POST',body:'data='+encodeURIComponent(q),headers:{'Content-Type':'application/x-www-form-urlencoded'},signal:ac.signal});
      if(r.ok)return await r.json()}catch(e){}finally{clearTimeout(tm)}
  }
  throw new Error('overpass');
}
function alongOf(p,idx){let best=null,bd=6;for(let j=1;j<idx.length;j++){const i=idx[j],a=route.coords[i-1],b=route.coords[i];const [t,d]=projSeg(p,a,b);if(d<bd){bd=d;best=route.cum[i-1]+t*(route.cum[i]-route.cum[i-1])}}return best}
function addEvent(e){if(route.events.some(x=>x.kind===e.kind&&Math.abs(x.at-e.at)<35))return;route.events.push(e)}
function pointAt(d){const c=route.cum;let lo=0,hi=c.length-1;while(hi-lo>1){const m=(lo+hi)>>1;if(c[m]<=d)lo=m;else hi=m}
  const t=c[hi]>c[lo]?(d-c[lo])/(c[hi]-c[lo]):0;return lerp(route.coords[lo],route.coords[hi],Math.max(0,Math.min(1,t)))}
function bearingAt(d){return bearing(pointAt(Math.max(0,d-5)),pointAt(Math.min(route.total,d+25)))}

function drawSigns(){
  signMarkers.forEach(m=>m.remove());signMarkers=[];
  for(const ev of route.events){if(!ev.loc||signMarkers.length>400)continue;
    const el=document.createElement('div');el.innerHTML=`<svg class="sign" viewBox="0 0 54 54">${icon(ev.kind)}</svg>`;
    signMarkers.push(new maplibregl.Marker({element:el}).setLngLat(ev.loc).addTo(map))}
}

// ---------- icons ----------
function icon(k){
  if(k==='priority')return '<rect x="10" y="10" width="34" height="34" transform="rotate(45 27 27)" fill="#fff"/><rect x="16" y="16" width="22" height="22" transform="rotate(45 27 27)" fill="#facc15"/>';
  if(k==='giveway')return '<path d="M4 8h46L27 50z" fill="#fff" stroke="#dc2626" stroke-width="6" stroke-linejoin="round"/>';
  if(k==='stop')return '<path d="M17 3h20l14 14v20L37 51H17L3 37V17z" fill="#dc2626" stroke="#fff" stroke-width="3"/><text x="27" y="32" font-size="13" font-weight="900" fill="#fff" text-anchor="middle" font-family="Arial">STOP</text>';
  if(k==='light')return '<rect x="16" y="2" width="22" height="50" rx="6" fill="#111"/><circle cx="27" cy="13" r="6" fill="#ef4444"/><circle cx="27" cy="27" r="6" fill="#f59e0b"/><circle cx="27" cy="41" r="6" fill="#22c55e"/>';
  return '<circle cx="27" cy="27" r="24" fill="#fff"/><text x="27" y="38" font-size="32" font-weight="900" fill="#b45309" text-anchor="middle" font-family="Arial">!</text>';
}
const EVCOL={priority:'var(--green)',giveway:'var(--red)',stop:'var(--red)',light:'#334155',nodata:'var(--amber)'};
function arrow(step){
  if(!step)return '';
  if(step.type==='arrive')return '<circle cx="30" cy="30" r="14" fill="#dc2626" stroke="#fff" stroke-width="4"/>';
  const a={left:-90,right:90,'slight left':-45,'slight right':45,'sharp left':-135,'sharp right':135,uturn:180}[step.mod]||0;
  return `<g transform="rotate(${a} 30 30)"><path d="M30 4 50 26H37v30H23V26H10z" fill="#60a5fa" stroke="#fff" stroke-width="2"/></g>`;
}
function stepText(s){const t=L();if(!s)return '';if(s.type==='arrive')return t.arrive;
  const base=(s.type==='roundabout'||s.type==='rotary')&&s.exit?t.round(s.exit):(t.mod[s.mod]||t.mod.straight);
  return base+(s.name?t.onto(s.name):'')}
const fmt=d=>d>=1000?(d/1000).toFixed(d>=10000?0:1)+' '+L().km:Math.round(d/10)*10+' '+L().m;

// ---------- navigation ----------
function startNav(sim){
  if(!route)return;
  nav={along:0,idx:0,spoken:{},off:0,sim};document.body.classList.add('navigating');
  if(!carMarker){const el=document.createElement('div');el.innerHTML='<svg class="car" viewBox="0 0 40 40"><path d="M20 3 34 35 20 28 6 35z" fill="#2563eb" stroke="#fff" stroke-width="3" stroke-linejoin="round"/></svg>';
    carMarker=new maplibregl.Marker({element:el,rotationAlignment:'map',pitchAlignment:'map'}).setLngLat(route.coords[0]).addTo(map)}
  if(sim)runSim();else watchId=navigator.geolocation.watchPosition(p=>onPos([p.coords.longitude,p.coords.latitude],p.coords.speed,p.coords.heading),()=>toast(L().noGps),{enableHighAccuracy:true,maximumAge:1000});
  try{navigator.wakeLock&&navigator.wakeLock.request('screen').then(l=>nav.lock=l)}catch(e){}
  render();
}
function stopNav(){
  if(watchId!=null)navigator.geolocation.clearWatch(watchId);watchId=null;clearInterval(simTimer);
  if(nav&&nav.lock)nav.lock.release();nav=null;speechSynthesis.cancel();
  document.body.classList.remove('navigating');$('badge').classList.remove('show');
  if(carMarker){carMarker.remove();carMarker=null}
  setCamera(false);map.easeTo({pitch:0,bearing:0,zoom:14});render();
}
$('go').onclick=()=>startNav(false);$('sim').onclick=()=>startNav(true);$('stop').onclick=stopNav;

function runSim(){
  let d=0;const dt=0.25;
  simTimer=setInterval(()=>{
    const ev=route.events.find(e=>e.at>d&&e.at-d<60);
    let v=13;if(ev&&['giveway','stop','nodata'].includes(ev.kind))v=Math.max(3,(ev.at-d)/60*13);
    d+=v*dt;if(d>=route.total){d=route.total;clearInterval(simTimer)}
    onPos(pointAt(d),v,null,d);
  },dt*1000);
}

function onPos(p,speed,heading,simAlong){
  if(!nav)return;me=p;
  let along=simAlong;
  if(along==null){ // snap to route near last known position
    let best=nav.along,bd=1e9;const c=route.coords;
    for(let i=1;i<c.length;i++){if(route.cum[i]<nav.along-200)continue;if(route.cum[i-1]>nav.along+1500)break;
      const [t,dd]=projSeg(p,c[i-1],c[i]);if(dd<bd){bd=dd;best=route.cum[i-1]+t*(route.cum[i]-route.cum[i-1])}}
    if(bd>50){if(++nav.off>=4&&dest){nav.off=0;toast(L().reroute);const was=nav.sim;buildRoute(p,dest).then(()=>{if(nav){nav.along=0;nav.spoken={}}});return}}else nav.off=0;
    along=best;
  }
  nav.along=along;nav.speed=speed;
  if(route.signsUpTo-along<3000&&route.signsUpTo<route.total&&!(route.retryAt>Date.now()))loadSigns(route.signsUpTo);
  const b=bearingAt(along);
  carMarker.setLngLat(p).setRotation(b);
  map.easeTo({center:p,bearing:b,pitch:72,zoom:18.2,padding:{top:innerHeight*0.45,bottom:0,left:0,right:0},duration:nav.sim?250:900,easing:x=>x});
  updateNav();
}

function updateNav(force){
  if(!nav||!route)return;const t=L(),along=nav.along;
  $('spd').textContent=Math.round((nav.speed||0)*3.6);
  if(route.total-along<20){$('ndist').textContent=t.arrived;$('ntext').textContent='';$('nicon').innerHTML=arrow({type:'arrive'});
    if(!nav.spoken.arr){nav.spoken.arr=1;say(t.arrived)}$('badge').classList.remove('show');return}
  const step=route.steps.find(s=>s.at>along+3&&s.type!=='depart')||route.steps[route.steps.length-1];
  const dd=step.at-along;
  $('ndist').textContent=fmt(dd);$('ntext').textContent=stepText(step);$('nicon').innerHTML=arrow(step);$('ar').innerHTML=arrow(step);
  const key=step.at;
  if(dd<400&&dd>250&&!nav.spoken['f'+key]&&(nav.speed||0)>12){nav.spoken['f'+key]=1;say(t.sayIn(Math.round(dd/50)*50,stepText(step)))}
  if(dd<90&&!nav.spoken['n'+key]){nav.spoken['n'+key]=1;say(dd>25?t.sayIn(Math.round(dd/10)*10,stepText(step)):stepText(step))}
  // right-of-way badge
  const ev=route.events.find(e=>e.at>along-5&&e.at-along<150);
  const bd=$('badge');
  if(ev){const [title,sub,speech]=t.ev[ev.kind];bd.style.background=EVCOL[ev.kind];$('bt').textContent=title;$('bs').textContent=sub;$('bd').textContent=fmt(Math.max(0,ev.at-along));
    $('bicon').innerHTML=icon(ev.kind);bd.classList.add('show');
    if(!nav.spoken['e'+ev.at]&&ev.at-along<110){nav.spoken['e'+ev.at]=1;setTimeout(()=>say(speech),dd<90?2200:0)}}
  else bd.classList.remove('show');
}

// ---------- camera mode ----------
async function setCamera(on){
  if(on){try{camStream=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:'environment'}},audio:false});$('cam').srcObject=camStream;document.body.classList.add('camera')}
    catch(e){toast(L().noCam);return}}
  else{if(camStream)camStream.getTracks().forEach(t=>t.stop());camStream=null;document.body.classList.remove('camera')}
  setTimeout(()=>map.resize(),350);render();
}
$('camBtn').onclick=()=>setCamera(!document.body.classList.contains('camera'));

// ---------- PWA ----------
if('serviceWorker' in navigator&&location.protocol!=='file:')navigator.serviceWorker.register('sw.js');
speechSynthesis&&(speechSynthesis.onvoiceschanged=()=>{});
render();
