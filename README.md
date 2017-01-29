# Toggl Retrospection Template Data Generator

## Development

Run the following command in the project root to enable live development. Make sure you have run `npm install` before you run any commands.

```bash
npm run dev
```

## API Token and workspace id

Populate your api token and workspace id in the `settings.json` configuration file as follows with yours before running `npm run generate`. Your api token can be found in the bottom of your profile page at: https://toggl.com/app/profile . 

```json
{
  "token": "<your_api_token>",
  "workspaceId": "<your_workspace_id>"
}
```

## Output 

Running `npm run generate` in project root, and you will see reports like this:

### Summary Data 

```
{ totalGrand: 1006076304,
  totalDays: 12,
  grandPercentage: 0.9703668055555555,
  grandHoursPerDay: 23.288803333333334 }
```

### Clients Data 

```
[ { client: 'A1-Work',
    time: 142375304,
    percentage: 0.13732185956790124,
    hoursPerDay: 3.29572462962963 },
  { client: 'A2-Tech-Programming',
    time: 51178000,
    percentage: 0.049361496913580244,
    hoursPerDay: 1.1846759259259259 },
  { client: 'A3-Reading-Knowledge-Methodology',
    time: 38644000,
    percentage: 0.037272376543209876,
    hoursPerDay: 0.894537037037037 },
  { client: 'A4-Retrospectives',
    time: 22633000,
    percentage: 0.021829668209876543,
    hoursPerDay: 0.523912037037037 },
  { client: 'A5-Rest',
    time: 53152000,
    percentage: 0.05126543209876543,
    hoursPerDay: 1.2303703703703703 },
  { client: 'B-Basiclife',
    time: 486582000,
    percentage: 0.4693113425925926,
    hoursPerDay: 11.263472222222223 },
  { client: 'C1-Love',
    time: 107197000,
    percentage: 0.10339216820987654,
    hoursPerDay: 2.481412037037037 },
  { client: 'C2-Family',
    time: 30658000,
    percentage: 0.02956983024691358,
    hoursPerDay: 0.709675925925926 },
  { client: 'D-Waste',
    time: 73657000,
    percentage: 0.0710426311728395,
    hoursPerDay: 1.7050231481481481 } ]
```

### Projects Data 

```
[ { project: 'BlackOps',
    time: 90298304,
    percentage: 0.6342272954865824,
    hoursPerDay: 2.0902385185185186 },
  { project: 'DART-GFI',
    time: 14278000,
    percentage: 0.10028424592512196,
    hoursPerDay: 0.33050925925925934 },
  { project: 'Other-Meetings&Events',
    time: 9722000,
    percentage: 0.06828431425157835,
    hoursPerDay: 0.22504629629629636 },
  { project: 'Regular-Meetings',
    time: 18327000,
    percentage: 0.12872316676493278,
    hoursPerDay: 0.4242361111111112 },
  { project: 'Workshops&Sessions',
    time: 9750000,
    percentage: 0.0684809775717845,
    hoursPerDay: 0.22569444444444445 } ]
[ { project: '其他的干活',
    time: 1295000,
    percentage: 0.02530384149439212,
    hoursPerDay: 0.02997685185185185 },
  { project: '开发Chrome Extension: PEAK',
    time: 38312000,
    percentage: 0.7486029153151745,
    hoursPerDay: 0.8868518518518519 },
  { project: '重构项目代码',
    time: 11571000,
    percentage: 0.2260932431904334,
    hoursPerDay: 0.2678472222222222 } ]
[ { project: 'Love\'s Executioner',
    time: 1836000,
    percentage: 0.04751060966773626,
    hoursPerDay: 0.042499999999999996 },
  { project: 'PKM/Emails',
    time: 17678000,
    percentage: 0.45745782010143876,
    hoursPerDay: 0.40921296296296295 },
  { project: '整理(Ticktick/Emails/Github..)',
    time: 10979000,
    percentage: 0.2841062001863161,
    hoursPerDay: 0.2541435185185185 },
  { project: '阅读《刻意练习》',
    time: 8151000,
    percentage: 0.21092537004450884,
    hoursPerDay: 0.18868055555555555 } ]
[ { project: 'Monthly Toggl Retrospectives',
    time: 22633000,
    percentage: 1,
    hoursPerDay: 0.523912037037037 } ]
[ { project: 'Foosball⚽',
    time: 28853000,
    percentage: 0.5428394039735099,
    hoursPerDay: 0.6678935185185185 },
  { project: '番茄/toggl 中间的休息',
    time: 24299000,
    percentage: 0.45716059602649006,
    hoursPerDay: 0.5624768518518518 } ]
[ { project: 'Commuting🚌',
    time: 28685000,
    percentage: 0.05895203686120736,
    hoursPerDay: 0.6640046296296297 },
  { project: 'Cooking🔥',
    time: 28600000,
    percentage: 0.05877734893604778,
    hoursPerDay: 0.6620370370370371 },
  { project: 'Eating🍚',
    time: 44589000,
    percentage: 0.09163717523459561,
    hoursPerDay: 1.032152777777778 },
  { project: 'Housework🏡',
    time: 6258000,
    percentage: 0.012861141595866678,
    hoursPerDay: 0.14486111111111113 },
  { project: 'Morning-Cleanup🚿',
    time: 18902000,
    percentage: 0.03884648425136976,
    hoursPerDay: 0.4375462962962963 },
  { project: 'Nap😴',
    time: 15231000,
    percentage: 0.031302021036536495,
    hoursPerDay: 0.3525694444444445 },
  { project: 'Shower🛀&Washup🍼',
    time: 18523000,
    percentage: 0.03806758162036409,
    hoursPerDay: 0.42877314814814815 },
  { project: 'Sleeping🌛',
    time: 249265000,
    percentage: 0.5122774784106277,
    hoursPerDay: 5.770023148148149 },
  { project: '一般生活事务',
    time: 76529000,
    percentage: 0.15727873205338463,
    hoursPerDay: 1.7715046296296297 } ]
[ { project: '和亲爱的聊天玩耍',
    time: 107197000,
    percentage: 1,
    hoursPerDay: 2.481412037037037 } ]
[ { project: 'Family👪🐶',
    time: 30658000,
    percentage: 1,
    hoursPerDay: 0.709675925925926 } ]
[ { project: '攒人品-不浪费的浪费',
    time: 4326000,
    percentage: 0.05873168877363998,
    hoursPerDay: 0.10013888888888889 },
  { project: '浪费/赖床/刷网站/刷IM等',
    time: 69331000,
    percentage: 0.94126831122636,
    hoursPerDay: 1.6048842592592591 } ]
```
