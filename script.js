qb = '20.252346,85.802773';

// m();
function m() {
   q = prompt('Enter location:', 'Bhubaneshwar')
   if (q == null)
     q = qb;

   fetch('https://api.weatherapi.com/v1/forecast.json?q='+q+'&key=df1745f8c6cc4466bf545635232304&days=2')
     .then(response => response.json())
     .then(data => {
         //console.log(data);
         loc = data.location;
         curr = data.current;
         fore = data.forecast.forecastday;
         as();
     })
     .catch(error => {
       console.error(error);
       // Handle errors
     }); 
}

function as() {
   op = prompt('Enter 0 for today or 1 for tomorrow:', 0);
   cast = fore[op];
   
   document.querySelector('.s1').innerHTML = loc.name+', '+loc.region+', '+loc.country;
   document.querySelector('.s2').innerHTML = loc.localtime;
   document.querySelector('.s3').innerHTML = curr.last_updated;
   document.querySelector('.s4').innerHTML = cast['date'];
   
   for(i = 0; i < 24; i++) {
      c1 = cast['hour'][i]['time'];
      c2 = cast['hour'][i]['temp_c'];
      c3 = cast['hour'][i]['condition']['text'];
      c4 = cast['hour'][i]['condition']['icon'].split('//')[1];
      document.querySelector('.s'+(i+5)).innerHTML = c1+':- Temperature: '+c2+'℃ Condition: '+c3;
      document.querySelector('.i'+i).style.background = 'url(http://'+c4+')';
      
      // p = document.createElement('strong');
      // p.innerHTML = c1+':- Temperature: '+c2+'℃ Condition: '+c3;
      // document.querySelector('.d2').appendChild(p);
   }
   
   /*icon = cur.condition.icon.split('//')[1];
   d3 = document.querySelector('.d3');
   d3.style.background = 'url(http://'+icon+')'; */
}
m();
