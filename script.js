qb = '20.252346,85.802773';

w = prompt('Enter location:', 'Bhubaneshwar')

if (w != null)

   m();

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

       console.error(error);

       // Handle errors

     }); 

}

function as() {

   op = prompt('Enter 0 for today, 1 for tomorrow or 2 tomm+1:', 0);

   if (op == null)

      op = 0;

   cast = fore[op];

   

   document.querySelector('.s1').innerHTML = loc.name+', '+loc.region+', '+loc.country;

   document.querySelector('.s2').innerHTML = loc.localtime;

   document.querySelector('.s3').innerHTML = curr.last_updated;
