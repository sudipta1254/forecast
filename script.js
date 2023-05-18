w = '20.252346,85.802773', op = 0;

function m() {
   fetch('https://api.weatherapi.com/v1/forecast.json?q='+w+'&key=df1745f8c6cc4466bf545635232304&days=3')
     .then(response => response.json())
     .then(data => {
         //console.log(data);
         loc = data.location;
         curr = data.current;
         fore = data.forecast.forecastday;
         as();
     })
     .catch(error => {
       alert(error);
       // Handle errors
     }); 
}

function as() {
   if (op == null || op == '')
      op = 0;
   cast = fore[op];

   document.querySelector('.s1').innerHTML = loc.name+', '+loc.region+', '+loc.country;
   document.querySelector('.s2').innerHTML = loc.localtime;
   document.querySelector('.s3').innerHTML = curr.last_updated;
   document.querySelector('.s4').innerHTML = cast['date'];
   document.querySelector('.s5').innerHTML = curr['temp_c']+'°C';

   for(i = 0; i < 24; i++) {
      c1 = cast['hour'][i]['time'].split(' ')[1];
      c2 = cast['hour'][i]['temp_c'];
      c3 = cast['hour'][i]['condition']['text'];
      c4 = cast['hour'][i]['condition']['icon'].split('//')[1];

      p = document.createElement('strong');
      q = document.createElement('div');
      r = document.createElement('br');
      p.innerHTML = c1+':- Temperature: '+c2+'°C Condition: '+c3;
      q.style.width = '60px';
      q.style.height = '60px';
      q.style.background = 'url(http://'+c4+')';
      d = document.querySelector('.d2');
      d.appendChild(p);
      d.appendChild(q);
      d.appendChild(r);
   }
}

function get() {
   w = document.getElementById("txt").value;
   op = document.getElementById("no").value;
   document.querySelector('.d2').innerHTML = '';
   m();
}
m();
