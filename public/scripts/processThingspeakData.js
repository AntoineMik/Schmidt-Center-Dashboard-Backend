import {getThingspeakData} from "./loadThingspeakData.js"

const thingspeakRawData = [];
const thingspeakProcessedData = [];
//const thingspeakSensorData = new DataFrame();

async function processThingspeakData()
{
    getThingspeakData().then(result => result.data)
    .then(data => {
        console.log(data)
        thingspeakRawData.push(data)
        data.forEach(element => {
            const reg = /[^a-zA-Z\d:\u00C0-\u00FF]/g
            let test = element.Feeds.map(el => JSON.parse(JSON.stringify(el)
            .replaceAll("field1", element.Channel.field1.replace(reg,""))
            .replaceAll("field2", element.Channel.field2.replace(reg,""))
            .replaceAll("field3", element.Channel.field3.replace(reg,""))
            .replaceAll("field4", element.Channel.field4.replace(reg,""))
            .replaceAll("field5", element.Channel.field5.replace(reg,""))
            .replaceAll("field6", element.Channel.field6.replace(reg,""))
            .replaceAll("field7", element.Channel.field7.replace(reg,""))
            .replaceAll("field8", element.Channel.field8.replace(reg,""))
            ))
            
            console.log(element.Feeds)
            console.log(test)
            thingspeakProcessedData.push({
                ID: element.ID,
                Channel: element.Channel,
                Feeds: test
            })

            // element.Feeds.forEach(feed => {
            //     thingspeakSensorData.push(
            //         {
            //             ID: element.ID,
            //             Name: element.channel.name,
            //             Latitude: element.channel.latitude,
            //             Longitude: element.channel.longitude,
            //             Reading_Datetime: feed.created_at,
            //             Entry_ID: feed.entry_id,
            //             PM1_0: feed.field1,
            //             PM2_5: feed.field2,
            //             PM10_0: feed.field3,
            //             Free_Memory: feed.field4,
            //             Voltage_reading: feed.field5,
            //         }
            //     )

            // })
            
        });

    })
}

await processThingspeakData();

export function getThingspeakProcessedData()
{
    return thingspeakProcessedData
}