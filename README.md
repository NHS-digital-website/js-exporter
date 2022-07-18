# JavaScript Export Service

This repository contains an Express server and a lambda service (Serverless) to export JavaScript visualisations with Playwright.

The purpose of this project is to provide a method of rendering JavaScript visualisations server-side as a fallback for when JavaScript isn't avalible on the client.

This service comes preconfigured for NHSD DataViz and Highcharts, but can be extended by modifying libraris.js.

--------

## Getting Started

Download and run with `npm run start`.

```
git clone https://github.com/NHS-digital-website/nhsd-dataviz.git
npm install
npm run start
```

### Example export request

```
curl --location --request POST 'http://localhost:3001/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "vizType": "pie",
    "data": {
        "date": "2022",
        "percent": 15,
        "subject": "adults",
        "description": "had a possible eating disorder",
        "change": {
            "percent": 3,
            "date": "2021"
        }
    },
    "format": "png"
}'
```
