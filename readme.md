<h1>How Airbnb Affects Long-Term Rental Supply in San Francisco</h1>
  
San Francisco is in a housing crisis. The city's limited housing supply and unaffordable rents are squeezing out local residents. Some critics blame short-term rentals on Airbnb for taking away already scarce housing from long-term rentals.

Our goal with this project is to understand the following:

1.  Quantify Airbnb's effect on San Francisco's long-term rental supply
2.  Understand how Airbnb is being used in all San Francisco neighborhoods (because real estate is local)
3.  Identify and quantify illegally listed units in San Francisco (because illegal units may displace local residents)

Note:  This project has been deployed on <a href="https://tranquil-shore-08023.herokuapp.com/">heroku</a>.

<h2>The Data</h2>
We explored Airbnb's impact on the long-term rental supply using data from <a href="http://insideairbnb.com/get-the-data.html">Inside Airbnb's dataset</a>.  Inside Airbnb is an independent, non-commercial set of tools and data that helped us explore how Airbnb is being used. They regularly scrape publicly available information about Airbnb's listings.  We used the following features for our analysis.

1.  <b>Room Type</b>:  An homeowner can list an entire home/apartment, private room or shared room.  We consider listings under the entire home/apartment category as dwelling units that can be added to the long-term rental stock.
2.  <b>Neighborhood</b>:  Real estate is local, and so are Airbnb listings.  We wanted to understand how Room Type changes by neighborhood.
3.  <b>Minimum Maximum Nights</b>:  Per San Francisco's short-term rental ordinance, a homeowner may legally rent his or her home for less than 90 days. Inside Airbnb's dataset didn't include occupancy, but it did include calendar availability.  We inferred from this data that listings with high availability (over 90 days) were probably listed illegally.
4.  <b>License</b>:  Per San Francisco's short-term rental ordinance, all homeowners must register their unit with the city with a license number.  If the listing didn't include a license number, we assumed it was an illegal unit.
5.  <b>Latitude and Longitude</b>:  Used to map legal and illegal units.

<h2>Insights</h2>
1. 61% of listing are entire homes/apartments. <img src = "https://raw.githubusercontent.com/TrevorLovesMommy/airbnb-project/master/static/images/roomtypes.JPG">
2.  If we were to convert all entire homes/apartments into long term dwelling units, the housing supply would only increase by 1.8% (4,822 units).<br>
<img src="https://raw.githubusercontent.com/TrevorLovesMommy/airbnb-project/master/static/images/sfentirehome.JPG">
2.  The northeastern portion of San Francisco has the highest concentration of Airbnb listings.<br>
3.  According to our definition of illegal units (high calendar availability and missing license), 80% of entire homes/apartments are illegally listed.
<img src="https://raw.githubusercontent.com/TrevorLovesMommy/airbnb-project/master/static/images/legalstatus.JPG" border ="1">

<h2>Summary</h2>
Based on the data, we believe that Airbnb has a minimal effect on San Francisco's long-term rental supply. Converting entire homes/apt on Airbnb to long-term rentals would increase the overall long-term rental supply 1.8%. San Francisco's short-term rental ordinance may be limiting the short-term rental supply relative to total dwelling units. As for the illegal units, there's an opportunity for San Francisco to pursue these homeowners for over-due occupancy taxes and force them to comply with the short-term ordinance.
