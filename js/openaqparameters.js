(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "country",
            dataType: tableau.dataTypeEnum.string,
            alias: "Country",
            description: "Country Code"            
        }, {
            id: "city",
            dataType: tableau.dataTypeEnum.string
           
        }, {
            id: "parameter",
            dataType: tableau.dataTypeEnum.string
         
        },{
            id: "value",
            dataType: tableau.dataTypeEnum.float
        },{
            id: "unit",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "date",
            dataType: tableau.dataTypeEnum.datetime
        },{
            id: "latitude",
            dataType: tableau.dataTypeEnum.float
        },{
            id: "longitude",
            dataType: tableau.dataTypeEnum.float
        }
            ];

        var tableSchema = {
            id: "openaqparameters",
            alias: "Air Quality with Parameters",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
       
       var  paramObj = JSON.parse(tableau.connectionData);
            cityString = "city=" + paramObj.ct,
            paramString = "&parameter=" + paramObj.param,
            dateString = "&starttime=" + paramObj.startDate + "&endtime=" + paramObj.endDate,
            apiCall = "https://api.openaq.org/v1/measurements?" + cityString + paramString + dateString;
               
        $.getJSON(apiCall, function(resp) {
            var feat = resp.results,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "country": feat[i].country,
                    "city": feat[i].city,
                    "parameter": feat[i].parameter,
                    "value": feat[i].value,
                    "unit": feat[i].unit,
                    "date": feat[i].date.local.substring(0,10),
                    "latitude": feat[i].coordinates.latitude,
                    "longitude": feat[i].coordinates.longitude
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
          
            var paramObj = {
                ct: $('#city').val().trim(),
                param: $('#parameter').val().trim(),
                startDate: $('#start-date-one').val().trim(),
                endDate: $('#end-date-one').val().trim()             
            };
            
            tableau.connectionData = JSON.stringify(paramObj);
            tableau.connectionName = "Air Quality with Parameters"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
