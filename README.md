# WDC_Tableau_AirQualityData

This is a Web Data Connector (WDC) to Tableau for obtaining Air Quality Data with following Parameters:
1. City
2. Parameter like CO, NO2, SO2, O3, PM10, PM25, etc.
3. Start Date and 
4. End Date.

The above parameters help filter the data coming from the web API (https://api.openaq.org/v1/measurements).

This project consists of following two files:
1. HTML file to capture the parameters and invoke javascript file.
2. Javascript file for getSchema, getData and passing the parameters to filter the data as per user selection.
