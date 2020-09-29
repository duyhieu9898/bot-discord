const {
  Client,
  MessageEmbed
} = require('discord.js');
const client = new Client();
const cron = require("node-cron");

const maxNotifyInHour = 5;
let notifyInHour = 0;

let timesCheckIn = [{
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
let  timeCron = '*/60 * * * * *'
let hasReset = false

const sleep = function (millisecond) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, millisecond)
  })
}

const resetCheckTime = function () {
  console.log('======reset======')
  hasReset = true
  timesCheckIn = timesCheckIn.map(time => {
    time.check = false
    return time
  })
  console.log(timesCheckIn)
}



const embed = new MessageEmbed()
  .setTitle('CHECK_IN')
  .setColor(0xff0000)
  .setDescription('Hello, check in now');

client.on('ready', async () => {
  console.log('I am ready!');
  chanel = client.channels.cache.get('710518886071795722')

  cron.schedule(timeCron, async function () {
    console.log(timeCron)
    const date = new Date()
    const time = {
      hours: date.getHours(),
      minutes: date.getMinutes()
    }
    embed.setDescription('Hello, check in now' + ` -- ${time.hours}h : ${time.minutes}p`)
    if (isTimeCheckIn(time) && !isTimeCheckIn(time).check) {
      if (notifyInHour <= maxNotifyInHour) {
        await chanel.send(embed)
      } else {
        chanel.send('=========AUTO_CHECK=========')
        isTimeSet.check = true
        notifyInHour = 0
      }
      notifyInHour ++
      isTimeSet = isTimeCheckIn(time)
      // await sleep(10000)
      // while (!isTimeCheckIn(time).check) {
      //   await chanel.send(embed)
      //   await sleep(10000)
      // }
    } else {
      console.log('next', `-- ${time.hours}h : ${time.minutes}p`)
    }
    //
    if (time.hours === 19 && !hasReset) {
      resetCheckTime()
    }
    if (time.hours === 8) {
      hasReset = false
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