# Dinesmart API
Dinesmart is a JSON API that provides inspection data for places inspected by local public health units.

Currently supported cities:
* Toronto
* Mississauga
* Brampton
* Caledon

### Endpoints
**/inspections** - Returns a JSON response containing inspections for Toronto and Peel regions.

Sample Response:
```json
[
  {
    "id": "1222579",
    "name": "SAI-LILA KHAMAN DHOKLA HOUSE",
    "type": "Food Take Out",
    "address": "870 MARKHAM RD ",
    "minInspections": "2",
    "coords": {
      "latitude": "43.76797956",
      "longitude": "-79.229029122"
    },
    "inspections": [
      {
        "id": "104063869",
        "inspectionDate": "2017-10-04",
        "status": "Pass",
        "inspectionType": "N/A",
        "infractions": []
      },
      {
        "id": "104246429",
        "inspectionDate": "2018-06-20",
        "status": "Pass",
        "inspectionType": "N/A",
        "infractions": [
          {
            "infractionDetails": "Fail to Hold a Valid Food Handler's Certificate. Muncipal Code Chapter 545-157(17)(b)",
            "severity": "NA - Not Applicable",
            "action": "Notice to Comply"
          },
          {
            "infractionDetails": "Operator fail to properly wash equipment",
            "severity": "M - Minor",
            "action": "Notice to Comply"
          },
          {
            "infractionDetails": "Operator fail to properly wash surfaces in rooms",
            "severity": "M - Minor",
            "action": "Notice to Comply"
          }
        ]
      },
      {
        "id": "104277664",
        "inspectionDate": "2018-08-07",
        "status": "Pass",
        "inspectionType": "N/A",
        "infractions": [
          {
            "infractionDetails": "Operate food premise - equipment not arranged to permit cleaning - Sec. 9",
            "severity": "M - Minor",
            "action": "Notice to Comply"
          },
          {
            "infractionDetails": "Use handwashing station other than for handwashing of employees - Sec. 7(4)",
            "severity": "S - Significant",
            "action": "Corrected During Inspection"
          }
        ]
      },
      {
        "id": "104462048",
        "inspectionDate": "2019-05-09",
        "status": "Conditional Pass",
        "inspectionType": "N/A",
        "infractions": [
          {
            "infractionDetails": "FAIL TO ENSURE FACILITY SURFACE CLEANED AS NECESSARY - SEC. 22",
            "severity": "S - Significant",
            "action": "Notice to Comply"
          },
          {
            "infractionDetails": "FAIL TO MAINTAIN HANDWASHING STATIONS (LIQUID SOAP AND PAPER TOWELS) - SEC. 7(3)(C)",
            "severity": "S - Significant",
            "action": "Notice to Comply"
          },
          {
            "infractionDetails": "FOOD PREMISE NOT MAINTAINED WITH FOOD HANDLING ROOM IN SANITARY CONDITION - SEC. 7(1)(E)",
            "severity": "M - Minor",
            "action": "Notice to Comply"
          },
          {
            "infractionDetails": "Fail to ensure completion of food handling training by food handler or supervisor - Sec. 32",
            "severity": "NA - Not Applicable",
            "action": "Notice to Comply"
          },
          {
            "infractionDetails": "Fail to protect food from contamination or adulteration - Sec. 26(1)",
            "severity": "C - Crucial",
            "action": "Notice to Comply"
          },
          {
            "infractionDetails": "Use handwashing station other than for handwashing of employees - Sec. 7(4)",
            "severity": "S - Significant",
            "action": "Notice to Comply"
          }
        ]
      },
      {
        "id": "104468700",
        "inspectionDate": "2019-05-13",
        "status": "Pass",
        "inspectionType": "N/A",
        "infractions": []
      }
    ]
  }
]
```