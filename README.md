# Dinesmart API
Dinesmart is a JSON API that provides inspection data for places inspected by local public health units.

Currently supported areas:
* Toronto
* Mississauga
* Brampton
* Caledon

### Endpoints
**/inspections** - Returns a JSON response containing inspection data for the above listed areas.

Sample Response:
```json
[
  {
    "name": "SAI-LILA KHAMAN DHOKLA HOUSE",
    "type": "Food Take Out",
    "address": "870 MARKHAM RD ",
    "coords": {
      "lat": "43.76797956",
      "lon": "-79.229029122"
    },
    "inspections": [
      {
        "date": "2017-10-04",
        "status": "Pass",
        "infractions": []
      },
      {
        "date": "2018-06-20",
        "status": "Pass",
        "infractions": [
          {
            "details": "Fail to Hold a Valid Food Handler's Certificate. Muncipal Code Chapter 545-157(17)(b)",
            "severity": "NA - Not Applicable"
          },
          {
            "details": "Operator fail to properly wash equipment",
            "severity": "M - Minor"
          },
          {
            "details": "Operator fail to properly wash surfaces in rooms",
            "severity": "M - Minor"
          }
        ]
      },
      {
        "date": "2018-08-07",
        "status": "Pass",
        "infractions": [
          {
            "details": "Operate food premise - equipment not arranged to permit cleaning - Sec. 9",
            "severity": "M - Minor"
          },
          {
            "details": "Use handwashing station other than for handwashing of employees - Sec. 7(4)",
            "severity": "S - Significant"
          }
        ]
      },
      {
        "date": "2019-05-09",
        "status": "Conditional Pass",
        "infractions": [
          {
            "details": "FAIL TO ENSURE FACILITY SURFACE CLEANED AS NECESSARY - SEC. 22",
            "severity": "S - Significant"
          },
          {
            "details": "FAIL TO MAINTAIN HANDWASHING STATIONS (LIQUID SOAP AND PAPER TOWELS) - SEC. 7(3)(C)",
            "severity": "S - Significant"
          },
          {
            "details": "FOOD PREMISE NOT MAINTAINED WITH FOOD HANDLING ROOM IN SANITARY CONDITION - SEC. 7(1)(E)",
            "severity": "M - Minor"
          },
          {
            "details": "Fail to ensure completion of food handling training by food handler or supervisor - Sec. 32",
            "severity": "NA - Not Applicable"
          },
          {
            "details": "Fail to protect food from contamination or adulteration - Sec. 26(1)",
            "severity": "C - Crucial"
          },
          {
            "details": "Use handwashing station other than for handwashing of employees - Sec. 7(4)",
            "severity": "S - Significant"
          }
        ]
      },
      {
        "date": "2019-05-13",
        "status": "Pass",
        "infractions": []
      }
    ],
    "source": "Toronto Public Health"
  }
]
```
