w = '20.252346,85.802773', op = 0, cnt = 0, j = 0;

m = () => {
   fetch(`https://api.weatherapi.com/v1/forecast.json?q=${w}&key=df1745f8c6cc4466bf545635232304&alerts=yes&aqi=yes&days=3`)
     .then(response => response.json())
     .then(data => {
         loc = data.location;
         cur = data.current;
         fore = data.forecast.forecastday;
         alerts = data.alerts;
         as1();
         ck1 = document.querySelector('.ck1').checked;
         ck2 = document.querySelector('.ck2').checked;
         ck3 = document.querySelector('.ck3').checked;
         ck1 && as2();
         ck2 && aq();
         ck3 && alt();
         if (!ck1 && !ck2 && !ck3 && cnt > 0) as3();
         cnt++;
     })
     .catch(error => {
       alert(error);
     }); 
}
m();

as1 = () => {
   time();
   document.querySelector('.s1').innerHTML = loc.name+', '+loc.region+', '+loc.country;
   document.querySelector('.s2').innerHTML = loc.localtime;
   document.querySelector('.s3').innerHTML = (d < 0) ? curr.last_updated : time();
   document.querySelector('.s4').innerHTML = cur.temp_c+'°C';
   document.querySelector('.s5').innerHTML = cur.condition.text;
   document.querySelector('.s6').innerHTML = cur.feelslike_c+'°C';
   document.querySelector('.s7').innerHTML = cur.wind_kph+' KMPH('+cur.wind_degree+'° - '+cur.wind_dir+')';
   document.querySelector('.s8').innerHTML = cur.gust_kph+' KMPH';
   document.querySelector('.s9').innerHTML = cur.pressure_mb+' hPa';
   document.querySelector('.s10').innerHTML = cur.humidity+'%';
   document.querySelector('.s11').innerHTML = cur.cloud+'%';
   document.querySelector('.s12').innerHTML = cur.vis_km+' Km';
   document.querySelector('.s13').innerHTML = cur.uv;
   document.querySelector('.s14').innerHTML = cur.precip_mm+' mm';

   icon = cur.condition.icon;
   day = cur.is_day;
   i1 = document.querySelector('.i1');
   i = document.querySelector('i');
   i1.style.background = `url(${icon})`;
   if (screen.width <= 768)
      i1.style.margin = '-40px auto 0';
   if (day == 1)
      i.className = 'las la-sun';
   else
      i.className = 'fa-regular fa-moon fa-1x';
}

as2 = () => {
   if (op == null || op == '')
      op = 0;
   cast = fore[op];
   time();
   
   document.querySelector('.t1').innerHTML = loc.name+', '+loc.region+', '+loc.country;
   document.querySelector('.t2').innerHTML = loc.localtime;
   document.querySelector('.t3').innerHTML = (d < 0) ? cur.last_updated : time();
   document.querySelector('.t4').innerHTML = cast.date;
   document.querySelector('.t5').innerHTML = cur.temp_c+'°C';
   document.querySelector('.d3').style.display = 'none';
   document.querySelector('.d4').style.display = 'block';
   icon = cur.condition.icon;
   day = cur.is_day;
   ik = document.querySelectorAll('i');
   if(day == 1)
      ik[1].className = 'las la-sun'
   else
      ik[1].className = 'fa-regular fa-moon fa-1x';

   for(i = 0, k = 1; i < 24; i++) {
      c1 = +cast.hour[i].time.split(' ')[1].split(':')[0];
      c2 = cast.hour[i].temp_c;
      c3 = cast.hour[i].condition.text;
      c4 = cast.hour[i].condition.code;
      probR = cast.hour[i].will_it_rain;
      chanceR = cast.hour[i].chance_of_rain;
      probS = cast.hour[i].will_it_snow;
      chanceS = cast.hour[i].chance_of_snow;
      icon = cast.hour[i].condition.icon;
      if (c1 > 11)
         merid = 'PM';
      else
         merid = 'AM';
      if (c1 > 12)
         c1 = k++;
      if (c1 == 0)
         c1 = 12;
  
      p = document.createElement('strong');
      q = document.createElement('div');
      r = document.createElement('br');
      p.innerHTML = `${c1} ${merid}:- Temperature: ${c2}°C<br>Condition: ${c3}`;
      if (c4 == 1063 || c4 == 1087 || c4 == 1069|| (c4 >= 1150 && c4 <= 1207) || (c4 >= 1240 && c4 <= 1252) || c4 == 1273 || c4 == 1276)
         p.innerHTML += `<br>Chance:- ${chanceR}%`;
      else if ((c4 >= 1066 && c4 <= 1072 && c4 != 1069) || c4 == 1114 || c4 == 1117 || (c4 >= 1210 && c4 <= 1237) || (c4 >= 1255 && c4 <= 1264) || c4 == 1279 || c4 == 1282)
         p.innerHTML += `<br>Chance:- ${chanceS}%`;
      q.style.width = '60px';
      q.style.height = '60px';
      q.style.background = `url(${icon})`;
      i2 = document.querySelector('.i2');
      i2.appendChild(p);
      i2.appendChild(q);
      i2.appendChild(r);
   }
}

as3 = () => {
   document.querySelector('.d3').style.display = 'block';
   document.querySelector('.d4').style.display = 'none';
   document.querySelector('.d5').style.display = 'none';
   document.querySelector('.d6').style.display = 'none';
   as1();
}

aq = () => {
    aqi = cur.air_quality;
    document.querySelector('.d3').style.display = 'none';
    if (!ck1)
       document.querySelector('.d4').style.display = 'none';
    d5 = document.querySelector('.d5');
    d5.style.display = 'block';
    p = document.createElement('p');
    p.innerHTML = `AQI for <strong>${loc.name}, ${loc.region}, ${loc.country}</strong><br>
                    CO: <strong>${aqi.co} μg/m3</strong><br>
                    NO2: <strong>${aqi.no2} μg/m3</strong><br>
                    O3: <strong>${aqi.o3} μg/m3</strong><br>
                    SO2: <strong>${aqi.so2} μg/m3</strong><br>
                    PM2.5: <strong>${aqi.pm2_5} μg/m3</strong><br>
                    PM10: <strong>${aqi.pm10} μg/m3</strong><br>
                    EPA Index: ${aqi['us-epa-index']}<br>
                    DEFRA Index: ${aqi['gb-defra-index']}<br>`;
    d5.appendChild(p);
}

alt = () => {
    a = alerts.alert;
    if (a.length == 0)
        alert('No alert(s) found!');
    else {
       document.querySelector('.d3').style.display = 'none';
       if (!ck1)
          document.querySelector('.d4').style.display = 'none';
       d6 = document.querySelector('.d6');
       p1 = document.createElement('p');
       p1.classList = `head`;
       p1.innerHTML = `Alerts<span class="fa-solid fa-triangle-exclamation fa-fade" style='color:red'></span>`;
       d6.appendChild(p1)
       d6.style.display = 'block';
       for(i = 0; i < a.length; i++) {
           p = document.createElement('p');
           p.innerHTML = `${i+1}. <strong>${loc.name}, ${loc.region}, ${loc.country}<hr>
                          ${a[i].headline}<hr>
                           ${a[i].note}<hr>
                           ${a[i].event}<hr>
                           ${a[i].instruction}`;
          if (a[i].instruction.length == 0)
             p.innerHTML += `${a[i].desc.split('...')[1]}`;
          if (i < a.length - 1)
             p.innerHTML += `</strong><br><br>`;
          d6.appendChild(p);
       }
    }
}

get = () => {
   w = document.getElementById("txt").value;
   if (w == '') {
      alert('Enter location!');
      return;
   }
   op = document.getElementById("no").value;
   document.querySelector('.i2').innerHTML = '';
   document.querySelector('.d5').innerHTML = '';
   document.querySelector('.d6').innerHTML = '';
   m();
}

time = () => {
   s = loc.localtime.split(' ')[1].split(':');
   s = s[0] + s[1];
   c = cur.last_updated.split(' ')[1].split(':');
   c = c[0] + c[1];
   d = +s - (+c);
   return d == 0 ? 'Now' : d == 1 ? d+' minute ago' : d+' minutes ago';
}

theme = () => {
   body = document.body;
   q = document.querySelector('span');
   i = document.querySelectorAll('input');
   body.classList.toggle('light')
   i[0].classList.toggle('light')
   i[1].classList.toggle('light')
   q.classList.toggle('mdi')
   q.classList.toggle('mdi-weather-night')
   q.classList.toggle('cil') //lnr, cil, las
   q.classList.toggle('cil-sun') //sun
   if (j % 2 == 0)
      q.style.color = 'black';
   else
      q.style.color = 'white';
   j++;
}

setInterval(() => {
   if (document.querySelector('.ck1').checked)
      document.querySelector('#no').disabled = false;
   else
      document.querySelector('#no').disabled = true;
}, 0);

input = document.getElementById("txt");
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.querySelector("button").click();
  }
});
input2 = document.getElementById("no");
input2.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.querySelector("button").click();
  }
});
