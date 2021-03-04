import { app } from 'app/global-api'
      
/*
* 可通过 this.$WEAPPS_COMP.handler.xxx 访问这里定义的方法
* 
* 如果需要 async-await，请修改成 export default async function() {}
*/

export default function () {
  let { candidates, speed } = this.$WEAPPS_COMP.props.data;
  let { items, height, isStart } = this.$WEAPPS_COMP.state;
  const len = candidates.length;


  if (isStart) return;

  this.$WEAPPS_COMP.state.isStart = true;
  const totalHeight = height * len;

  const sRange = Math.floor(Math.random() * 2 + 2);
  const halfSpeed = speed / 2;
  let endDistances = items.map((item) => {
    return item.value == 0 ? len * height : item.value * height;
  });

  let indexs = items.map(() => 1);

  this.$WEAPPS_COMP.state.timer = setInterval(() => {
    let timers = [];

    for (let index in items) {
      if (isNaN(Number(index))) {
        continue;
      }

      let item = items[index];
      timers[index] = setTimeout(() => {
        if (indexs[index] <= sRange) {
          item.translate -= speed;
          if (Math.abs(item.translate) > totalHeight) {
            item.translate += totalHeight;
            indexs[index]++;
          }
        } else if (indexs[index] > sRange && indexs[index] < sRange + 2) {
          item.translate -= halfSpeed;
          if (Math.abs(item.translate) > totalHeight) {
            item.translate += totalHeight;
            indexs[index]++;
          }
        } else {
          if (Number(index) === items.length - 1) {
            let dropSpeed = (endDistances[index] + item.translate) / halfSpeed;
            if (item.value < 3) {
              dropSpeed = dropSpeed > halfSpeed ? halfSpeed : dropSpeed < 0.1 ? 0.1 : dropSpeed;
            } else if (item.value < 5 && item.value >= 3) {
              dropSpeed = dropSpeed > halfSpeed ? halfSpeed : dropSpeed < 0.3 ? 0.3 : dropSpeed;
            } else {
              dropSpeed = dropSpeed > halfSpeed ? halfSpeed : dropSpeed < 0.3 ? 0.3 : dropSpeed;
            }

            item.translate -= dropSpeed;
            item.translate =
              Math.abs(item.translate) > endDistances[index]
                ? (item.translate = -endDistances[index])
                : item.translate;
            if (Math.abs(item.translate) >= endDistances[index]) {
              if (this.$WEAPPS_COMP.state.timer) {
                clearInterval(this.$WEAPPS_COMP.state.timer);
                this.$WEAPPS_COMP.state.timer = null;
                this.$WEAPPS_COMP.state.isStart = false;
                this.$WEAPPS_COMP.props.events.end();
              }

              timers.forEach((timer) => {
                if (timer) {
                  clearTimeout(timer);
                }
              });
              
            }
          } else {
            if (item.translate == endDistances[index]) return;
            let dropSpeed = (endDistances[index] + item.translate) / halfSpeed;
            dropSpeed = dropSpeed > halfSpeed ? halfSpeed : dropSpeed < 1 ? 1 : dropSpeed;
            item.translate -= dropSpeed;
            item.translate =
              Math.abs(item.translate) > endDistances[index]
                ? (item.translate = -endDistances[index])
                : item.translate;
          }
        }
      }, index * 200);
    }

    this.$WEAPPS_COMP.state.items = items.map((item) => {
      return {
        ...item,
        translate: item.translate
      };
    });

    // this.page.setData({
    //   ['machine.items']: this.items,
    // });
  }, 1000 / 30);
}

;