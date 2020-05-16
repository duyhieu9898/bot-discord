const {
  Client,
  MessageEmbed
} = require('discord.js');
const client = new Client();
const cron = require("node-cron");

timesCheckIn = [{
    time: {
      hours: 9,
      minutes: 55
    },
    check: false
  },
  {
    time: {
      hours: 11,
      minutes: 56
    },
    check: false
  },
  {
    time: {
      hours: 14,
      minutes: 57
    },
    check: false
  },
  {
    time: {
      hours: 16,
      minutes: 49
    },
    check: false
  },
  {
    time: {
      hours: 18,
      minutes: 50
    },
    check: false
  }
]
const isTimeCheckIn = function (timeCheck, minute) {
  return timesCheckIn.find(item => {
    return item.time.hours === timeCheck.hours && (minute ? item.time.minutes === timeCheck.minutes : true) && !item.check
  })
}
let isTimeSet = false

const sleep = function (millisecond) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, millisecond)
  })
}

const embed = new MessageEmbed()
  .setTitle('CHECK_IN')
  .setColor(0xff0000)
  .setDescription('Hello, check in now');

client.on('ready', async () => {
  console.log('I am ready!');
  chanel = client.channels.cache.get('710518886071795722')

  cron.schedule("*/60 * * * * *", async function () {
    const date = new Date()
    const time = {
      hours: date.getHours(),
      minutes: date.getMinutes()
    }
    embed.setDescription('Hello, check in now' + ` -- ${time.hours}h : ${time.minutes}p`)
    if (isTimeCheckIn(time) && !isTimeCheckIn(time).check) {
      await chanel.send(embed)
      isTimeSet = isTimeCheckIn(time)
      // await sleep(10000)
      // while (!isTimeCheckIn(time).check) {
      //   await chanel.send(embed)
      //   await sleep(10000)
      // }
    } else {
      console.log('next', `-- ${time.hours}h : ${time.minutes}p`)
    }
  })
});

client.on('message', message => {
  if (message.content === 'check') {
    isTimeSet.check = true
    console.log(timesCheckIn)
  }
});

client.login('NzEwNTE2OTE1MTg5MzE3Nzgz.Xr1sZA.5OfERNyPG3ZsnsIRzo8RWsYRHos');