function Clock() {
    this.initClock = function(){
        $(".clock-text").text(this.getTimeHM());
    }

    this.runClock = function () {
        var me = this;
        setInterval(function () {
            $(".clock-text").text(me.getTimeHM());
        }, 1000);
    },

    this.getTimeHM = function() {
        var date = new Date();
        var minute = date.getMinutes();
        var hour = date.getHours();
        if (minute.toString().length == 1) {
            minute = "0" + minute;
        }
        if (hour.toString().length == 1) {
            hour = "0" + hour;
        }
        return `${hour}:${minute}`;
    }
}

//# sourceURL=clock.js