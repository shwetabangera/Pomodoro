let pomodoro = {
  started: false,
  minutes: 0,
  seconds: 0,
  fillerHeight: 0,
  fillerIncrement: 0,
  fillerDom: null,
  interval: null,
  minutesDom: null,
  secondsDom: null,
  init: function () {
    let test = this;
    this.minutesDom = document.querySelector("#minutes");
    this.secondsDom = document.querySelector("#seconds");
    this.fillerDom = document.querySelector("#filler");
    this.interval = setInterval(function () {
      test.intervalCallback.apply(test);
    }, 1000);
    document.querySelector("#work").onclick = function () {
      test.startWork.apply(test);
    };
    document.querySelector("#shortBreak").onclick = function () {
      test.startShortBreak.apply(test);
    };
    document.querySelector("#longBreak").onclick = function () {
      test.startLongBreak.apply(test);
    };
    document.querySelector("#stop").onclick = function () {
      test.stopTimer.apply(test);
    };
    document.querySelector("#reset").onclick = function () {
      test.reset.apply(test);
    };
  },
  resetVariables: function (mins, secs, started) {
    this.minutes = mins;
    this.seconds = secs;
    this.started = started;
    this.fillerIncrement = 200 / (this.minutes * 60);
    this.fillerHeight = 0;
  },
  startWork: function () {
    this.resetVariables(25, 0, true);
  },
  startShortBreak: function () {
    this.resetVariables(5, 0, true);
  },
  startLongBreak: function () {
    this.resetVariables(10, 0, true);
  },
  stopTimer: function () {
    this.resetVariables(this.minutes, this.seconds, false);
    this.updateDom();
  },
  reset: function () {
    this.resetVariables(0, 0, true);
    this.updateDom();
  },
  toDoubleDigit: function (num) {
    if (num < 10) {
      return "0" + parseInt(num, 10);
    }
    return num;
  },
  updateDom: function () {
    this.minutesDom.innerHTML = this.toDoubleDigit(this.minutes);
    this.secondsDom.innerHTML = this.toDoubleDigit(this.seconds);
    this.fillerHeight = this.fillerHeight + this.fillerIncrement;
    this.fillerDom.style.height = this.fillerHeight + "px";
  },
  intervalCallback: function () {
    if (!this.started) return false;
    if (this.seconds == 0) {
      if (this.minutes == 0) {
        this.timerComplete();
        return;
      }
      this.seconds = 59;
      this.minutes--;
    } else {
      this.seconds--;
    }
    this.updateDom();
  },
  timerComplete: function () {
    this.started = false;
    this.fillerHeight = 0;
  },
};
window.onload = function () {
  pomodoro.init();
};
